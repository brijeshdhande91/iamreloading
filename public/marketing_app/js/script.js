$(document).ready(function () {
   $("#arrow_hide").hide();
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

jQuery(document).ready(function($) {
    var open = false;

    var openSidebar = function(){
    $('.search_section').addClass('_srch');
      open = true;
  }
  var closeSidebar = function(){
      $('.search_section').removeClass('_srch');
      open = false;
  }

  $('.search').click( function(event) {
      event.stopPropagation();
      var toggle = open ? closeSidebar : openSidebar;
      toggle();
  });

  $(document).click( function(event){
      if ( !$(event.target).closest('.search_section').length ) {
          closeSidebar();   
      }
  });
});



$(document).ready(function () {
  $('#btnHide').click(function () {
      //$('td:nth-child(2)').hide();
      // if your table has header(th), use this
      $('td:nth-child(3),th:nth-child(3)').hide();
  });
});



// shahid

$(function(){

    $(".headr_menu li a").click(function(){
      $(".btn_headr:first-child").html($(this).text()+' <span class="arrw align_right"><span class="caret align_rt"></span></span>');
      /*$(".btn_headr:first-child").html($(this).text()+ '<span class="caret align_right"></span>');*/

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

/*$(document).ready(function () {
    
    $("#nh_header").hover(function() {
        $(".header_nav").slideDown(1000);
    });

    $("#nh_show").hover(function() {
        $(".header_nav").slideDown(1000);
    });

    $("#hideHeader").hover(function() {
      if ( $( ".header_nav" ).is( ":hidden" ) ) {
        $( ".header_nav" ).slideDown(1000);
      } else {
        $( ".header_nav" ).slideUp(1000);
      }
    });

});*/
