var exec = require('child_process').exec;

var child = exec('cat *.js | wc -l', function(error, stdout, stderr) {
  if (error) console.log(error);
  process.stdout.write(stdout);
  process.stderr.write(stderr);
});
