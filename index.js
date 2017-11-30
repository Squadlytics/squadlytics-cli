#!/usr/bin/env node
program = require('commander');
axios = require('axios');

program
  .version('0.2.0')
  .description('Squadlytics CLI to record events')
  .command('rec-deployment <notification_url>', 'Record a deployment').alias('rd')
  .parse(process.argv);