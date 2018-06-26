var express = require('express');
var router = express.Router();
var session = require('express-session');
var jwt     = require('jsonwebtoken');
var db = require('../db/db');
/* GET users listing. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  if(sess.email && sess.password){

	  request = {
	       email: sess.email,
		   password: sess.password
		}; 

		db.findData(request, function(err, response){

			if(err){
				console.log(err);
			}
			else{
				if(response){
					if(response.email === request.email && response.password === request.password){
						console.log("authenticated");
						var sess = req.session;
						sess.email = response.email;
						sess.name = response.name;
						res.redirect('/portfolio/' + sess.token);

					}else if(response === 'null'){
						res.render('error.html', { error: 'Authentication error, username or password is incorrect' ,message:''});
						console.log("authentication error");
					}else if(response === 'database'){
						res.render('error.html', { error: 'Something went wrong, please try again later' ,message:''});
					}
					else{
						res.render('error.html', { error: 'username or password is incorrect' ,message:''});
						console.log("username or password is incorrect");
					}
				}else{
					res.render('error.html', { error: 'Requested email id is not registered with us.' ,message:''});
					console.log("no data found");
				}
			}
		});
	}else{
		res.render('login.html');
	}
  
});

module.exports = router;
