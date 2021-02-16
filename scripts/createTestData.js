#!/usr/bin/env node
const { spawn } = require('child_process');

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
  .option('time', {
    alias: 't',
    demandOption: true,
    default: 24,
    describe: 'number of hours to generate data for',
    type: 'number'
  })
  .option('schema', {
    alias: 's',
    demandOption: true,
    default: 'test',
    describe: 'schema name to generate data in',
    type: 'string'
  })
  .option('apps', {
    alias: 'a',
    demandOption: true,
    default: 10000,
    describe: 'number of apps to create',
    type: 'number'
  })
  .argv;

const { host, username, database, time, schema, apps } = argv;

const sqlTemplate = `
  DELETE FROM ${schema}.apps;
  DELETE FROM ${schema}.player_counts;
  VACUUM FULL;

  BEGIN;

  CREATE FUNCTION pg_temp.getRandomInt(min int, max int)
  RETURNS int AS $$
    BEGIN
      return FLOOR(RANDOM() * (max - 1) + 1)::int;
    END;
  $$LANGUAGE plpgsql;

  CREATE FUNCTION pg_temp.getRandomFloat(min int, max int)
  RETURNS int AS $$
    BEGIN
      return FLOOR(RANDOM() * (max - 1) + 1)::int;
    END;
  $$LANGUAGE plpgsql;

  DO '
  DECLARE 
    i int := 1;
    hours int := ${time};
    currentHour bigint := 0;
  BEGIN
    FOR i in 1..${apps} LOOP
      INSERT INTO ${schema}.apps (id, name, current, average, peak, average24_hours, peak24_hours, created_at, updated_at) 
        VALUES (i, ''App '' || i, pg_temp.getRandomInt(1, 500000), pg_temp.getRandomFloat(1, 500000), pg_temp.getRandomInt(1, 500000), pg_temp.getRandomFloat(1, 500000), pg_temp.getRandomInt(1, 500000), NOW(), NOW());
      FOR currentHour in 1..hours LOOP
        INSERT INTO ${schema}.player_counts (app_id, count, created_at)
          VALUES (i, pg_temp.getRandomInt(1, 500000), NOW() - (INTERVAL ''1 hour'' * currentHour));
      END LOOP;
      RAISE NOTICE ''%'', i;
    END LOOP;
  END;';
  COMMIT;
`;

const echo = spawn('echo', [sqlTemplate]);
const psql = spawn('psql', ['-h', host, '-U', username, database]);

echo.stdout.on('data', (data) => {  
  psql.stdin.write(data);
});

echo.stderr.on('data', (data) => {
  process.stderr.write(data);
})

echo.on('close', (code) => {
  psql.stdin.end();
});

psql.stderr.on('data', (data) => {
  process.stderr.write(data);
});

psql.stdout.on('data', (data) => {
  process.stdout.write(data);
});

