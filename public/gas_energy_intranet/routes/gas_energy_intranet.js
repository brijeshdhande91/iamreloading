var express = require('express');
var router = express.Router();
var session = require('express-session');
var jsonfile = require('jsonfile');
var file = 'public/gas_energy_intranet/jsonResponses/single_acc_newformat.json';
var contextualInfo = require('../js/node_contextualInfo');

/* GET home page. */
router.get('/', function(req, res, next) {
	var res = res;
	var a="";
	jsonfile.readFile(file, function(err, obj) {
		if(err){ 
			console.log(" unable to get json data ");
			res.redirect("/error");
		}
	  	contextualInfo.context(a, function(error, response){
	  		if(error){
	  			console.log(" unable to get contextual data ");
	  			res.redirect("/error");
	  		}
			var contextualHelpList= response;
			var sess= req.session;
		  	res.render('gas_energy_intranet/current_bill.html',{token:sess.token,select:"Gas & Energy Intranet Portal",balanceData:obj.balanceData ,currentBillData:obj.currentBillData,name:sess.name, invLineItmsData:obj.invoiceLineItems, billCompareData: obj.billCompareData, contextHelpItem: contextualHelpList});
	  	});
	});
});

router.get('/payment_plan', function(req, res, next) {
	var res = res;
	var a="";
	jsonfile.readFile(file, function(err, obj) {
		if(err){ 
			console.log(" unable to get json data ");
			res.redirect("/error");
		}
	  	contextualInfo.context(a, function(error, response){
	  		if(error){
	  			console.log(" unable to get contextual data ");
	  			res.redirect("/error");
	  		}
			var contextualHelpList= response;
			var sess= req.session;
		  	res.render('gas_energy_intranet/payment_plan.html',{token:sess.token,select:"Gas & Energy Intranet Portal",balanceData:obj.balanceDataPayment ,currentBillData:obj.currentBillDataPayment,name:sess.name, invLineItmsData:obj.invoiceLineItemsPayment, billCompareData: obj.billComparison0101, contextHelpItem: contextualHelpList, paymentPlanData: obj.paymentPlanData});
	  	});
	});
});

router.get('/multiple_accounts', function(req, res, next) {
	var res = res;
	var a="";
	jsonfile.readFile(file, function(err, obj) {
		if(err){ 
			console.log(" unable to get json data ");
			res.redirect("/error");
		}
	  	contextualInfo.context(a, function(error, response){
	  		if(error){
	  			console.log(" unable to get contextual data ");
	  			res.redirect("/error");
	  		}
			var contextualHelpList= response;
			var sess= req.session;
		  	res.render('gas_energy_intranet/multipleAcc.html',{token:sess.token,select:"Gas & Energy Intranet Portal",balanceData:obj.balanceDataPlan ,currentBillData:obj.currentBillDataPlan,name:sess.name});
	  	});
	});
});
module.exports = router;