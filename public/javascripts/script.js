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
  $('#reg_submit').click(function() {
      $('.wait').css("cursor", "wait");
  });
  $('#login_submit').click(function() {
      $('.wait').css("cursor", "wait");
  });
  $('#fp_submit').click(function() {
      $('.wait').css("cursor", "wait");
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

$(document).ready(function () {
  $('#fileReturnSubmit').click( function(){
    var vendor= $('#selectVendorId').val();
    var act= $('#selectActId').val();
    var filePath= $('#filePath').val();
    var fileMonth= $('#fileMonth').val();
    var fileSubmitDate= $('#fileSubmitDate').val();
    var fileMonthUpdate= '01 '+ fileMonth;
    console.log('01 '+ fileMonth);
    var data = JSON.stringify({
       ACT_NAME: act, 
       COMMENT: '', 
       MONTH: fileMonthUpdate, 
       ID: 0,
       PATH:filePath,
       STATUS: 0,
       SUBMISSION:fileSubmitDate,
       VENDOR_NAME:vendor
    });
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": server_url+"/UpdateFileReturn",
        "method": "POST",
        "dataType": "json",
        "headers": {
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "c103cd71-4171-7a91-4318-65f2ff5689f4"
        },
        "processData": false,
        "data": data
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.UpdateFileReturnResult[0].IS_SUCCESS==true){
          alert("file return data added (or) updated successfully");
          $("select#selectVendorId")[0].selectedIndex = 0;
          $("select#selectActId")[0].selectedIndex = 0;
          $('#filePath').val("");
          $('#fileMonth').val("");
          $('#fileSubmitDate').val("");
        }else{
          alert("update failed");
        } 
        
      });
  });
});

$(document).ready(function () {
 
  $('.editbtn').on('click',function () {
      var currentTD = $(this).parents('tr').find('td');
      var childtd = $(this).parents('tr').find('td:nth-child(1)');
      if ($(this).html() == 'Edit') {
          currentTD = $(this).parents('tr').find('td');
          $.each(currentTD, function () {
              $(this).prop('contenteditable', true)
              $.each(childtd, function () {
                  $(this).prop('contenteditable', false)
              });
          });
      } else {
         $.each(currentTD, function () {
              $(this).prop('contenteditable', false)
          });
      }
      if($(this).html() != 'Edit'){
        if($(this).parents('#vendorid').is(':visible')==true){
          saveVendor(this);
        }else if($(this).parents('#example').is(':visible')==true){
          saveAct(this);
        }
      }
      $(this).html($(this).html() == 'Edit' ? '&#10004' : 'Edit')

  });

});

function saveAct(ele){ 
  var par = $(ele).parent().parent();
  var tdName = par.children("td:nth-child(1)"); 
  var tdFrequency = par.children("td:nth-child(2)"); 
  var tdReturnDate = par.children("td:nth-child(3)"); 
  var tdMonth = par.children("td:nth-child(4)");
  var tdButtons = par.children("td:nth-child(5)"); 
  tdName.html(tdName.children("input[type=text]").val()); 
  tdFrequency.html(tdFrequency.children("input[type=text]").val()); 
  tdReturnDate.html(tdReturnDate.children("input[type=text]").val()); 
  tdMonth.html(tdMonth.children("input[type=text]").val()); 
  /*tdButtons.html("<input type='button' value='Edit' class='btnEdit'/>");*/
  var tdMonthUpdate = '01' + tdMonth.html();
  var data = JSON.stringify({
     ACT_NAME: tdName.html(), 
     FREQUENCY: tdFrequency.html(), 
     MONTH: tdMonthUpdate, 
     RETURN_DT: tdReturnDate.html() 
  });
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": server_url+"/UpdateAct",
      "method": "POST",
      "dataType": "json",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "c103cd71-4171-7a91-4318-65f2ff5689f4"
      },
      "processData": false,
      "data": data
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
       if(response.UpdateActResult[0].IS_SUCCESS==true){
        alert("Success");
        location.reload();
      }else{
        alert("update failed");
      } 
    });
    /*  $(".btnEdit").bind("click", Edit);*/
  }

function addField () {
    var myTable = document.getElementById("example");
    var currentIndex = myTable.rows.length;
    var currentRow = myTable.insertRow(-1);

    var linksBox = document.createElement("input");
    linksBox.setAttribute("type", "text");
    linksBox.setAttribute("value", "");
    linksBox.setAttribute("id", "links");

    var keywordsBox = document.createElement("input");
    keywordsBox.setAttribute("type", "text");
    keywordsBox.setAttribute("value", "");
    keywordsBox.setAttribute("id", "keywords");

    var violationsBox = document.createElement("input");
    violationsBox.setAttribute("type", "text");
    violationsBox.setAttribute("value", "");
    violationsBox.setAttribute("id", "violationtype");

    var monthBox = document.createElement("input");
    monthBox.setAttribute("type", "text");
    monthBox.setAttribute("value", "");
    monthBox.setAttribute("id", "monthBox");

    var addRowBox = document.createElement("input");
    addRowBox.setAttribute("type", "button");
    addRowBox.setAttribute("value", '');
    addRowBox.setAttribute("class", "btnSave");
    addRowBox.setAttribute("id", "saveAct");

    var addRowagain = document.createElement("input");
    addRowagain.setAttribute("type", "button");
    addRowagain.setAttribute("value", '');
    addRowagain.setAttribute("class", "deleteTog");

    var edit = document.createElement("button")
    edit.setAttribute("class", "editbtn");
    edit.setAttribute("innerHTML","Edit");

    var currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(linksBox);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(keywordsBox);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(violationsBox);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(monthBox);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(addRowBox);
    currentCell.appendChild(addRowagain);
}
 
 function saveVendor(ele){ 
    var param = $(ele).parent().parent();
    var tdvendorName = param.children("td:nth-child(1)");
    var tdvendorType = param.children("td:nth-child(2)");
    var tdeffectiveDate = param.children("td:nth-child(3)"); 
    var tdclosingDate = param.children("td:nth-child(4)"); 
    var tdemployees = param.children("td:nth-child(5)"); 
    var tdunit = param.children("td:nth-child(6)"); 
    var tdnature = param.children("td:nth-child(7)");  
    var tdButtons = param.children("td:nth-child(8)"); 
    
    tdvendorName.html(tdvendorName.children("input[type=text]").val()); 
    tdvendorType.html(tdvendorType.children("input[type=text]").val()); 
    tdeffectiveDate.html(tdeffectiveDate.children("input[type=text]").val()); 
    tdclosingDate.html(tdclosingDate.children("input[type=text]").val()); 
    tdemployees.html(tdemployees.children("input[type=text]").val()); 
    tdunit.html(tdunit.children("input[type=text]").val()); 
    tdnature.html(tdnature.children("input[type=text]").val()); 
    /*tdButtons.html("<input type='button' value='save' class='btnEdit'/>");*/

    var data = JSON.stringify({
       VENDOR_NAME: tdvendorName.html(), 
       VENDOR_TYPE: tdvendorType.html(),
       EFFECTIVE_DT: tdeffectiveDate.html(), 
       CLOSING_DT: tdclosingDate.html(), 
       EMPLOYEES_COUNT: tdemployees.html(), 
       UNIT: tdunit.html(),
       NATURE: tdnature.html()
  });
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": server_url+"/UpdateVendor",
      "method": "POST",
      "dataType": "json",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "c103cd71-4171-7a91-4318-65f2ff5689f4"
      },
      "processData": false,
      "data": data
    }

    $.ajax(settings).done(function (response) {
      console.log(response.UpdateVendorResult[0].IS_SUCCESS);
      if(response.UpdateVendorResult[0].IS_SUCCESS==true){
        alert("Success");
        location.reload();
      }else{
        alert("update failed");
      } 
    });

  }

 function addRow () {
    var myTable = document.getElementById("vendorid");
    var currentIndex = myTable.rows.length;
    var currentRow = myTable.insertRow(-1);

    var vendorName = document.createElement("input");
    vendorName.setAttribute("type", "text");
    vendorName.setAttribute("value", "");
    vendorName.setAttribute("id", "vendorName");

    var vendorType = document.createElement("input");
    vendorType.setAttribute("type", "text");
    vendorType.setAttribute("value", "");
    vendorType.setAttribute("id", "vendorType");

    var effectiveDate = document.createElement("input");
    effectiveDate.setAttribute("type", "text");
    effectiveDate.setAttribute("value", "");
    effectiveDate.setAttribute("id", "effectiveDate");

    var closingDate = document.createElement("input");
    closingDate.setAttribute("type", "text");
    closingDate.setAttribute("value", "");
    closingDate.setAttribute("id", "closingDate");

    var employees = document.createElement("input");
    employees.setAttribute("type", "text");
    employees.setAttribute("value", "");
    employees.setAttribute("id", "employees");

    var unit = document.createElement("input");
    unit.setAttribute("type", "text");
    unit.setAttribute("value", "");
    unit.setAttribute("id", "unit");

    var nature = document.createElement("input");
    nature.setAttribute("type", "text");
    nature.setAttribute("value", "");
    nature.setAttribute("id", "nature");

    var addRowBox = document.createElement("input");
    addRowBox.setAttribute("type", "button");
    addRowBox.setAttribute("value", '');
    addRowBox.setAttribute("class", "btnSave saveVendor");

    var addRowagain = document.createElement("input");
    addRowagain.setAttribute("type", "button");
    addRowagain.setAttribute("value", '');
    addRowagain.setAttribute("class", "deleteTog");

    var edit = document.createElement("button")
    edit.setAttribute("class", "editVendor");
    edit.setAttribute("innerHTML","Edit");

    var currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(vendorName);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(vendorType);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(effectiveDate);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(closingDate);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(employees);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(unit);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(nature);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(addRowBox);
    currentCell.appendChild(addRowagain);
}

$(function () {
    $(document).on('click','.deleteTog', function(){
        location.reload();
    });

   /* $(document).on('click','.edittog', function(){
        $(this).toggleClass('edittog');
    });
*/
    $(document).on('click','#saveAct', function(){
        $(this).toggleClass('edittog');
        saveAct(this);
    });
    $(document).on('click','.saveVendor', function(){
        $(this).toggleClass('edittog');
        saveVendor(this);
    });
    $('.navbar-toggle-sidebar').click(function () {
      $('.navbar-nav').toggleClass('slide-in');
      $('.side-body').toggleClass('body-slide-in');
      $('#search').removeClass('in').addClass('collapse').slideUp(200);
    });

    $('#search-trigger').click(function () {
      $('.navbar-nav').removeClass('slide-in');
      $('.side-body').removeClass('body-slide-in');
      $('.search-input').focus();
    });

  /*  $('#copyPath').click(function () {
      var selectedPath= $('#actualPath').val();
      alert(selectedPath);
      $('#hiddenPath').val(selectedPath);
      alert($('#hiddenPath').val());
    });*/
    
  });

$(document).ready(function () {
  $('#dashbrd').on('click', function() {
     $('#charts,#tit1').addClass('section_show animated');
    $('#ncUnit,#tit2').removeClass('section_show animated');
    $('#ncAct,#tit3').removeClass('section_show animated');
    $('#ncAll,#tit4').removeClass('section_show animated');
    $('#act_sec,#tit5').removeClass('section_show animated');
    $('#vendor_sec,#tit6').removeClass('section_show animated');
    $('#filereturn_sec,#tit7').removeClass('section_show animated');
  });
  $('#nc_unit').on('click', function() {
   $('#charts,#tit1').removeClass('section_show animated');
    $('#ncUnit,#tit5').addClass('section_show animated');
    $('#ncAct,#tit3').removeClass('section_show animated');
    $('#ncAll,#tit4').removeClass('section_show animated');
    $('#act_sec,#tit2').removeClass('section_show animated');
    $('#vendor_sec,#tit6').removeClass('section_show animated');
    $('#filereturn_sec,#tit7').removeClass('section_show animated');
  });

  $('#nc_act').on('click', function() {
   $('#charts,#tit1').removeClass('section_show animated');
    $('#ncUnit,#tit2').removeClass('section_show animated');
    $('#ncAct,#tit6').addClass('section_show animated');
    $('#ncAll,#tit4').removeClass('section_show animated');
    $('#act_sec,#tit5').removeClass('section_show animated');
    $('#vendor_sec,#tit3').removeClass('section_show animated');
    $('#filereturn_sec,#tit7').removeClass('section_show animated');
  });

  $('#nc_all').on('click', function() {
    $('#charts,#tit1').removeClass('section_show animated');
    $('#ncUnit,#tit2').removeClass('section_show animated');
    $('#ncAct,#tit3').removeClass('section_show animated');
    $('#ncAll,#tit7').addClass('section_show animated');
    $('#act_sec,#tit5').removeClass('section_show animated');
    $('#vendor_sec,#tit6').removeClass('section_show animated');
    $('#filereturn_sec,#tit4').removeClass('section_show animated');
  });

  $('#act').on('click', function() {
    $('#charts,#tit1').removeClass('section_show animated');
    $('#ncUnit,#tit5').removeClass('section_show animated');
    $('#ncAct,#tit3').removeClass('section_show animated');
    $('#ncAll,#tit4').removeClass('section_show animated');
    $('#act_sec,#tit2').addClass('section_show animated');
    $('#vendor_sec,#tit6').removeClass('section_show animated');
    $('#filereturn_sec,#tit7').removeClass('section_show animated');
  });

  $('#vendor').on('click', function() {
    $('#charts,#tit1').removeClass('section_show animated');
    $('#ncUnit,#tit2').removeClass('section_show animated');
    $('#ncAct,#tit6').removeClass('section_show animated');
    $('#ncAll,#tit4').removeClass('section_show animated');
    $('#act_sec,#tit5').removeClass('section_show animated');
    $('#vendor_sec,#tit3').addClass('section_show animated');
    $('#filereturn_sec,#tit7').removeClass('section_show animated');
  });
  $('#filereturn').on('click', function() {
    $('#charts,#tit1').removeClass('section_show animated');
    $('#ncUnit,#tit2').removeClass('section_show animated');
    $('#ncAct,#tit3').removeClass('section_show animated');
    $('#ncAll,#tit6').removeClass('section_show animated');
    $('#act_sec,#tit5').removeClass('section_show animated');
    $('#vendor_sec,#tit7').removeClass('section_show animated');
    $('#filereturn_sec,#tit4').addClass('section_show animated');
  });
});


// shahid

$(function(){

    $(".headr_menu li a").click(function(){
      $(".btn_headr:first-child").html($(this).text()+' <span class="arrw align_right"><span class="caret align_rt"></span></span>');
      /*$(".btn_headr:first-child").html($(this).text()+ '<span class="caret align_right"></span>');*/

   });

     $(".dropdown-menu li>div").click(function(){
        $(".btn:first-child").html($(this).text()+'<span class="arw"><span class="caret align_rt"></span></span>');
        $(".btn:first-child").val($(this).text());
        $("#con").val($(this).text());
    });

});


$(document).ready(function () {
    
    $("#nh_header").hover(function() {
        $(".header_nav").slideDown(1000);
    });

    $("#nh_show").hover(function() {
        $(".header_nav").slideUp(1000);
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