var exec = require('child_process').exec;

exports.view = function(req, res) {
exec("cd ~/public/myweb && git pull origin master");
res.send('Success');
}
