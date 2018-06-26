$(document).ready(function() {
	// Common Toggle Section
	$(document).on("click", '.rootDivToggle, .paymentOptions_learn_more ', function() {
		toggleBar(this);
	})
	
	/* START ---- Help Center Section */
	.on("click",'.helpCenterLink',function(){
		var index = $(this).index('a');
		if(index == 0){
			$('#Sec' + index).show().siblings('section').hide();
			$('#Sec').show();
			$('.genSec').addClass('active');
			$('.regSec, .paySec, .oneTimeSec').removeClass('active');
		} else if(index == 1){
			$('#Sec' + index).show().siblings('section').hide();
			$('#Sec').show();
			$('.regSec').addClass('active');
			$('.genSec, .paySec, .oneTimeSec').removeClass('active');
		} else if(index == 2){
			$('#Sec' + index).show().siblings('section').hide();
			$('#Sec').show();
			$('.paySec').addClass('active');
			$('.regSec, .genSec, .oneTimeSec').removeClass('active');
		} else if(index == 3){
			$('#Sec' + index).show().siblings('section').hide();
			$('#Sec').show();
			$('.oneTimeSec').addClass('active');
			$('.genSec, .paySec, .regSec').removeClass('active');
		}
	})
	/*.on('click', '.backBtn', function(){
		$('#helpCenters').show();
		$('.link_SEC').hide();
	})*/
	
	.on('click', '.leftNavSection li', function() {
		var cl = $(this).attr('class');
		if(cl === 'genSec'){
			$('.generalBillingSection').show();
			$('.genSec').addClass('active');
			$('.regSection, .paySection, .oneTimeSection').hide();
			$('.regSec, .paySec, .oneTimeSec').removeClass('active');
		} else if(cl === 'paySec'){
			$('.paySec').addClass('active');
			$('.paySection').show();
			$('.generalBillingSection, .regSection, .oneTimeSection').hide();
			$('.regSec, .genSec, .oneTimeSec').removeClass('active');
		} else if(cl === 'regSec'){
			$('.regSection').show();
			$('.generalBillingSection, .paySection, .oneTimeSection').hide();
			$('.regSec').addClass('active');
			$('.genSec, .paySec, .oneTimeSec').removeClass('active');
		} else if(cl === 'oneTimeSec'){
			$('.oneTimeSection').show();
			$('.generalBillingSection, .paySection, .regSection').hide();
			$('.oneTimeSec').addClass('active');
			$('.genSec, .paySec, .regSec').removeClass('active');
		}
	})
	/* END ---- Help Center Section */
	
	/* START - ebillpaperless_learnMore Modal in eBillPaperless Billing page */
	.on("click", '#ebillpaperless_learnMore', function() {
		_WCMSCfun.ebillpaperless_learnMore();
	})
	/* END - ebillpaperless_learnMore Modal in eBillPaperless Billing page */
  
	/* START -- Modify Service Tab Section */
	.on("click", '.tabSection td', function() {
		var cl = $(this).attr('class');
		if (cl == 'modifyService_gas') {
			$('#modifyService_gas_section').removeClass('eleNone');
			$('#modifyService_electric_section').addClass('eleNone');
			$('#modifyService_electric_Tab').removeClass('active');
			$('#modifyService_gas_Tab').addClass('active');
		} else if (cl == 'modifyService_electric') {
			$('#modifyService_gas_section').addClass('eleNone');
			$('#modifyService_electric_section').removeClass('eleNone');
			$('#modifyService_gas_Tab').removeClass('active');
			$('#modifyService_electric_Tab').addClass('active');
		} else if (cl == 'newConstruction_electric') {
			$('#newConstructionGasService').addClass('eleNone');
			$('#newConstructionElectricService').removeClass('eleNone');
			$('#newConstruction_gas_Tab').removeClass('active');
			$('#newConstruction_electric_Tab').addClass('active');
		} else if (cl == 'newConstruction_gas') {
		    $('#newConstructionGasService').removeClass('eleNone');
			$('#newConstructionElectricService').addClass('eleNone');
			$('#newConstruction_gas_Tab').addClass('active');
			$('#newConstruction_electric_Tab').removeClass('active');
		}
	})
	/* END -- Modify Service Tab Section */
 .on("click", '#signup', function() {
		_Signupfun.signup();
	})
	.on("click", '#login', function() {
		_loginfun.login();
	})
	.on("click", '#forgotpassword', function() {
		_forgotpasswordfun.forgotpassword();
	})
	
	
	
});

//LearnMore Modal Function
var _WCMSCfun = {
  ebillpaperless_learnMore: function() {
    $('#ebillSectionDesc').addClass('fade').modal('show');
  }
}

//Toggle Method
function toggleBar(ele) {
	var className = $(ele).parent().attr('class');
	className = className.split(" ");
	for(i=0; i<=className.length; i++){
		if(className[i] === "toggleHeader") {
			$(ele).parent().next('.toggle').toggle();
			if ($(ele).parent().next('.toggle').is(':visible') == true) {
				$(ele).parent().find('.paymentOptionsToggle').hide();
				$(ele).parent().find('.paymentOptions_learn_more').hide();
				$(ele).parent().find('.tglBgColor').addClass('blubgColor');
				$(ele).parent().find('.tglIcon').addClass('fRight');
				$(ele).parent().find('.tglIcon').addClass('contract-icon').removeClass('expand-icon');
				$(ele).parent().find('.tglIcon1').addClass('chevron-up-white').removeClass('chevron-down-blue');
				$('.additionVal:first').addClass('bluColor');
			} else {
				$(ele).parent().find('.paymentOptionsToggle').show();
				$(ele).parent().find('.paymentOptions_learn_more').show();
				$(ele).parent().find('.tglIcon').removeClass('fRight');
				$(ele).parent().find('.tglBgColor').removeClass('blubgColor');
				$(ele).parent().find('.tglIcon').removeClass('contract-icon').addClass('expand-icon');
				$(ele).parent().find('.tglIcon1').removeClass('chevron-up-white').addClass('chevron-down-blue');
				$('.additionVal:first').removeClass('whiteColor');
			}
		}
	}
}
	var _Signupfun = {
  signup: function() {
    $('#signupDesc').addClass('fade').modal('show');
	$('#loginDesc').addClass('fade').modal('hide');
	$('#forgotpasswordDesc').addClass('fade').modal('hide');
  }
} 

var _loginfun = {
  login: function() {
    $('#loginDesc').addClass('fade').modal('show');
	 $('#signupDesc').addClass('fade').modal('hide');
	 $('#forgotpasswordDesc').addClass('fade').modal('hide');
  }
}
 
var _forgotpasswordfun = {
  forgotpassword: function() {
    $('#loginDesc').addClass('fade').modal('hide');
	 $('#signupDesc').addClass('fade').modal('hide');
	 $('#forgotpasswordDesc').addClass('fade').modal('show');
  }
}
