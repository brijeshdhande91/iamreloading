var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
	var sess= req.session;
  	res.render('portfolio.html',{token:sess.token,select:"Select Portfolio",name:sess.name});
});

module.exports = router;