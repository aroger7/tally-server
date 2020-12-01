exports.DB_SECRET_NAME = process.env.DB_SECRET_NAME || 'TallyDbDevCredentialsSecret';
exports.ORM_LAYER_PATH = !process.env.IS_OFFLINE ? 'opt/db' : '../../../layers/orm-layer/nodejs/db';