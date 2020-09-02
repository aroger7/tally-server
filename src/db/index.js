const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const init = (options = []) => {
  const db = { models: {}, sequelize: undefined, Sequelize: undefined };
  const sequelize = new Sequelize(
    'postgres',
    'postgres',
    'password12345',
    {
      host: 'tally-db.cobq5f3c8nxj.us-east-1.rds.amazonaws.com',
      // host: 'localhost',
      dialect: 'postgres',
      define: { underscored: true },
      logging: false
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

  return db;
};

module.exports = init;