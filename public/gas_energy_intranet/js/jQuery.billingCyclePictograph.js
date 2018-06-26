
// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

	var pluginName = 'billingCyclePictograph',
		defaults = {
			startDate : new Date(),
			endDate   : new Date(),
			color     : 'dte-michigan'
		};

	// The actual plugin constructor
	function Plugin( element, options ) {
		this.element = element;

		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {

		init: function() {
			this.options.startDate.setHours( 0, 0, 0, 0 );
			this.options.endDate.setHours(   0, 0, 0, 0 );

			$( this.element ).empty().append( this.pictograph());
		},

		pictograph : function(){
			var startDate        = this.options.startDate,
				endDate          = this.options.endDate,
				color            = this.options.color,
				startDateSec     = Math.floor( startDate.valueOf() / 1000 ),
				startDayOfWeek   = startDate.getDay(), 
				endDateSec       = Math.floor( endDate.valueOf() / 1000 ),
				endDayOfWeek     = endDate.getDay(),
				numberOfSecInDay = 60 * 60 * 24,
				numberOfWeeks    = ( endDateSec - startDateSec + startDayOfWeek * numberOfSecInDay ) / ( 7 * numberOfSecInDay );
			if( numberOfWeeks <= 5 ){
				//console.log( 'less than five lines' );
				var $wrapper = $( '<div/>' ).addClass( 'wrapper' ).addClass( 'billingCyclePictograph' ).addClass( color ).attr("id","billingCyclePictograph")
					$header  = $( '<div/>' )
						.addClass( 'header row pictograph' )
						.append( $( '<div/>' ).text( 'S' ))
						.append( $( '<div/>' ).text( 'M' ))
						.append( $( '<div/>' ).text( 'T' ))
						.append( $( '<div/>' ).text( 'W' ))
						.append( $( '<div/>' ).text( 'T' ))
						.append( $( '<div/>' ).text( 'F' ))
						.append( $( '<div/>' ).text( 'S' ))
				$wrapper.append( $header );
				for( var week = 0; week < 5 && week < numberOfWeeks ; week++ ){
					var $row = $( '<div/>' ).addClass( 'row pictograph' );
					for( var day = 0; day < 7; day++ ){
						switch( true ){
							case week == 0:
								if( day < startDayOfWeek ){
									$row.append( $( '<div/>' ).addClass( ' spriteImage' ));
								} else {
									$row.append( $( '<div/>' ).addClass( ' spriteImage fill' ));
								}
								break;
							case week == Math.floor( numberOfWeeks ):
								if( day < endDayOfWeek ){
									$row.append( $( '<div/>' ).addClass( 'spriteImage fill' ));
								} else {
									$row.append( $( '<div/>' ).addClass( ' spriteImage' ));
								}
								break;
							default:
								$row.append( $( '<div/>' ).addClass( ' spriteImage fill' ));
						}
					}
					$wrapper.append( $row );
				}
				return $wrapper;
			} else {
				//console.log( 'more than five line' );
				return $( '<div/>' ).addClass( 'hidden' );
			}
		}
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			/*
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName,
				new Plugin( this, options ));
			}
			*/
			new Plugin( this, options );
		});
	};

})( jQuery, window, document );