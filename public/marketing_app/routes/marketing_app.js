var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/marketing_app_login', function(req, res, next) {
	var sess = req.session;
  	res.render('marketing_app/marketing_app.html',{token:sess.token, select:"Marketing App" , name: sess.name});
});

router.get('/home', function(req, res, next) {
	var sess= req.session;
  	res.render('marketing_app/home.html',{token:sess.token,select:"Marketing App", name: sess.name});
});

router.get('/stock', function(req, res, next) {
	var sess= req.session;
  	res.render('marketing_app/stock.html',{token:sess.token,select:"Marketing App", name: sess.name});
});

router.get('/vendor', function(req, res, next) {
	var sess= req.session;
  	res.render('marketing_app/vendor.html',{token:sess.token,select:"Marketing App", name: sess.name});
});

router.get('/purchase', function(req, res, next) {
	var sess= req.session;
  	res.render('marketing_app/purchase.html',{token:sess.token,select:"Marketing App", name: sess.name});
});
module.exports = router;