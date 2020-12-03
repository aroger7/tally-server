const fs = require('fs');
const promises = require('stream/promises');
const { promisify } = require('util');
const namor = require('namor');
const { subHours, subDays, differenceInHours, addHours } = require('date-fns');
const initDb = require('../layers/orm-layer/nodejs/db');

let db = null;



const createLoadTestData = async () => {
  db = await initDb('postgres', 'postgres', 'password12345', { host: 'host.docker.internal', schema: 'test' }, true);
  const apps = Array.from(Array(100000)).map((_, index) => createApp(index));
  await db.models.App.bulkCreate(apps);

  // await createDailyAppRecords(apps, 365);
};

// promises.

const createApp = (id) => ({
  id,
  name: namor.generate({ words: getRandomInt(1, 4), separator: ' ', saltLength: 0 }),
  current: getRandomInt(1, 500000),
  average: getRandomArbitrary(1, 500000),
  average24Hours: getRandomArbitrary(1, 500000),
  peak: getRandomInt(1, 50000),
  peak24Hours: getRandomInt(1, 500000)
});

const createDailyAppRecords = async (apps, numDays) => {
  const now = new Date();
  const file = fs.openSync('data.sql', 'w');
  for (let i = 1; i <= numDays; i++) {
    console.log(i);
    if (i === 1) {
      fs.writeSync(file, 'INSERT INTO test.player_counts (app_id, count, created_at) VALUES ');
      // stream.write('INSERT INTO test.player_counts (app_id, count, created_at, updated_at) VALUES ');
    }
    const day = subDays(now, numDays);
    const valuesString = apps.map((app) => {
      return Array.from(Array(24)).map((_, hours) => {
        const createdAt = subHours(day, hours);
        return `(${app.id},${getRandomInt(1, 500000)},'${createdAt.toISOString()}')`;
      });
    }).flat().join(',');

    fs.writeSync(file, valuesString);

    if (i === numDays) {
      fs.writeSync(file, ';')
    } else {
      fs.writeSync(file, ',');
    }
  }

  fs.closeSync(file);
}

const writeDailyPlayerCountsToFile = (apps, stream) => {
  const now = new Date();
  const day = subDays(now, numDays);
    apps.forEach((app) => {
      Array.from(Array(24)).forEach((_, hours) => {
        const createdAt = subHours(day, hours);
        // sqlString += `(${app.id}, ${getRandomInt(1, 500000)}, '${createdAt.toISOString()}', '${createdAt.toISOString()}'),`
        stream.write(`(${app.id}, ${getRandomInt(1, 500000)}, '${createdAt.toISOString()}', '${createdAt.toISOString()}'),`);
      });
    });
}

const createPlayerCounts = (appId) => {
  const playerCounts = [];
  const now = new Date();
  const start = subDays(now, 1);
  const numHours = differenceInHours(now, start);
  return Array.from(Array(numHours)).map((_, index) => ({
    appId,
    count: getRandomInt(0, 500000),
    createdAt: addHours(start, index)
  }));
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getArrayChunks = (arr, size) => {
  return arr.reduce((acc, curr) => {
    let group = acc[acc.length - 1];
    if (!group || group.length === size) {
      acc.push([curr]);
    } else {
      group.push(curr);
    }

    return acc;
  }, [])
}

createLoadTestData();