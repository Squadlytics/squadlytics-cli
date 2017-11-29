#!/usr/bin/env node
program = require('commander');
axios = require('axios');

const source = 'squadlytics-cli';
let application_name, author_email, commit_hash, description, notification_url;

program
  .version('0.0.1')
  .description('Squadlytics CLI to record deployment events')
  .command('record <event> <notification_url>', 'Record an event').alias('r')
  .parse(process.argv);