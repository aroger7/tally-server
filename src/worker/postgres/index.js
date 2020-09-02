require('../../config');

const axios = require('axios');
const https = require('https');
const AWS = require('aws-sdk');

const updateDailyStats = require('./updateDailyStats');
const updateMonthlyStats = require('./updateMonthlyStats');
const updateYearlyStats = require('./updateYearlyStats');
const updateAllTimeStats = require('./updateAllTimeStats');
const init = require('../../db/postgres');
const db = init();

const REQS_PER_SECOND_MAX = 30;
const NUM_UPDATE_LAMBDAS = 200;

const credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
AWS.config.update({ region: process.env.AWS_REGION });

// Increase the max sockets so Lambda will fulfill more requests in parallel
const agent = new https.Agent({ maxSockets: 1000 });

const getAppList = async () => {
  try {
    const res = await axios.get(
      'https://api.steampowered.com/ISteamApps/GetAppList/v2/',
      // Adding or removing this format param this to randomly return 
      // an empty list. Unsure why.
      { params: { format: 'json' } }
    );
    return res.data.applist.apps;
  } catch (err) {
    console.log(err);
  }
};

const getPlayerCounts = (apps) => {
  const groupSize = Math.ceil(apps.length / NUM_UPDATE_LAMBDAS);
  let appGroups = [...Array(NUM_UPDATE_LAMBDAS)]
  appGroups = appGroups.map((appGroup, index) => apps.slice(index * groupSize, (index * groupSize) + groupSize));
  const appCounts = [];
  const errorsByCode = { count: 0 };

  const lambda = new AWS.Lambda({ httpOptions: { agent }});
  return Promise.all(appGroups
    .map(appGroup => lambda.invoke({
      FunctionName: process.env.GET_COUNT_FUNC_NAME,
      Payload: JSON.stringify({ 
        apps: appGroup,
        reqsPerSecond: REQS_PER_SECOND_MAX
      })
    })
    .promise()
  ))
    .then((responses) => {
      responses.map(response => JSON.parse(response.Payload))
        .forEach(payload => {
          const body = JSON.parse(payload.body);
          appCounts.push(...body.playerCounts.filter(count => !count.error));
          body.playerCounts
            .filter(count => Boolean(count.error && count.errorStatus))
            .forEach(count => {
              const status = count.errorStatus;
              errorsByCode[status] = errorsByCode[status] 
                ? errorsByCode[status].concat(count) 
                : [count];
              errorsByCode.count++;
            });
        });

      console.log(`total count: ${appCounts.length + errorsByCode.count}`);
      console.log(`total error count: ${errorsByCode.count}`);
      Object.keys(errorsByCode)
        .filter(key => key !== 'count')
        .forEach(key => {
          console.log(`total ${key} error count: ${errorsByCode[key].length}`)
        });

      return { apps: appCounts, errorsByCode };
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const runUpdate = async (appList, retries = 10) => {
  const { apps, errorsByCode } = await getPlayerCounts(appList);
  const retryCodes = [403, 429];
  const retryErrors = retryCodes
    .map(code => errorsByCode[code] || [])
    .reduce((acc, curr) => acc.concat(curr), []);
  if (retryErrors.length > 0 && retries > 0) {
    const { 
      apps: retryApps, 
      errorsByCode: retryErrorsByCode
    } = await runUpdate(retryErrors.map(e => ({ appid: e.appid, name: e.name })), retries - 1);
    apps.push(...retryApps);
    Object.keys(retryErrorsByCode)
      .filter(code => retryCodes.indexOf(code) === -1 && code !== 'count')
      .forEach(code => {
        if (!errorsByCode[code]) {
          errorsByCode[code] = [];
        }
        errorsByCode[code].push(...retryErrorsByCode[code]);
    });
  }
  return { apps, errorsByCode };
};

const updateDatabaseCounts = async (playerCounts) => {
  const items = playerCounts.apps.concat(playerCounts.errorsByCode[404] || []);
  const newApps = items.map(({ appid: id, name }) => ({ id, name }));
  const newCounts = items.map(({ count, appid: appId }) => ({ count, appId }));

  try {
    console.log('updating apps');
    await db.models.App.bulkCreate(newApps, { ignoreDuplicates: true });
    console.log('apps successfully updated');
    console.log('creating counts');
    await db.models.PlayerCount.bulkCreate(newCounts);
    console.log('counts successfully created');
  } catch(err) {
    console.log(`some counts were rejected: ${err.message}`);
    // reject(err);
  }
}

const start = async () => {
  console.log(process.env.NODE_ENV);
  const startTime = Date.now();
  try {
    const appList = await getAppList();
    const playerCounts = await runUpdate(appList);
    await updateDatabaseCounts(playerCounts);
    await updateDailyStats(db);
    await updateMonthlyStats(db);
    await updateYearlyStats(db);
    await updateAllTimeStats(db);    
    console.log(`done in ${Date.now() - startTime}ms`);
  } catch (e) {
    console.log(e.message);
  } finally {
    db.sequelize.close();
  }
};

start();
