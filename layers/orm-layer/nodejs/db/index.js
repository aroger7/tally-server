const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { Client } = require('pg');

Sequelize.postgres.DECIMAL.parse = function (value) { return parseFloat(value); };

const ensureDbCreated = async (options) => {
  const { database, username, password, host } = options;
  const connectionString = 'postgres://' + username + ':' + password + '@' + host + '/postgres';

  let client = null;
  try {
    client = new Client({ connectionString });
    await client.connect();
    await client.query('CREATE DATABASE ' + database);
  } catch (err) {
  } finally {
    client.end();
  }
}

const init = async (database, username, password, options = {}, syncAll) => {
  await ensureDbCreated({ database, username, password, ...options });
  const db = { models: {}, sequelize: undefined, Sequelize: undefined };
  const sequelize = new Sequelize(
    database,
    username,
    password,
    {
      host: 'localhost',
      dialect: 'postgres',
      define: { underscored: true },
      logging: false,
      ...options
    }
  );

  fs.readdirSync(path.join(__filename, '../models')).forEach(file => {
    const modelName = path.parse(file).name;
    db.models[modelName] = sequelize.import(path.join('./models', file));
  });

  Object.keys(db.models).forEach(modelName => {
    if (db.models[modelName].associate) {
      db.models[modelName].associate(db.models);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  if (syncAll) {
    await db.sequelize.sync({ force: true });
  }

  return db;
};

module.exports = init;