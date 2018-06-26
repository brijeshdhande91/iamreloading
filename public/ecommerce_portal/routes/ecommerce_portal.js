var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
	var sess= req.session;
  	res.render('ecommerce_portal/ecommerce_portal.html',{token:sess.token,select:"Ecommerce Portal", name:sess.name});
});

router.get('/seller', function(req, res, next) {
	var sess= req.session;
  	res.render('ecommerce_portal/seller.html',{token:sess.token,select:"Ecommerce Portal", name:sess.name});
});

router.get('/sell_reg_account', function(req, res, next) {
	var sess= req.session;
  	res.render('ecommerce_portal/sell_reg_account.html',{token:sess.token,select:"Ecommerce Portal", name:sess.name});
});

router.get('/sell_reg_verification', function(req, res, next) {
	var sess= req.session;
  	res.render('ecommerce_portal/sell_reg_verification.html',{token:sess.token,select:"Ecommerce Portal", name:sess.name});
});

router.get('/sell_reg_verification', function(req, res, next) {
	var sess= req.session;
  	res.render('ecommerce_portal/sell_reg_verification.html',{token:sess.token,select:"Ecommerce Portal", name:sess.name});
});

router.get('/sell_reg_information', function(req, res, next) {
	var sess= req.session;
  	res.render('ecommerce_portal/sell_reg_information.html',{token:sess.token,select:"Ecommerce Portal", name:sess.name});
});
module.exports = router;