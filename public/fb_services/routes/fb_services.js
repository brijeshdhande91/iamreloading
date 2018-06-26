var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
	var sess= req.session;
  	res.render('fb_services/fb_services_portal.html',{token:sess.token,select:"Food & Breaverages Portal", name: sess.name});
});

module.exports = router;