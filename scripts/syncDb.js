#!/usr/bin/env node
const initDb = require('../layers/orm-layer/nodejs/db');

const argv = require('yargs')
  .option('host', {
    alias: 'h',
    demandOption: true,
    default: 'localhost',
    describe: 'the hostname of the postgres server',
    type: 'string'
  })
  .option('username', {
    alias: 'u',
    demandOption: true,
    default: 'postgres',
    describe: 'the username to connect with',
    type: 'string'
  })
  .option('database', {
    alias: 'd',
    demandOption: true,
    default: 'postgres',
    describe: 'the database name to connect to',
    type: 'string'
  })
  .option('schema', {
    alias: 's',
    demandOption: true,
    default: 'public',
    describe: 'schema name to sync',
    type: 'string'
  })
  // TODO: Password option is not ideal way for anything non-local. Explore
  // being able to retrieve from Secrets Manager.
  .option('password', {
    alias: 'p',
    demandOption: true,
    describe: 'password for the user',
    type: 'string'
  }).argv;

const { host, username, database, schema, password } = argv;

const doSync = async () => {
  await initDb(database, username, password, { host, schema }, true);
};

doSync();