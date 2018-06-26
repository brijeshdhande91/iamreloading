$(window).scroll(function() {
		scrollTop = $(window).scrollTop(),
		divOffset = $('.main_container').offset().top,
		dist = (divOffset - scrollTop);
		//alert(dist);
		if (dist <= -50) {
			$('.header-attachment').addClass("hinge");
			$('.header-attachment').removeClass("rotateInDownRight");
			$('.soc-icons').addClass("lightSpeedOut");
			$('.soc-icons').removeClass("lightSpeedIn");
			$('.soc-icons').removeClass("delay2-5");
			/* $('.section-2').addClass('fadeIn') */
		} else {
			$('.header-attachment').removeClass("hinge");
			$('.header-attachment').addClass("rotateInDownRight");
			$('.soc-icons').removeClass("lightSpeedOut");
			$('.soc-icons').addClass("lightSpeedIn");
			$('.soc-icons').addClass("delay2-5");
		}
	});
	
$(function() {                       
  $(".menu-1").click(function() {  
	$(".section-1").show();
	$(".section-2").hide();
	$(".section-3").hide();	
	$(".section-4").hide();
    $(".section-1").addClass("flipInY");    
	$(".section-1").removeClass("fadeIn");
	$(".section-2,.city-1,.area-1,.find-btn").removeClass("animated");
  });
});
$(function() {            
  $(".menu-2").click(function() {
	$(".section-1").hide();
	$(".section-2").show();	
	$(".section-3").hide();
	$(".section-4").hide();
	$(".section-2,.city-1,.area-1,.find-btn, .description span").addClass("animated"); 		
  });
});
$(function() {            
  $(".menu-3").click(function() {
	$(".section-1").hide(); 
	$(".section-2").hide();   
	$(".section-3").show();	
	$(".section-4").hide();
	$(".section-3").addClass("animated");
	$(".section-2,.city-1,.area-1,.find-btn").removeClass("animated");
  });
});

$(function() {            
  $(".menu-4").click(function() {
	$(".section-1").hide(); 
	$(".section-2").hide();   
	$(".section-3").hide();
	$(".section-4").show();
	$(".section-4").addClass("animated dispinblk");
	$(".section-2,.city-1,.area-1,.find-btn").removeClass("animated");
  });
});
$(function() { 
	var carousel = $(".carousel"),
		items = $(".item"),
		currdeg  = 0;

	$(".next").on("click", { d: "n" }, rotate);
	$(".prev").on("click", { d: "p" }, rotate);

	function rotate(e){
	  if(e.data.d=="n"){
		currdeg = currdeg - 60;
	  }
	  if(e.data.d=="p"){
		currdeg = currdeg + 60;
	  }
	  carousel.css({
		"-webkit-transform": "rotateY("+currdeg+"deg)",
		"-moz-transform": "rotateY("+currdeg+"deg)",
		"-o-transform": "rotateY("+currdeg+"deg)",
		"transform": "rotateY("+currdeg+"deg)"
	  });
		items.css({
		"-webkit-transform": "rotateY("+(-currdeg)+"deg)",
		"-moz-transform": "rotateY("+(-currdeg)+"deg)",
		"-o-transform": "rotateY("+(-currdeg)+"deg)",
		"transform": "rotateY("+(-currdeg)+"deg)"
	  });
	}
 });


$(document).ready(function () {
   $("#arrow_hide").hide(); 
  $("#nh_header").hover(function() {
    	if ( $( ".header_nav" ).is( ":hidden" ) ) {
       		 $(".header_nav").slideDown(1000);
       		 $("#arrow_hide").hide();
    	}
    });

    $("#nh_show").hover(function() {
    	if ( !$( ".header_nav" ).is( ":hidden" ) ) {
        	$(".header_nav").slideUp(1000);
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
window.onload = function () {
    var e=document.getElementById("refreshed");
    if(e.value=="no")e.value="yes";
    else{
        e.value="no";
        location.reload();
    }
}