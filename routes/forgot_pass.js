var express = require('express');
var session = require('express-session');
var jwt     = require('jsonwebtoken');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var db = require('../db/db');
var mail = require('../mail_sender/mail');

/* GET home page. */
router.post('/',urlencodedParser, function(req, res, next) {
	var res = res;
	var req = req;
	var request = {
       email: req.body.user_email
	}; 

	db.findData(request, function(err, response){

		if(err){
			console.log(err);
		}
		else{
			if(response){
				var request_fp = {
			       email: response.email,
			       password: response.password,
			       name: response.name,
			       organisation: response.organisation,
			       type: 'forgotPassword'
				};
				if(response.email === request.email){
					mail.sendMail(request_fp, function(error, resp){
							if(resp === 'sent'){
								res.render('fp_success.html',{ email_id:request_fp.email });
							}else{
								var reg = "Mail not sent";
								res.render('error.html',{ error:reg, message:'' });
							}
					});
				}else if(response === 'null'){
					res.render('error.html', { error: 'Username is incorrect, kindly check' ,message:''});
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
 
});
module.exports = router;