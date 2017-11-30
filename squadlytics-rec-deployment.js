#!/usr/bin/env node
program = require('commander');
axios = require('axios');

var source = 'squadlytics-cli';
var event,
    deployment_id,
    application_name,
    author_email,
    status,
    commit_hash,
    description,
    notification_url;

program
  .arguments('<notification_url>')
  .option('-a, --application <application>', 'Name of the application you are deploying')
  .option('-i, --id <deployment_id>', 'Unique id for your deployment')
  .option('-u, --user [email]', 'Optional email of the user associated with the deployment')
  .option('-f, --failed', 'Optional, mark the deployment as failed')
  .option('-c, --commit [commit]', 'Optional commit being deployed')
  .option('-d, --message [message]', 'Optional description of the deployment')
  .action((notificationURL) => {
    application_name = program.application;
    deployment_id = program.id
    author_email = program.user;
    status = program.failed ? 'FAILED' : 'SUCCESSFUL';
    commit_hash = program.commit;
    description = program.message;
    notification_url = notificationURL;
  })
  .parse(process.argv);

if (!notification_url) {
  console.error('The notification URL is missing.');
  console.error(program.usage());
  process.exit(1);
}

if (!application_name){
  console.error('No application has been specified.');
  console.error(program.usage());
  process.exit(1);
}

if (!deployment_id){
  console.error('Deployment ID is missing.');
  console.error(program.usage());
  process.exit(1);
}

var body = {
  source,
  application_name,
  deployment_id,
  author_email,
  status,
  commit_hash,
  description
};

var headers = {
  'Content-Type': 'application/json',
  'User-Agent': 'Squadlytics CLI',
  'X-Squadlytics-Event': 'deployment'
};

// This line should be commented in production
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios
  .post(notification_url, body, { headers })
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
  });