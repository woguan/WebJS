/**
 * Dependencies
 */

var http = require('http');
var path = require('path');

var express = require('express');
var compression = require('compression');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var handlebars = require('express-handlebars');


/**
 * Variables
 */

// Debug flag
const debug = true;


/**
 * App
 */

var app = express();


/**
 * Port
 */

app.set('port', process.env.PORT || 3000);



/**
 * Middleware
 */

/* Debug if on localhost */
if (debug) {
  var morgan = require('morgan');
  app.use(morgan('dev'));
}

/* Gzip Compression */
app.use(compression());

/* Serve Static Public Content */
app.use(serveStatic( path.join(__dirname, 'public') ));

/* Handlebars Template Engine */
app.engine('html', handlebars({ extname: '.html' }));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

/* Handle POST Requests/URL Encoding */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * Top-level Router Object
 */

var router = {
  index: require('./routes/index')
};


/**
 * Route Handlers
 */

app.get('/', router.index.view);

app.use(function(req, res) {
  res.status(404);

  // Respond with html page
  if (req.accepts('html')) {
    res.redirect('/404.html');
    return;
  }

  // Respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // Default to plain-text
  res.type('txt').send('Not found');
});


/**
 * Create Server and Listen
 */

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
