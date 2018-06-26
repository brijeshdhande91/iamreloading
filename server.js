//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');
	
	//my shit
	
	var session = require('express-session');
	var jwt     = require('jsonwebtoken');
	var path = require('path');
	var favicon = require('serve-favicon');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');

	var routes = require('./routes/index');
	var login  = require('./routes/login');
	var home  = require('./routes/home');
	var reg  = require('./routes/register');
	var portfolio  = require('./routes/portfolio');
	var forgot_pass = require('./routes/forgot_pass');
	var new_user_login = require('./routes/new_user_login');

	var compliance_portal = require('./public/compliance_portal/routes/compliance_portal');
	var marketing_app = require('./public/marketing_app/routes/marketing_app');
	var fb_services = require('./public/fb_services/routes/fb_services');
	var ecommerce_portal = require('./public/ecommerce_portal/routes/ecommerce_portal');
	var gas_energy_intranet = require('./public/gas_energy_intranet/routes/gas_energy_intranet');
	var uk_dvla_portal = require('./public/uk_dvla_portal/routes/uk_dvla');

	var db = require('./db/db');


	app.set('superSecret', 'porfolioSecret');
	 
	var checkSession = function(req, res, next) {
	  var sess = req.session;
	  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token|| req.headers.authorization;
	  if (token && sess.email){

		// verifies secret and checks exp
		jwt.verify(token, 'porfolioSecret', function(err, decoded) {      
		  if (err) {
			res.redirect('/error');    
		  } else {
			// if everything is good, save to request for use in other routes
			req.decoded = decoded;
		   if (decoded.email === sess.email){
			  next();
			}
			else{
			   res.redirect('/error'); 
			}
		  }
		});

	  } else {
		  res.redirect( '/error'); 
	  }
	}
	
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(session({secret: 'porfolioSecret', proxy: true, resave: true, saveUninitialized: true}));
	/* try putting above and see session expired or not -->   ephemeral: true   */
	app.use('/', routes);
	app.use('/login', login);
	app.use('/home', home);
	app.use('/register', reg);
	app.use('/forgot_pass', forgot_pass);
	app.use('/new_user_login', new_user_login);
	app.use('/portfolio/:token',[checkSession], portfolio);

	// this are mapping of all portfolio
	app.use('/compliance_portal/:token',[checkSession], compliance_portal);
	app.use('/marketing_app/:token',[checkSession], marketing_app);
	app.use('/fb_services/:token',[checkSession], fb_services);
	app.use('/ecommerce_portal/:token',[checkSession], ecommerce_portal);
	app.use('/gas_energy_intranet/:token',[checkSession], gas_energy_intranet);
	app.use('/uk_dvla_portal/:token',[checkSession], uk_dvla_portal);

// this is start for json server 

var jsonServer = require('json-server');
var server = jsonServer.create()
server.use(jsonServer.defaults())
var router = jsonServer.router('public/gas_energy_intranet/jsonResponses/single_acc_newformat.json');
server.use(router)
server.listen(4000);
console.log("json listening in 4000");

// this is end for json server 
	
	// my shit end
	
	
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}
var db = null,
    dbDetails = new Object();

var initDb = function(callback) {
  if (mongoURL == null) return;

  var mongodb = require('mongodb');
  if (mongodb == null) return;

  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    var col = db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({ip: req.ip, date: Date.now()});
    col.count(function(err, count){
      if (err) {
        console.log('Error running count. Message:\n'+err);
      }
      res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
    });
  } else {
    res.render('index.html', { pageCountMessage : null});
  }
});

app.get('/pagecount', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    db.collection('counts').count(function(err, count ){
      res.send('{ pageCount: ' + count + '}');
    });
  } else {
    res.send('{ pageCount: -1 }');
  }
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
