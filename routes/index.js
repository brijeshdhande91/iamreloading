var express = require('express');
var router = express.Router();
var session = require('express-session');
var request = require('request');
var jsonfile = require('jsonfile');
var file = 'countries_json/countries.json';

/* GET home page. */
router.get('/', function(req, res, next) {
  var res = res;
  jsonfile.readFile(file, function(err, obj) {
		if(err){ 
			console.log(" unable to get json data ");
			res.redirect("/error");
		}else{
			 res.render('register.html', { countries: obj });
		}
	  	
	}); 
});

router.get('/error', function(req, res, next) {
  res.render('error.html', { error: 'Session expired, please login to continue.' ,message:''});
});

router.get('/forgot_password', function(req, res, next) {
	res.render('forgot_pass.html');
});
router.get('/logout',function(req,res){
	req.session.destroy(function(err) {
	  if(err) {
	    console.log(err);
	  } else {
	    res.redirect('/login');
	  }
	});
});

module.exports = router;
