var portfolio_app = angular.module('portfolio', []);

   portfolio_app.controller('portfolio_ctrl', function($scope) {
   });

   portfolio_app.directive('phonNumber', function() {
	     return {
	       require: '?ngModel',
	       link: function(scope, element, attrs, ngModelCtrl) {
	         if(!ngModelCtrl) {
	           return;
	         }

	         ngModelCtrl.$parsers.push(function(val) {
	           if (angular.isUndefined(val)) {
	               var val = '';
	           }
	           
	           var clean = val.replace(/[^-0-9\.]/g, '');
	           var negativeCheck = clean.split('-');
			   var decimalCheck = clean.split('.');
	           if(!angular.isUndefined(negativeCheck[1])) {
	               negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
	               clean =negativeCheck[0] + '-' + negativeCheck[1];
	               if(negativeCheck[0].length > 0) {
	                clean =negativeCheck[0];
	               }
	               
	           }
	             
	           if(!angular.isUndefined(decimalCheck[1])) {
	               decimalCheck[1] = decimalCheck[1].slice(0,2);
	               clean =decimalCheck[0] + '.' + decimalCheck[1];
	           }

	           if (val !== clean) {
	             ngModelCtrl.$setViewValue(clean);
	             ngModelCtrl.$render();
	           }
	           return clean;
	         });

	         element.bind('keypress', function(event) {
	           if(event.keyCode === 10) {
	             event.preventDefault();
	           }
	         });
	       }
		};
	})

.directive('onlyAlphabets', function () {
   return {
       restrict: 'A',
       require: '?ngModel',
       link: function (scope, element, attrs, ngModel) {
           if (!ngModel) {
               return;
           }
           ngModel.$parsers.unshift(function (inputValue) {
               var alphabets = inputValue.split('').filter(function (s) {
                   return (isALetter(s));
               }).join('');
               ngModel.$viewValue = alphabets;
               ngModel.$render();
               return alphabets;
           });
       }
   };

   function isALetter(charVal)
   {
       if( charVal.toUpperCase() != charVal.toLowerCase() ) {
           return true;
       }
       else {
           return false;
       }
   }
});