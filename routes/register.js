var express = require('express');
var router = express.Router();
var db = require('../db/db');
var mail = require('../mail_sender/mail');
var password = require('../password_gen/password_gen');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonfile = require('jsonfile');
var file = 'countries_json/countries.json';

/* GET home page. */
router.post('/', urlencodedParser, function(req, res, next) {
	var respo = res;
	var a = ""; 
	jsonfile.readFile(file, function(err, obj) {
		if(err){ 
			console.log(" unable to get json data ");
			res.redirect("/error");
		}else{

			for(i=0; i<obj.length; i++){
			 	if( obj[i].name === req.body.country ){
			 		var country_code = obj[i].code;
			 	}
			}
			 
			password.pass(a, function(err,pass_data){
				if(err){
					console.log(err);
				}
				else{
					console.log(pass_data);
					request = {
				       name: req.body.user_name,
					   organisation: req.body.organisation_name,
					   email: req.body.user_email,
					   phone: req.body.user_phone,
					   password:pass_data,
					   updated_by:req.body.user_name,
					   country_code: country_code,
					   type: 'register'
				   	}
				   	
					db.adddata(request, function(err, response){
						if(err){
							console.log(err);
						}
						else{
							var reg = "You are already registered with this " + request.email;
							
							if(response[0].email){
								if(response[0].email === request.email){
									respo.render('error.html',{error:reg,message:''});
								}else if(response[0].email === 'database'){
									res.render('error.html', { error: 'Something went wrong, please try again later' ,message:''});
								}
								else{
									mail.sendMail(request, function(error, resp){
										if(error){
											console.log(error);
										}
										request_cc = {
									       name: request.name,
										   organisation: request.organisation,
										   email: request.email,
										   phone: request.phone,
										   type: 'CC'
									   	}
										if(resp === 'sent'){
											mail.sendMail(request_cc, function(error, resp){
												if(resp === 'sent'){
													respo.render('reg_success.html',{email_id:request_cc.email});
												}	
											});	
										}else{
											var reg = "Mail not sent";
											respo.render('error.html',{error:reg,message:''});
										}
									});	
									
								}
							}else{
								console.log("failed to read data");
							}
						}
					});
				}
			});	

		}
	  	
	}); 
});


module.exports = router;
