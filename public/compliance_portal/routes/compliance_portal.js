var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
	var sess= req.session;
  	res.render('compliance_portal/compliance_portal.html',{token:sess.token,select:"Compliance Portal", name:sess.name});
});

module.exports = router;