#! /usr/bin/env node

var nconf = require('nconf');
var exec = require('exec');

nconf.use('file', { file: './config.json' });
nconf.load();

var userArgs = process.argv.slice(2);
var userCommand = userArgs[0];

if (userCommand == 'add') {
  nconf.set(userArgs[1], userArgs[2]);
  nconf.save(function (err) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Configuration saved successfully.');
  });

}
else if (userCommand == 'exec') {
  exec(nconf.get(userArgs[1]), function(err, out, code) {
    if (err instanceof Error)
      throw err;
    process.stderr.write(err);
    process.stdout.write(out);
    process.exit(code);
  });
}
