var express = require('express');
var router = express.Router();
var request = require('request');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess= req.session;
  res.render('uk_dvla_portal/index.html', { token:sess.token, select:"UK DVLA Portal", name:sess.name });
});

router.get('/plate_details', function(req, res, next) {
	var sess= req.session;
	var dbUrl = 'http://dvlasearch.appspot.com/DvlaSearch?apikey=DvlaSearchDemoAccount&licencePlate=' + req.query.plate_num;
	var options = { method: 'GET', url: dbUrl, json: true };
	request(options, function (error, response, body) {
		  if (error){
		  	res.redirect('/error')
		  }
		  else{
		  	res.render('uk_dvla_portal/details_plate.html', { token:sess.token, select:"UK DVLA Portal", name:sess.name, details: body });
		  }
	});
  
});

module.exports = router;
