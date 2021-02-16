exports.DB_SECRET_NAME = process.env.DB_SECRET_NAME || 'TallyDbDevCredentialsSecret';
exports.GET_PLAYER_COUNTS_FUNCTION_NAME = process.env.GET_PLAYER_COUNTS_FUNCTION_NAME || 'dev-get-batch-counts-function';
exports.APP_LIST_END = process.env.IS_OFFLINE ? 100 : undefined;