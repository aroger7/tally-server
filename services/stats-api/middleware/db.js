const config = require('../config');
const initDb = require(config.ORM_LAYER_PATH);

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
            host: host || 'localhost',
            dialect: 'postgres'
          });
      }

      handler.context.db = db;
    }
  })
}