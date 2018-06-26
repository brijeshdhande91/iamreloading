function signUpFormvalidation() {
	var isValid = true;
	for (var i = 0; i < document.forms["signUpForm-horizontal"].length-1; i++) {
		var myID = document.forms["signUpForm-horizontal"].elements[i].id;
		if(myID != ""){
			if (document.getElementById(myID).className.indexOf("formfield_req")>-1) {
				if (document.forms["signUpForm-horizontal"].elements[i].value == "") {
					document.getElementById(myID+"_error").style.display="block";
					document.getElementById(myID+"_icon").style.color="#fa5072";
					document.getElementById(myID).classList.remove('formGray');
					document.getElementById(myID).className +=" formInvalid";
					document.getElementById(myID).style.border ="1px solid #fa5072";
					isValid = false;
				} else {
					if(myID!="email"){
						document.getElementById(myID+"_error").style.display="none";
						document.getElementById(myID+"_icon").style.color="#6dba61";
					}
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

function loginFormvalidation() {
	var isValid = true;
	for (var i = 0; i < document.forms["loginForm-horizontal"].length-1; i++) {
		var myID = document.forms["loginForm-horizontal"].elements[i].id;
		if(myID != ""){
			if (document.getElementById(myID).className.indexOf("formfield_req")>-1) {
				if (document.forms["loginForm-horizontal"].elements[i].value == "") {
					document.getElementById(myID+"_error").style.display="block";
					document.getElementById(myID+"_icon").style.color="#fa5072";
					document.getElementById(myID).classList.remove('formGray');
					document.getElementById(myID).className +=" formInvalid";
					document.getElementById(myID).style.border ="1px solid #fa5072";
					isValid = false;
				} else {
					document.getElementById(myID+"_error").style.display="none";
					document.getElementById(myID+"_icon").style.color="#6dba61";
					
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

function resetFormvalidation() {
	var isValid = true;
	for (var i = 0; i < document.forms["resetLoginform-horizontal"].length-1; i++) {
		var myID = document.forms["resetLoginform-horizontal"].elements[i].id;
		if(myID != ""){
			if (document.getElementById(myID).className.indexOf("formfield_req")>-1) {
				if (document.forms["resetLoginform-horizontal"].elements[i].value == "") {
					document.getElementById(myID+"_error").style.display="block";
					document.getElementById(myID+"_icon").style.color="#fa5072";
					document.getElementById(myID).classList.remove('formGray');
					document.getElementById(myID).className +=" formInvalid";
					document.getElementById(myID).style.border ="1px solid #fa5072";
					isValid = false;
				} else {
					document.getElementById(myID+"_error").style.display="none";
					document.getElementById(myID+"_icon").style.color="#6dba61";
					
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

function valNonEmpty(elem) {
	var myElemID = elem.id;
	var myElemErr = document.getElementById(myElemID+"_error");	
	var myElemIcon = document.getElementById(myElemID+"_icon");
	if (elem.value.trim().length>0) {
		elem.style.border = "1px solid #6dba61";
		myElemIcon.style.color="#6dba61";
		elem.style.color =" #6dba61";
		myElemErr.style.display="none";
		return true;
	} else {
		elem.style.border = "1px solid #fa5072";
		myElemIcon.style.color="#fa5072";
		elem.classList.remove('formGray');
		elem.className +=" formInvalid";
		document.getElementById("email_error1").style.display="none";
		myElemErr.style.display="block";
		return false;
	}			
}

function valdconfrmpass (elem){	
	var myElemID = elem.id;
	var myElemIcon = document.getElementById(myElemID+"_icon");
	var passwrd = document.getElementById("password");
	var myElemErr = document.getElementById(myElemID+"_error");
	var cnfpasswrsd = document.getElementById("confirmPassword"); 
	if (cnfpasswrsd.value.trim().length>0) {	
		if(passwrd.value.trim().length>0){
			if(passwrd.value.trim()==cnfpasswrsd.value.trim()){
				document.getElementById("confirmPassword_error2").style.display="none";
				document.getElementById("confirmPassword_error3").style.display="none";
				elem.style.border = "1px solid #6dba61";
				myElemIcon.style.color="#6dba61";
				elem.style.color =" #6dba61";
			}else{
				document.getElementById("confirmPassword_error").style.display="none";
				document.getElementById("confirmPassword_error2").style.display="none";	
				document.getElementById("confirmPassword_error3").style.display="block";
				elem.style.border = "1px solid #fa5072";
				myElemIcon.style.color="#fa5072";
				elem.classList.remove('formGray');
				elem.className +=" formInvalid";
				elem.style.color =" #fa5072";					
			}
		}else{
			document.getElementById("confirmPassword_error2").style.display="block";
			document.getElementById("confirmPassword_error").style.display="none";	
			document.getElementById("confirmPassword_error3").style.display="none"; 		
			elem.style.border = "1px solid #fa5072";
			myElemIcon.style.color="#fa5072";
			elem.classList.remove('formGray');
			elem.className +=" formInvalid";
			elem.style.color =" #fa5072"; 
			document.getElementById("confirmPassword").value= "";
		}		
	}else{	
		document.getElementById("confirmPassword_error").style.display="block";
		document.getElementById("confirmPassword_error2").style.display="none";
		document.getElementById("confirmPassword_error3").style.display="none"; 
	}	
}

 function valEmail(elem) {
	var myElemID = elem.id;
	var myElemErr = document.getElementById(myElemID+"_error");
	var myElemErr1 = document.getElementById(myElemID+"_error1");
	var myElemIcon = document.getElementById(myElemID+"_icon");
	var emailValidation = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var myEmail = document.getElementById(elem.id).value.trim();		
	if (myEmail.length>0) {
		if (emailValidation.test(myEmail)) {	
			elem.style.border = "1px solid #6dba61";
			myElemIcon.style.color="#6dba61";
			elem.style.color =" #6dba61";
			myElemErr.style.display="none";
			myElemErr1.style.display="none";
			return true;
		} else {
			elem.style.border = "1px solid #fa5072";
			myElemIcon.style.color="#fa5072";
			elem.classList.remove('formGray');
			elem.className +=" formInvalid";
			elem.style.color =" #fa5072";
			myElemErr.style.display="none";
			myElemErr1.style.display="block";
			return false;
		}
	}else {
		elem.style.border = "1px solid #fa5072";
		myElemIcon.style.color="#fa5072";
		elem.classList.remove('formGray');
		elem.className +=" formInvalid";
		document.getElementById("email_error1").style.display="none";
		myElemErr.style.display="block";
		myElemErr1.style.display="none";
		return false;
	}					
}
