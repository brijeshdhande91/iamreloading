var utils = {
	month : [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	],

	getURLParam : function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
			return null;
		} else{
			if (results.length > 1) {
				return decodeURIComponent(results[1]);
			} else {
				return null;
			}
		}
	},

	/* DEBUG
	 * Constant to turn debug on and off
	 */
	DEBUG : function(){
		return (utils.getURLParam("DEBUG") == "true")? true :false;
	},

	/* getCookie
	 * Get cookie by name - uses regex
	 */
	getCookie : function( name ){
		var pattern = RegExp( name + "=.[^;]*" ),
			matched = document.cookie.match( pattern );
		if( matched ){
			var cookie = matched[0].split('=');
			return cookie[1];
		}
		return "";
	},

	/* compareValuesEnable
	 * compare 2 field values and enable submit
	 */
	compareValuesEnable:function(val1, val2, mButton) {
    	if (val1 === val2) {
			//Enable submit button
			mButton.removeAttr("disabled");
        	return true;       	
    	} else return false;
	},

	/* validateServiceResponse
	 * Param data object
	 */
	validateServiceResponse:function(data){
		if(typeof data !== 'undefined'){
			return true;
		}else
		{
			return false;
		}
	},
	
	/* onDataSuccess
	 * invoked if collection/model.fetch() is successfull
	 */
	onDataSuccess : function(data){
		utils.writeLog("onDataSuccess");
	},

	/* onDataError
	 * invoked if collection/model.fetch() is failed
	 * Error message has to be retrieved from WCM - Content
	 * Content is retrieved at dte-web-messages library
	 */
	onDataError:function(data){
		utils.writeLog("Rest service call is failed to call ");
		if(typeof arguments[1] !== 'undefined'){
			if(arguments[1].status == 404){
			utils.writeLog(arguments[1].responseText);
			//window.location.href("../html/error.html");
			}else if(arguments[1].status == 500){
				utils.writeLog(arguments[1].statusText);
			}
		}
	},

	/* onSuccess
	 * onSuccess
	 */
	onSuccess:function(resp,model,options,success){
		utils.writeLog("onSuccess method start");
		 if (!model.set(model.parse(resp, options), options)) return false;
		if (success){ 
			success(model, resp, options);
		}
		model.trigger('sync', model, resp, options);
		utils.writeLog("onSuccess method end");
	},

	/* onError
	 * handle error at model or collection level
	 */
	onError:function(resp,model,options,error){
		utils.writeLog("error ",arguments);
		if(error){ 
			error(model,resp,options);
		}
		model.trigger('error',model,resp,options);
		utils.writeLog("onError method end");
	},

	/* write logs
	 */
	writeLog:function(msg){
		if(utils.DEBUG()){
			if (typeof console === "undefined" || typeof console.log === "undefined") {
			}else{
				if (typeof msg != "undefined") {
					console.log(msg);
				} else {
					console.log("Log message without msg");
				}
			}
		}
	},

	/* displayFloatWithDecimals
		 * it takes care of display 2 decimal places
		 */
	displayFloatWithDecimals:function(data){
		var decimalValues;
		if (isNaN(parseFloat(data))) {
			data = "0.00";
		}
		if(utils.validateServiceResponse(data) && data.toString().length > 0){
			decimalValues = "$"+parseFloat(data).toFixed(2);
			utils.writeLog(decimalValues);
			return decimalValues;
		}else{
			return "";
		}
	},

	/* address concatenation
	 */
	addressConcatenation : function(data){
		var address="";
		if(typeof data.address !== 'undefined'){
			address=this.formatName(data.address)+" \n";
		}
		if(typeof data.city !== 'undefined'){
			address+=this.formatName(data.city)+", ";
		}
		if(typeof data.state !== 'undefined'){
			address+=data.state+" ";
		}
		if(typeof data.zip !== 'undefined'){
			address+=data.zip;
		}
		
		var len = address.lastIndexOf(",")+1;
		
		var addressLen = address.length;
		
		if(len == addressLen){
			address = address.substr(0,(address.length)-1);
		}
		
		return address;
	},

	cityStateZipConcatenation : function(data){
		var address = "";
		
		if(typeof data.city !== 'undefined'){
			address+=this.formatName(data.city)+", ";
		}
		if(typeof data.state !== 'undefined'){
			address+=data.state+" ";
		}
		if(typeof data.zip !== 'undefined'){
			address+=data.zip;
		}
		
		var len = address.lastIndexOf(",")+1;
		
		var addressLen = address.length;
		
		if(len == addressLen){
			address = address.substr(0,(address.length)-1);
		}
		
		return address;
		
	},

	formatInputs:function(){
		$('input.currency').each(function() {
			$(this).val( ($(this).val().charAt(0) == "$" ) ? $(this).val() : ("$" + $(this).val()) );
		});
		$('.currency').each(function() {
			$(this).text( ($(this).text().charAt(0) == "$" ) ? $(this).text() : ("$" + $(this).text()) );
		});
	},

	displayCreditCardImages:function(cardType,type){
		var image='';
		if(cardType.toLowerCase() === "visa"){
			image = (type === "header")?"<div class='cc-icon-wrapper'><div class='icon-visa-white'></div></div>":"<div class='cc-icon-wrapper'><div class='icon-visa-blue'></div></div>";				
		}else if(cardType.toLowerCase() === "mastercard"){
			image = (type === "header")?"<div class='cc-icon-wrapper'><div class='icon-mastercard-white'></div></div>":"<div class='cc-icon-wrapper'><div class='icon-mastercard-blue'></div></div>";	
		}else if(cardType.toLowerCase() === "discover"){
			image = (type === "header")?"<div class='cc-icon-wrapper'><div class='icon-discover-white'></div></div>":"<div class='cc-icon-wrapper'><div class='icon-discover-blue'></div></div>";	
		}else if(cardType.toLowerCase() === "paypal"){
			image ="";
		}
		return image;
	},

	enablePayment:function(){
		var enablePayment = false;
		if($("#accountVerified").val()== "true" && $("#single_account_payment_input").val() != null && isPaymentMethodComplete()) {
			enablePayment = true;
		}
		if(enablePayment) {
			$("#confirmPaymentButton").removeClass("disabled");
			$("#confirmPaymentButton").removeClass("disabled-button");
		} else {
			$("#confirmPaymentButton").addClass("disabled");
			$("#confirmPaymentButton").addClass("disabled-button");
		}
	},

	isPaymentMethodComplete:function() {
		if($("#add-credit-card-wrapper").hasClass("active")) {
			if($("#cc_name").val() != '' && $("#cc_num").val() != '' && $("#cc_zip_code").val() != '' && $("#cc_cvv_code").val() != '') {
				return true;
			} else {
				return false;
			}
		} else if ($("#add-bank-account-wrapper").hasClass("active")) {
			if($("#bank_acct_name").val() != '' && $("#bank_acct_num").val() != '' && $("#bank_acct_num2").val() != '' && $("#cc_bank_routing_num").val() != '') {
				return true;
			} else {
				return false;
			}
		}
	},

	sumPayments:function() {
		var total = 0;
		$("[name=payment_amount].currency").each(function() {
			if (!($(this).hasClass("hidden"))) {
				var value = $(this).val();
				value = value.replace(/\$/g,"");
				value = parseFloat( (isNaN(parseFloat(value))) ? 0 : value);
				total += value;
			}
		});
		return total;
	},

	creditCardValidations:function(){
		$(".credit-card").on("keyup keypress blur change", function(){
			$(this).addClass("active");
			var ccValue = $(".credit-card.active").val();
			if (ccValue.match(/^4/)){
				$("span.creditCardImage").html("<div class='icon-visa-blue'></div>");
			} else if (ccValue.match(/^5[1-5]/)){
				$("span.creditCardImage").html("<div class='icon-mastercard-blue'></div>");
			} else if (ccValue.match(/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/)){
				$("span.creditCardImage").html("<div class='icon-discover-blue'></div>");
			} else {
				$("span.creditCardImage").html("");
			}
		});
		//End Credit Card Validation

		// Prevent bubbling

		//restrict numeric input
		$('.currency').keydown(function(event) {
			if (event.shiftKey == false && event.altKey == false && event.ctrlKey == false && event.metaKey == false) {
				if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) || event.which == 190 || event.which == 110) {
					var value = $(event.target).val();
					if ((event.which == 190 || event.which == 110) && value.indexOf(".") != -1) {
						event.preventDefault();
						return;
					}
					var newKey = String.fromCharCode((event.which >= 96 && event.which <= 105)? event.which-48 : event.which);
					if (event.which == 190 || event.which == 110) {
						newKey = ".";
					}
					value = value.substring(0,event.target.selectionStart) + newKey + value.substring(event.target.selectionEnd,value.length);
					value = value.replace(/\$/g,"");
					var f = parseInt( (isNaN(parseFloat(value))) ? 0 : value);
					utils.writeLog("value = '" + value + "' f = '" + f + "'");
					if (f > 99999) {
						event.preventDefault();
					}
				} else {
					if (event.which == 8 /* backspace */
						|| event.which == 9 /* tab */
						|| event.which == 37 /* left */
						|| event.which == 39 /* right */
						|| event.which == 45 /* insert */
						|| event.which == 46 /* delete */
						|| event.which == 36 /* home */
						|| event.which == 35 /* end */ ) {
						/* allow */
					} else {
						event.preventDefault();
					}
				}
			} else {
				if (event.shiftKey == true && event.which == 9 /* tab */) {
					// allow
				} else {
					event.preventDefault();
				}
			}
		});
		$("[name=payment_amount].currency,[name=payment_method_amount].currency").blur(function(event){
			var value = $(event.target).val();
			value = value.replace(/\$/g,"");
			value = parseFloat( (isNaN(parseFloat(value))) ? 0 : value);
			if (value < 1.00 && value > 0){
				$(this).val('$1.00');
			} else if(value > 99999.99){
				$(this).val('$99999.99');	
			} else if (value >= 1.00) {
				$(this).val("$" + parseFloat(value).toFixed(2));
			} else {
				$(this).val('$0.00');
			}
			$("#multiple_account_payment_amount").text("$" + parseFloat(utils.sumPayments()).toFixed(2));
		});
		$('[name=payment_amount].currency,[name=payment_method_amount].currency').keydown(function(event) {
			var value = $(event.target).val();
			value = value.substring(0,event.target.selectionStart) + String.fromCharCode(event.keyCode) + value.substring(event.target.selectionEnd,value.length);
			value = value.replace(/\$/g,"");
			value = parseFloat( (isNaN(parseFloat(value))) ? 0 : value);
			var code = event.keyCode || event.which;
			if (code == '9') {
				if (value < 1.00 && value > 0){
					$(this).val('$1.00');
				}
			}
		});
		$('.numeric').keydown(function(event) {
			if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
				// Allow: Ctrl+A
				(event.keyCode == 65 && event.ctrlKey === true) ||
				// Allow: home, end, left, right
				(event.keyCode >= 35 && event.keyCode <= 39) ||
				// Allow: numpad Decimal
				(event.keyCode == 110)
			) {
				// let it happen, don't do anything
				return;
			} else {
				// Ensure that it is a number and stop the keypress
				if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
					event.preventDefault();
				}
			}
		});
	},

	/* save
	 * save values into HTML5 local storage
	 */
	save : function(key,value){
		if(utils.detectHTML5Storage()){
			localStorage.setItem(key,value);
		}else{
			//return to different HTML page that doesn't support HTML5 Supports;
			utils.redirectToErrorPage("browser doesn't support HTML5");
		}
	},

	/* read
	 * read values from HTML5 local storage
	 */
	read:function(key){
		if(utils.detectHTML5Storage()){
			return localStorage.getItem(key);
		}else{
			//return to different HTML page that doesn't support HTML5 Supports;
			utils.redirectToErrorPage("browser doesn't support HTML5");
		}
	},

	/* detectHTML5Storage
	 * detect whether browser supports HTML5 or not.
	 */
	detectHTML5Storage : function(){
		if(window['localStorage'] !== null && window['sessionStorage'] !== null){
			return true;
		}else{
			return false;
		}
	},

	/* convertServiceDateFormat
	 * convertDate format yyyy-mm-dd 
	 */
	convertServiceDateFormat : function(date){
		if(date !== ""){
			var convertDate = new Date(date);
			var month = convertDate.getMonth();
			var year = convertDate.getFullYear();
			var date = convertDate.getDate();
		
			month = month + 1;
			if (month < 10) {
				month = "0" + month;
			}
			if (date < 10) {
				date = "0" + date;
			}
		
			return year+"-"+month+"-"+date;
		}else{
			return '';
		}
	},

	/* getTimeStamp
	 * get current timestamp
	 */
	getTimeStamp : function(){
		if (!Date.now()) {
			Date.now = function() { return new Date().getTime(); };
			return Date.now;
		}else{
			return Date.now();
		}
	},

	/* sessionSave
	 * sessionstorage save
	 */
	sessionSave : function(key,value){
		if(utils.detectHTML5Storage()){
			sessionStorage.setItem(key,value);
		}else{
			//return to different HTML page that doesn't support HTML5 Supports;
			utils.redirectToErrorPage("browser doesn't support HTML5");
		}
	},

	/* sessionRead
	 * sessionstorage read
	 */
	sessionRead : function(key){
		if(utils.detectHTML5Storage()){
			return sessionStorage.getItem(key);
		}else{
			//return to different HTML page that doesn't support HTML5 Supports;
			utils.redirectToErrorPage("browser doesn't support HTML5");
		}
	},

	/* sessionRemove
	 * remove session object
	 */
	sessionRemove : function(key){
		if(utils.detectHTML5Storage()){
			return sessionStorage.removeItem(key);
		}else{
			utils.redirectToErrorPage("browser doesn't support HTML5");
			
		}
	},

	/* redirectToErrorPage
	 * Redirect to error page/content
	 */
	redirectToErrorPage : function(msg){
		utils.writeLog(msg);
		return false;
	},
	
	/* getCardTypeByTag
	 * Card type (VISA,MASTER,DISCOVER)
	 * Pass div tag to this method
	 */
	getCardTypeByTag : function(divTag){
		if(utils.validateServiceResponse(divTag)){
			if(divTag.indexOf("visa") > -1){
				return "Visa";
			}else if(divTag.indexOf("mastercard") > -1){
				return "MasterCard";
			}else if(divTag.indexOf("discover") > -1){
				return "Discover";
			}else{
				return "";
			}
		}else{
			utils.writeLog("No Object found...");
			return '';
		}
	},
	
	/* loadTemplate
	 * Load html template
	 * params: templName: templatename
	 * jsonData: json data
	 * cardValidations: true/false
	 * obj: pass id of div to load template
	 */
	loadTemplate : function(templName,jsonData,cardValidations,obj){
		//var dfd = $.Deferred();
	 var promise = $.get( templName, function (data) {
			
			var template = _.template(data, jsonData);
		   
			obj.html(template);
		   
			if(cardValidations)
				//credit card validations
				utils.creditCardValidations();
			 
	 });
	  return promise;
	},

	/* getCurrentDate
	 * Get current date format
	 * param: serverDate
	 */
	getCurrentDate : function(serverDate){
		var newDate = new Date();
		if (typeof serverDate != "undefined" && serverDate != "") {
			var dateSplit = serverDate.split("T");
			var dtSplit = dateSplit[0].split("-");
			if (dtSplit.length > 2) {
				var month = dtSplit[1];
				month = parseInt(month) - 1;
				newDate = new Date(dtSplit[0],month,dtSplit[2]);
			}
		}
		return newDate;
	},

	/* showCardDetails
	 * show creditcard details tab
	 * This is for Add payment methods modal dialog
	 */
	showCardDetails : function(obj){
		$("#"+obj.id).addClass("active");
		$("#modal-add-bank-account-wrapper-aid").removeClass("active");
		$("#modal-add-credit-card-wrapper").addClass("active");
		$("#modal-add-bank-account-wrapper").removeClass("active");	
		enableAddPaymentMethod();		
		
	},

	/* showBankDetails
	 * show bankdetails tab
	 * This is for Add payment methods modal dialog
	 */
	showBankDetails : function(obj){
		$("#"+obj.id).addClass("active");
		$("#modal-add-credit-card-wrapper-aid").removeClass("active");
		$("#modal-add-bank-account-wrapper").addClass("active");
		$("#modal-add-credit-card-wrapper").removeClass("active");
		enableAddPaymentMethod();
	},

	/* addHiddenClass
	 * add hidden class to dom obj
	 */
	addHiddenClass : function(id){
		id.addClass("hidden");
	},
	
	/* removeHiddenClass
	 * remove hidden class to dom obj
	 */
	removeHiddenClass : function(id){
		id.removeClass("hidden");
	},
	
	/* enableFieldsForFutureUse
	 * Fields are being enabled upon clicking checkbox
	 * This is for paybill,managementpayment methods page
	 */
	enableFieldsForFutureUse : function(obj,id){
		utils.writeLog("obj id"+obj.id);
		if(obj.checked){
			utils.removeHiddenClass($("#"+id));
		}else{
			utils.addHiddenClass($("#"+id));
		}
	},

	/* clearLocalStorage
	 * localStorage.clear();
	 */
	clearLocalStorage : function(){
		localStorage.clear();
	},

	/* clearSessionStorage
	 * sessionStorage.clear();
	 */
	clearSessionStorage : function(){
		sessionStorage.clear();
	},

	scrollWindowToTop : function() {
		$( 'html, body' ).animate( { scrollTop: 0 }, 0 );
	},

	addBannerMsg : function(id, code, messageText) {
		if ((code.indexOf(".400.") > -1) || (code.indexOf(".410.") > -1)) {
			code += " dte-tomato padding-left-10px padding-right-10px";
		}
		$("#" + id).removeClass("hidden");
		var html = "<div class='padding-top-md padding-bottom-md " + code + "'>" + messageText + "</div>";
		$("#" + id).append(html);
	},

	clearBannerMsg : function(id) {
		$("#" + id).addClass("hidden");
		$("#" + id).html("");
	},

	obscureNumber : function( value ){
		var newValue = value.split( '' );
		if( value.length > 5 ){
			for( i = 0; i < value.length - 5; i++ ){
				newValue[i] = 'X';
			}
		} 
		return newValue.join("");
	},

	lastFour : function( value ){
		return value.substring( -4, value.length );
	},

	formatName : function(str){
		var returnValue = str || "";
		returnValue = returnValue.toLowerCase();
		return returnValue.replace(
			/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
			function(firstLetter){
				return firstLetter.toUpperCase();
			}
		);
	},

	convertDateFormat : function(dateString) {
		// input format is YYYY-MM-DD
		var dateElements = dateString.split("-");
		if (dateElements.length > 2) {
			// output format is MM/DD/YYYY
			return dateElements[1] + "/" + dateElements[2] + "/" + dateElements[0];
		} else {
			return dateString;
		}
	},

	formatAccountNumber : function( accountNumber ){
		return /^(\d{4})(\d{3})(\d{4})(\d{1})$/.exec( accountNumber ).slice( 1 ).join( ' ' );
	},

	formatCurrencyDisplay : function(moneyString, currencyType) {
		if(moneyString != "") {
			var converted = parseFloat(moneyString);
			if(!isNaN(converted)) {
				if(converted != 0) {
					return currencyType + converted.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
				} else {
					return currencyType + converted.toFixed(2);
				}
			} else {
				return "";
			}
		} else {
			return "";
		}
	},

	/**************************************************************************
	 * This function takes in a string with date information in any valid     *
	 * format and return a string with date formatted as follows              *
	 * fullMonth DD, YYYY                                                     *
	 **************************************************************************/
	formatDateLong : function( dateStr ){
		var d           = new Date( dateStr ),
			monthStr    = this.month[d.getMonth()],
			dayStr      = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate(),
			fullYearStr = d.getFullYear();
		return [[monthStr, dayStr].join( ' ' ), fullYearStr].join( ', ' );
	},

	formatPhone : function( phone ){
		var match = /^(\d{3}).*(\d{3}).*(\d{4})$/.exec( phone );
		if(match === null)return phone;

		return [match[1], match[2], match[3]].join( '.' );  
	},

	showConfirmationHeader : function() {
		$("#header-title").addClass("hidden");
		$("#header-confirmation").removeClass("hidden");
		$("#header-cancel").addClass("hidden");
	},

	limitStringLength : function( str, charCount ){
		var str2 = str;

		while( str2.length >= charCount ){
			str2 = str2.lastIndexOf( ' ' ) > 0 ? str2.substr( 0, str2.lastIndexOf( ' ' )) : str2.substr( 0, charCount - 1 );
		}
		return str.length > str2.length ? str2 + '&hellip;' : str2;
	},

		/* Formatting CSS fontsize based on the length of the text to be fitted in*/
	shrinkSize : function(number , selector){
	   var fontSize = parseFloat($(selector).css( 'font-size' ));
	   while($(selector).width() > number){  
	    $(selector).css( 'font-size', 'fontSize' );
	    $(selector).css( 'font-size', --fontSize );
	   }   
	} 

};

$('#selecctall1').click(function(event) {  //on click 
	if(this.checked) { // check select status
		$('.checkbox1').each(function() { //loop through each checkbox
			this.checked = true;  //select all checkboxes with class "checkbox1"               
		});
	} else {
		$('.checkbox1').each(function() { //loop through each checkbox
			this.checked = false; //deselect all checkboxes with class "checkbox1"                       
		});         
	}
});

$('#selecctall2').click(function(event) {  //on click 
	if(this.checked) { // check select status
		$('.checkbox2').each(function() { //loop through each checkbox
			this.checked = true;  //select all checkboxes with class "checkbox1"               
		});
	} else {
		$('.checkbox2').each(function() { //loop through each checkbox
			this.checked = false; //deselect all checkboxes with class "checkbox1"                       
		});         
	}
});

$('#selecctall3').click(function(event) {  //on click 
	if(this.checked) { // check select status
		$('.checkbox3').each(function() { //loop through each checkbox
			this.checked = true;  //select all checkboxes with class "checkbox1"               
		});
	} else {
		$('.checkbox3').each(function() { //loop through each checkbox
			this.checked = false; //deselect all checkboxes with class "checkbox1"                       
		});         
	}
});

$('#selecctall4').click(function(event) {  //on click 
	if(this.checked) { // check select status
		$('.checkbox4').each(function() { //loop through each checkbox
			this.checked = true;  //select all checkboxes with class "checkbox1"               
		});
	} else {
		$('.checkbox4').each(function() { //loop through each checkbox
			this.checked = false; //deselect all checkboxes with class "checkbox1"                       
		});         
	}
});

$('#selecctall5').click(function(event) {  //on click 
	if(this.checked) { // check select status
		$('.checkbox5').each(function() { //loop through each checkbox
			this.checked = true;  //select all checkboxes with class "checkbox1"               
		});
	}
	else{
		$('.checkbox5').each(function() { //loop through each checkbox
			this.checked = false; //deselect all checkboxes with class "checkbox1"                       
		});         
	}
});

$('#selecctall6').click(function(event) {  //on click 
	if(this.checked) { // check select status
		$('.checkbox6').each(function() { //loop through each checkbox
			this.checked = true;  //select all checkboxes with class "checkbox1"               
		});
	}
	else{
		$('.checkbox6').each(function() { //loop through each checkbox
			this.checked = false; //deselect all checkboxes with class "checkbox1"                       
		});         
	}
});

