var express = require('express');
var session = require('express-session');
var jwt     = require('jsonwebtoken');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var db = require('../db/db');

/* GET home page. */
router.get('/:token', function(req, res, next) {
	var res = res;
	var req = req;
	console.log(req.params.token);
	var token = req.params.token;
	jwt.verify(token, 'porfolioSecret', function(err, decoded) {      
      if (err) {
        res.redirect('/error');    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
       if(decoded.email){
       		request = {
		       email: decoded.email,
			   password: decoded.password,
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
							var token = jwt.sign(response, "porfolioSecret");
							sess.token = token;
							res.redirect('/portfolio/'+token);

						}else if(response ==='null'){
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
        }
        else{
           res.redirect('/error'); 
        }
      }
    });

	/* request = {
       email: req.body.email,
	   password: req.body.password,
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
					var token = jwt.sign(response, "porfolioSecret");
					sess.token = token;
					res.redirect('/portfolio/'+token);

				}else if(response ==='null'){
					res.render('error.html', { error: 'Authentication error, username or password is incorrect' ,message:''});
					console.log("authentication error");
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
	});*/
 
});
module.exports = router;
