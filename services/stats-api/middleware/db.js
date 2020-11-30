// const initDb = require(process.env.ENV ? '/opt/db' : '../../../TallyDbResources/opt/db');
// const config = require('../config');

// let db = null;

// exports.getDatabase = async (req, res, next) => {
//   if (!db) {
//     db = await initDb(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
//       host: config.DB_HOST,
//       dialect: 'postgres'
//     });
//   }

//   req.db = db;
//   next();
// }

const initDb = require('/opt/db');
const config = require('../config');

let db = null;

exports.getDatabase = (config) => {
  return ({
    before: async (handler) => {
      const {
        host,
        username,
        password
      } = handler.context.DB_CREDENTIALS || {};

      if (!db) {
        db = await initDb(
          'postgres', 
          username || 'postgres', 
          password || 'password12345', 
          {
            host: host || 'host.docker.internal',
            dialect: 'postgres'
          });
      }

      handler.context.db = db;      
    }
  })
}