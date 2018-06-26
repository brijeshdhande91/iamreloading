$(document).ready(function(){
	$(document).on("click", '#signup', function() {
		_signupfun.signup();
		clearSignUpForm();
	})
	$(document).on("click", '#login', function() {
		_loginfun.login();
		clearLoginForm();
	})
	$(document).on("click", '#forgotpassword', function() {
		_forgotpasswordfun.forgotpassword();
		clearResetForm();
	})
	
	 $("input[name=check]:radio").click(function () {
        if ($("#yes").is(":checked")) {
            $('#urlProduct').attr("disabled", false);
        }else if ($("#no").is(":checked")) {
            $('#urlProduct').attr("disabled", true);
        }
    })
	
    $('.my-form .add-box').click(function(){
        var n = $('.text-box').length + 1;
		if(n<6){
			var box_html = $('<p class="text-box PADDB20PX"><span class="col-sm-12 col-xs-12 PADDDL0PX"><input type="text" name="boxes[]" value="" class="form-control formfield_req" id="box' + n + '" /></span><span class="col-sm-12 col-xs-12 MRGLTTXTRGT"> <a href="#" class="remove-box"><img src="images/delete.png"></a></span></p>');
			box_html.hide();
			$('.my-form p.text-box:last').after(box_html);
			box_html.fadeIn('slow');
			return false;
		} else {
			alert('Only 5 Text-Box Allowed');
		}
    });
	$('.my-form').on('click', '.remove-box', function(){
		$(this).parent().parent().fadeOut("slow", function() {
			$(this).remove();
		});
		return false;
	});
});

var _signupfun = {
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
function clearSignUpForm() {
	var isValid = true;
	for (var i = 0; i < document.forms["signUpForm-horizontal"].length-1; i++) {
		var myID = document.forms["signUpForm-horizontal"].elements[i].id;
		if(myID != ""){
			if (document.getElementById(myID).className.indexOf("formfield_req")>-1) {
				if (myID == 'email') {
					document.getElementById(myID+"_error").style.display="none";
					document.getElementById(myID+"_error1").style.display="none";
					document.getElementById(myID+"_icon").style.color="#808080";
					document.getElementById(myID).classList.remove();
					document.getElementById(myID).className +=" formGray";
					document.getElementById(myID).value ="";
					document.getElementById(myID).style.border ="1px solid #e5e5e5";
					isValid = false;
				} else if (myID == 'userName') {
					document.getElementById(myID+"_error").style.display="none";
					document.getElementById(myID+"_icon").style.color="#808080";
					document.getElementById(myID).classList.remove();
					document.getElementById(myID).className +=" formGray";
					document.getElementById(myID).value ="";
					document.getElementById(myID).style.border ="1px solid #e5e5e5";
					isValid = false;
				} else if (myID == 'password') {
					document.getElementById(myID+"_error").style.display="none";
					document.getElementById(myID+"_icon").style.color="#808080";
					document.getElementById(myID).classList.remove();
					document.getElementById(myID).className +=" formGray";
					document.getElementById(myID).value ="";
					document.getElementById(myID).style.border ="1px solid #e5e5e5";
					isValid = false;
				} else if (myID == 'confirmPassword') {
					document.getElementById(myID+"_error").style.display="none";
					document.getElementById(myID+"_error2").style.display="none";
					document.getElementById(myID+"_error3").style.display="none";
					document.getElementById(myID+"_icon").style.color="#808080";
					document.getElementById(myID).classList.remove();
					document.getElementById(myID).className +=" formGray";
					document.getElementById(myID).value ="";
					document.getElementById(myID).style.border ="1px solid #e5e5e5";
					isValid = false;
				}
				
			}
		}
	}
	if (isValid) {
		return true;
	} else {
		return false;
	}
}
function clearLoginForm() {
	var isValid = true;
	for (var i = 0; i < document.forms["loginForm-horizontal"].length-1; i++) {
		var myID = document.forms["loginForm-horizontal"].elements[i].id;
		if(myID != ""){
			document.getElementById("rememberMe").checked = false;
			if (document.getElementById(myID).className.indexOf("formfield_req")>-1) {
				if (myID == 'loginemail') {
					document.getElementById(myID+"_error").style.display="none";
					document.getElementById(myID+"_icon").style.color="#808080";
					document.getElementById(myID).classList.remove();
					document.getElementById(myID).className +=" formGray";
					document.getElementById(myID).value ="";
					document.getElementById(myID).style.border ="1px solid #e5e5e5";
					isValid = false;
				} else if (myID == 'loginpassword') {
					document.getElementById(myID+"_error").style.display="none";
					document.getElementById(myID+"_icon").style.color="#808080";
					document.getElementById(myID).classList.remove();
					document.getElementById(myID).className +=" formGray";
					document.getElementById(myID).value ="";
					document.getElementById(myID).style.border ="1px solid #e5e5e5";
					isValid = false;
				} 
			}
		}
	}
	if (isValid) {
		return true;
	} else {
		return false;
	}
}

function clearResetForm() {
	document.getElementById("forgotemail_error").style.display="none";
	document.getElementById("forgotemail_error1").style.display="none";
	document.getElementById("forgotemail_icon").style.color="#808080";
	document.getElementById("forgotemail").classList.remove();
	document.getElementById("forgotemail").className +=" formGray";
	document.getElementById("forgotemail").value ="";
	document.getElementById("forgotemail").style.border ="1px solid #e5e5e5";
}
 
/* for portfolio dropdown header*/


$(document).ready(function () {
  $('.toggle').on('click', function() {
    $('. container').stop().addClass('active');
  });

  $('.close').on('click', function() {
    $('. container').stop().removeClass('active');
  });

  $('.dropdown').click(function() {
    $(this).toggleClass('cart-90deg');
  });
  $('.menurem').click(function(){
    $('#slidrmv').removeClass('slide-in');
  });
  $('.editbtn').click(function() {
    $(this).toggleClass('edittog');
    $(this).toggleClass('savetog');
    $(this).next('button').removeClass('hidebtn');
    
  });

});
 
/* for portfolio header slide up and slid down*/

$(document).ready(function () {
    $(".header_nav").slideUp(1000);
    $("#nh_header").hover(function() {
    	if ( $( ".header_nav" ).is( ":hidden" ) ) {
       		 $(".header_nav").slideDown(1000);
       		 $(".fixed_header ").addClass('top61px');
       		 $(".cntntShow").removeClass('MRGN80PX');
       		 $(".cntntShow").addClass('MRGT140PX');
       		 $(".sell_reg_show").addClass('MRGN80PX');
       		 $("#arrow_hide").hide();
       		
    	}
    });

    $("#nh_show").hover(function() {
    	if ( !$( ".header_nav" ).is( ":hidden" ) ) {
        	$(".header_nav").slideUp(1000);
        	$(".fixed_header ").removeClass('top61px');
       		$(".cntntShow").removeClass('MRGT140PX');
       		$(".cntntShow").addClass('MRGN80PX');
       		$(".sell_reg_show").removeClass('MRGN80PX');
       		$("#arrow_hide").show();
    	}
    });


    $("#hideHeader").hover(function() {
      if ( $( ".header_nav" ).is( ":hidden" ) ) {
        $( ".header_nav" ).slideDown(1000);
      } else {
        $( ".header_nav" ).slideUp(1000);
      }
    });

});