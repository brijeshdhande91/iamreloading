var express	= require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var jwt = require('jsonwebtoken');

exports.sendMail = function sendMail(request, callback) {
	var token = jwt.sign(request, "porfolioSecret");
	var transporter = nodemailer.createTransport(smtpTransport({
	    service: 'gmail',
	    auth: {
	        user: 'xxxxxx@gmail.com', // my mail
	        pass: 'xxxxx'
	    }
	}));
	
	var current_year =  new Date().getFullYear();

	if(request.type === 'register'){
		var mailOptions = {
		    from: 'xxxxx@gmail.com', // sender address 
		    to: request.email, // list of receivers 
		    subject: ' Portfolio', // Subject line 
		    text: '', // plaintext body 
		    html: 	'<div style=" background-color: #eee; padding: 25px;"><div style=" text-align: center;  background-color: #ffffff; padding: 25px; margin-bottom: 25px; " ><img src="http://.com/images/logo_color.png"></img></div><div style=" background-color: #ffffff; padding: 25px;  margin-bottom: 25px; color:#999;"><h1 style="color:#666;">Hello '+request.name +',</h1><h3 style=""><i>Congratulations! you have been registered successfully.</i></h3><p style="">Kindly find your login credentials below:</p><p>Click the link : <a href="http://portfolio..com:3000/new_user_login/'+token+'"><b>Go To Portfolio</b></a>, to explore about .</p> <p>&nbsp;&nbsp;&nbsp;&nbsp;or</p><p>Go to the url : <b><a href="http://portfolio..com:3000/login">URL</a></b></p><p>Username : <b>' +request.email+'</b></p></p> <p>Password : <b>' +request.password+'</b></p></div><div style="padding: 0 25px;  margin-bottom: 25px; color: #999;" ><p>&copy;&nbsp;'+current_year+' &nbsp; All rights Reserved -  </p></div></div>'
		};
	}else if(request.type === 'forgotPassword'){
		var mailOptions = {
	    from: 'xxxxx@gmail.com', // sender address 
	    to: request.email, // list of receivers
	    subject: ' Portfolio', // Subject line 
	    text: '', // plaintext body 
	    html: 	'<div style=" background-color: #eee; padding: 25px;"><div style=" text-align: center;  background-color: #ffffff; padding: 25px; margin-bottom: 25px; " ><img src="http://.com/images/logo_color.png"></img></div><div style=" background-color: #ffffff; padding: 25px;  margin-bottom: 25px; color:#999;"><h1 style="color:#666;">Hello '+request.name +',</h1><h3 style=""><i>Congratulations! you have been registered successfully.</i></h3><p style="">Kindly find your login credentials below:</p><p>Click the link : <a href="http://portfolio..com:3000/new_user_login/'+token+'"><b>Go To Portfolio</b></a>, to explore about .</p> <p>&nbsp;&nbsp;&nbsp;&nbsp;or</p><p>Go to the url : <b><a href="http://portfolio..com:3000/login">URL</a></b></p><p>Username : <b>' +request.email+'</b></p></p> <p>Password : <b>' +request.password+'</b></p></div><div style="padding: 0 25px;  margin-bottom: 25px; color: #999;" ><p>&copy;&nbsp;'+current_year+' &nbsp; All rights Reserved -  </p></div></div>'
		};
	}else{
		var mailOptions = {
	    from: 'xxxxx@gmail.com', // sender address 
	    to: 'xxxxxxx@yahoo.in',
	   	cc: '',
	    subject: ' Portfolio', // Subject line 
	    text: '', // plaintext body 
	    html: '<div style=" background-color: #eee; padding: 25px;"><div style=" text-align: center;  background-color: #ffffff; padding: 25px; margin-bottom: 25px; " ><img src="http://.com/images/logo_color.png"></img></div><div style=" background-color: #ffffff; padding: 25px;  margin-bottom: 25px; color:#999;"><h1 style="color:#666;">Hello,</h1><h3 style=""><i>Following person just now registered with  Portfolio.</i></h3><p style="">Name: '+request.name+'</p><p>Email : <b>' +request.email+'</b></p></p> <p>Phone no. : <b>' +request.phone+'</b></p> <p>Organisation : <b>' +request.organisation+'</b></p><p></div><div style="padding: 0 25px;  margin-bottom: 25px; color: #999;" ><p>&copy;&nbsp;'+current_year+' &nbsp; All rights Reserved -  </p></div></div>'
		};
	}

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        callback("",error)
	    }else{
	    	console.log('Message sent: ' + info.response);
	    	callback("","sent")
		}
	});

}
