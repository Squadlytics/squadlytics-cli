#!/usr/bin/env node
program = require('commander');
axios = require('axios');

const source = 'squadlytics-cli';
let application_name, author_email, commit_hash, description, notification_url;

program
  .version('0.0.1')
  .description('Squadlytics CLI to record events')
  .command('rec-deployment <notification_url>', 'Record a deployment').alias('rd')
  .parse(process.argv);