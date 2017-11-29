#!/usr/bin/env node
program = require('commander');

let application_name, author_email, commit_hash, description, notificationToken;

program
  .arguments('<token>')
  .option('-a, --application <application>', 'Name of the application you are deploying')
  .option('-u, --user [email]', 'Optional email of the user associated with the deployment')
  .option('-c, --commit [commit]', 'Optional commit being deployed')
  .option('-d, --message [message]', 'Optional description of the deployment')
  .action((token) => {
    application_name = program.application;
    author_email = program.user;
    commit_hash = program.commit;
    description = program.message;
    notificationToken = token;

    console.log(`application:   ${program.application}`);
    console.log(`user:          ${program.user}`);
    console.log(`commit:        ${program.commit}`);
    console.log(`message:       ${program.message}`);
    console.log(`token:          ${token}`);
  })
  .parse(process.argv);

if (!notificationToken) {
  console.error('No token has been specified.');
  console.error(program.help());
  process.exit(1);
}

if (!application_name){
  console.error('No application has been specified.');
  console.error(program.help());
  process.exit(1);
}
