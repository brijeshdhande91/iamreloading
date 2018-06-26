/*START -- Seller Regisration Validation */
function sellerRegistrationValidation() {
	var isValid = true;
	for (var i = 0; i < document.forms["registrationForm"].length-1; i++) {
		var myID = document.forms["registrationForm"].elements[i].id;
		if (document.getElementById(myID).className.indexOf("formfield_req")>-1) {
			if (document.forms["registrationForm"].elements[i].value == "") {
				document.getElementById(myID+"_error").style.display="block";
				document.getElementById(myID+"_success").style.display="none";
				isValid = false;
			} else {
				if(myID != "password" && myID != "confirmPassword"){
					document.getElementById(myID+"_error").style.display="none";
					document.getElementById(myID+"_success").style.display="block";
				}
			}
		}
	} 
	if (!ValidCaptcha()) {
		isValid = false;
	}
	if (!valEmail()) {
		isValid = false;
	}
	if (isValid) {
		return true;
	} else {
		return false;
	}
}
function valNonEmpty(elem) {
	var myElemID = elem.id;
	var myElemErr = document.getElementById(myElemID+"_error");
	var myElemSuccess = document.getElementById(myElemID+"_success");
	if (elem.value.trim().length>0) {
		myElemErr.style.display="none";
		myElemSuccess.style.display="block";
		return true;
	} else {
		myElemErr.style.display="block";
		myElemSuccess.style.display="none";
		return false;
	}			
}
function pwdValidation(elem) {
	var myElemID = elem.id;
	var myElemErr = document.getElementById(myElemID+"_error");
	var password = document.getElementById("password").value;
	var cfpassword = document.getElementById("confirmPassword").value;
	var myElemSuccess = document.getElementById(myElemID+"_success");
	if (elem.value.trim().length>3 && myElemID === "password") {
		if( cfpassword !== elem.value && cfpassword!=""){
			myElemErr.style.display="none";
			myElemSuccess.style.display="block";
			document.getElementById("confirmPassword_error").style.display="block";
			document.getElementById("confirmPassword_success").style.display="none";
			return true;
		}else if( cfpassword === elem.value && cfpassword!=""){
			myElemErr.style.display="none";
			myElemSuccess.style.display="block";
			document.getElementById("confirmPassword_error").style.display="none";
			document.getElementById("confirmPassword_success").style.display="block";
			return true;
		}else if(cfpassword == "" && elem.value.trim().length>3){
			myElemErr.style.display="none";
			myElemSuccess.style.display="block";
			document.getElementById("confirmPassword_error").style.display="none";
			return true;
		}
	} else if (elem.value!="" && password === elem.value  && myElemID === "confirmPassword") {
		myElemErr.style.display="none";
		myElemSuccess.style.display="block";
		return true;
	} else {
		myElemErr.style.display="block";
		myElemSuccess.style.display="none";
		return false;
	}			
}

function valEmail() {
	var emailValidation = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var myEmail = document.getElementById("sellerEmail").value.trim();
	if (myEmail.length>0) {
		if (emailValidation.test(myEmail)) {
			document.getElementById("sellerEmail_error").style.display="none";
			document.getElementById("sellerEmail_success").style.display="block";
			return true;
		} else {
			document.getElementById("sellerEmail_error").style.display="block";
			document.getElementById("sellerEmail_success").style.display="none";
			return false;
		}
	}
}
/*END -- Seller Regisration Validation*/

/* START -- Seller Verification Validation */
function sellerVerficationValidation() {
	var isValid = true;
	for (var i = 0; i < document.forms["verificationForm"].length-1; i++) {
		var myID = document.forms["verificationForm"].elements[i].id;
		if(myID != ""){
			if (document.getElementById(myID).className.indexOf("formfield_req")>-1) {
				if (document.forms["verificationForm"].elements[i].value == "") {
					document.getElementById(myID).style.border="1px solid red";
					isValid = false;
				} else {
					document.getElementById(myID).style.border="1px solid #e5e5e5";
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


function sellerVerificationValNonEmpty(elem) {
	var myElemID = elem.id;
	if (elem.value.trim().length>0) {
		elem.style.border="1px solid #e5e5e5";
		return true;
	} else {
		elem.style.border="1px solid red";
		return false;
	}			
}
/*END  -- Seller Verification Validation*/

/* START -- Seller Information Validation */
function sellerInformationValidation() {
	var isValid = true;
	for (var i = 0; i < document.forms["informationForm"].length-1; i++) {
		var myID = document.forms["informationForm"].elements[i].id;
		if(myID != ""){
			if (document.getElementById(myID).className.indexOf("formfield_req")>-1) {
				if (document.forms["informationForm"].elements[i].value == "") {
				document.getElementById(myID+"_error").style.display="block";
				document.getElementById(myID).style.border="1px solid red";
				isValid = false;
			} else {
				document.getElementById(myID+"_error").style.display="none";
				document.getElementById(myID).style.border="1px solid #e5e5e5";
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

function sellerInformationValNonEmpty(elem) {
	var myElemID = elem.id;
	var myElemErr = document.getElementById(myElemID+"_error");
	var myElemSuccess = document.getElementById(myElemID+"_success");
	if (elem.value.trim().length>0) {
		myElemErr.style.display="none";
		elem.style.border="1px solid #e5e5e5";
		return true;
	} else {
		myElemErr.style.display="block";
		elem.style.border="1px solid red";
		return false;
	}			
}

function AccNumValidation(elem) {
	var myElemID = elem.id;
	var myElemErr = document.getElementById(myElemID+"_error");
	var accNumber = document.getElementById("accNumber").value;
	if ( myElemID === "accNumber" && elem.value.trim().length>0) { 
		myElemErr.style.display="none";
		elem.style.border="1px solid #e5e5e5";
		return true;
	} else if (elem.value!="" && accNumber === elem.value  && myElemID === "confirmAccNumber") {
		myElemErr.style.display="none";
		elem.style.border="1px solid #e5e5e5";
		return true;
	} else {
		myElemErr.style.display="block";
		elem.style.border="1px solid red";
		return false;
	}			
}
/*END -- Seller Information Validation*/

function Captcha(){
	 var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
	 var i;
	 for (i=0;i<6;i++){
	   var a = alpha[Math.floor(Math.random() * alpha.length)];
	   var b = alpha[Math.floor(Math.random() * alpha.length)];
	   var c = alpha[Math.floor(Math.random() * alpha.length)];
	   var d = alpha[Math.floor(Math.random() * alpha.length)];
	   var e = alpha[Math.floor(Math.random() * alpha.length)];
	   var f = alpha[Math.floor(Math.random() * alpha.length)];
	   var g = alpha[Math.floor(Math.random() * alpha.length)];
	  }
	var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
	document.getElementById("mainCaptcha").innerHTML = code
  }
  function ValidCaptcha(){
	  var string1 = removeSpaces(document.getElementById('mainCaptcha').innerHTML);
	  var string2 = removeSpaces(document.getElementById('captcha').value);
	  if(string2.length>0){
		  if (string1 == string2){
			document.getElementById('captcha_success').style.display='block';
			document.getElementById('captcha_error').style.display='none';
			return true;
		  }
		  else{        
			document.getElementById('captcha_success').style.display='none';
			document.getElementById('captcha_error').style.display='block';
			return false;
		  }
	  }
  }
  function removeSpaces(string){
	return string.split(' ').join('');
  }
  
  //allow only numeric Value in textbox
function validateNumeric(key) {
  var keycode = (key.which) ? key.which : key.keyCode;
  if ( (keycode < 48 ||   keycode > 57)) {
    return false;
  } else {
    return true;
  }
}