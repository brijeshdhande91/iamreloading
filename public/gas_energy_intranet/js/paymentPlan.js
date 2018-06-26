//Current Bill - Payment Plan Summary - Actual Balance Information - Bar Chart -START
function actbalancePaymentPlanSummary(obj) {

  var actualchargeamt = parseFloat(obj.attributes.details.actualCharges.amount);
  var actualchargedate = obj.attributes.details.actualCharges.asOfDate;
  var actualpaymentamt = parseFloat(obj.attributes.details.payments.amount);
  var actualpaymentdate = obj.attributes.details.payments.asOfDate;
  if(actualchargeamt < 0){
    actualchargeamt = 0;
  }
  var dataArray = [
    ['Element', 'Density', {
      role: 'style'
    }, {
      role: 'annotation'
    }],
    ["", actualchargeamt, '#f89728', 'Actual Charges \n' + '$' +
      actualchargeamt.toFixed(2) + '\n' + 'as of ' + actualchargedate + ''
    ]
  ];
  if (actualpaymentamt > 0)
    dataArray.push(["", actualpaymentamt, '#49a942',
      'Actual Payments \n Received \n' + '$' + actualpaymentamt.toFixed(2) + '\n' +
      'as of ' + actualpaymentdate + ''
    ]);
  var data = google.visualization.arrayToDataTable(dataArray);
  var view = new google.visualization.DataView(data);
  var formatter = new google.visualization.NumberFormat({
    prefix: '$'
  });
  formatter.format(data, 1);
  var options = {
    annotations: {
      textStyle: {
        auraColor: 'transparent',
        
        color: '#ffffff',
        fontSize: 15
      }
    },
    title: "",
    width: "100%",
    height: 320,
    bar: {
      groupWidth: "80%"
    },
    legend: {
      position: "none"
    },
    enableInteractivity: false,
    chartArea: {
      top: 0,
      height: '300',
      width: '100%'
    },
    vAxis: {
      gridlines: {
        color: 'transparent'
      }
    },
    hAxis: {
      textStyle: {
        color: '#004990',
        fontSize: 16
      },
    },
    vAxes: {
      0: {
        textStyle: {
          fontStyle: "normal",
          italic: false,
          color: 'transparent'
        },
        minValue: 0
      }
    }
  };
  var chart = new google.visualization.ColumnChart(this.$(
    "#columnchart_values").get(0));
  chart.draw(view, options);

  function resizeHandler() {
    chart.draw(data, options);
  }
  if (window.addEventListener) {
    window.addEventListener('resize', resizeHandler, false);
  } else if (window.attachEvent) {
    window.attachEvent('onresize', resizeHandler);
  }
  google.visualization.events.addListener(chart, 'ready', function() {
    /* $('#columnchart_values g[clip-path="url(#_ABSTRACT_RENDERER_ID_0)"]')
      .children(':nth-child(2)').remove(); */
  })
}

//Current Bill - Payment Plan Summary - Actual Balance Information - Bar Chart -END

//Current Bill - Payment Plan Summary - Budget Wise Billing - Compare Bar Chart -START

function comparechartBWBSPP(obj) {


  var cycles = obj.attributes.details.cycles;
  var dataArray = [
    ['', '', '']
  ];
  cycles.forEach(function(cycle) {
    dataArray.push([cycle.period, cycle.previous.amount> 0 ? cycle.previous.amount:0, cycle.current.amount> 0 ? cycle.current.amount:0])
  });
  var data = google.visualization.arrayToDataTable(dataArray);
  var options = {
    width: '100%',
    height: 265,
    pointSize: 7,
    chart: {
      title: '',
      subtitle: ''
    },
    colors: ['#c8c8c8', '#F89728'],
    legend: {
      position: 'none'
    },
    vAxes: {
      0: {
        viewWindowMode: 'explicit',
        viewWindow: {
          max: 150,
          min: 5
        },
        gridlines: {
          color: 'transparent'
        },
        format: '$'
      },
      1: {
        gridlines: {
          color: 'transparent'
        },
        format: '$'
      }
    },
    series: {
      0: {
        targetAxisIndex: 0
      },
      1: {
        targetAxisIndex: 1
      }
    },
    axes: {
      x: {
        distance: {
          label: '',
          side: 'bottom'
        } // Left y-axis.
      }
    }
  };

  var chart = new google.charts.Bar(this.$('#bwb_compare').get(0));
  chart.draw(data, options, {
    vAxis: {
      format: '#\'%\''
    }
  });
  var resize = false;

  function resizeHandler() {
    resize = true;
    chart.draw(data, options);
  }
  if (window.addEventListener) {
    window.addEventListener('resize', resizeHandler, false);
  } else if (window.attachEvent) {
    window.attachEvent('onresize', resizeHandler);
  }
  google.visualization.events.addListener(chart, 'ready', function() {

    $('#bwb_compare g:nth-child(3) ').remove();
    $('#bwb_compare g:nth-child(5) ').children(':eq(5)').nextAll().prepend(
      '$');
    $('#bwb_compare g:nth-child(5) ').children(':lt(7)').remove();
    var str =
      '<hr id="ruler" class="WDTH86 MRGL50PX linePos T-24PX"></hr>'
    str += '<div class="row chartMonth">'
    cycles.forEach(function(cycle, item) {
      str += '<div class="col-md-1 col-sm-1 col-xs-1 col-lg-1">' +
        cycle.period + '</div>'
    });
    str += '<div>';
    $('.row .chartMonth').html('');
    $('#ruler').remove()
    $('#bwb_compare ').append(str);
  })
};

//Current Bill - Payment Plan Summary - Budget Wise Billing - Bar Chart -END

//Current Bill - Payment Plan Summary - Budget Wise Billing - This Year Bar Chart -START
function bwbsppComparethisyr(obj) {
  var cycles = obj.attributes.details.cycles;
  var dataArray = [
    ['', '', '']
  ];
  cycles.forEach(function(cycle) {
    dataArray.push([cycle.period, cycle.current.amount> 0 ? cycle.current.amount:0, 0])
  });

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    width: '100%',
    height: 265,
    chart: {
      title: '',
      subtitle: ''
    },
    gridlines: {
      color: 'transparent'
    },
    colors: ['#F89728'],
    legend: {
      position: 'none'
    },
    axes: {
      x: {
        distance: {
          label: '',
          side: 'bottom'
        } // Left y-axis.
      }
    }
  };

  var chart = new google.charts.Bar(this.$('#bwb_thisYear').get(0));
  chart.draw(data, options);
  var resize = false;

  function resizeHandler() {
    chart.draw(data, options);
    resize = true;
  }
  if (window.addEventListener) {
    window.addEventListener('resize', resizeHandler, false);
  } else if (window.attachEvent) {
    window.attachEvent('onresize', resizeHandler);
  }
  google.visualization.events.addListener(chart, 'ready', function() {
    /*$('#bwb_thisYear_Tab').click(function(){
			window.setTimeout(function(){//schart.draw(data, options);
				//$('#bwb_thisYear g:nth-child(5)').children(':eq(5)').nextAll().prepend('$').attr('dx','-20px')
				resize = true;
			},2000);
		});*/
    var str =
      '<hr id="ruler" class="WDTH86 MRGL50PX linePos T-24PX"></hr>';
    str += '<div class="row chartMonth">';
    cycles.forEach(function(cycle, item) {
      str += '<div class="col-md-1 col-sm-1 col-xs-1 col-lg-1">' +
        cycle.period + '</div>';
    });
    str += '<div>';
    $('#bwb_thisYear g:nth-child(3)').remove();
    $('#bwb_thisYear g:nth-child(5)').children(':eq(5)').nextAll().prepend(
      '$').attr('dx');
    $('#bwb_thisYear g:nth-child(5) ').children(':lt(7)').remove();
    $('.row .chartMonth').html('');
    $('#ruler').remove();
    $('#bwb_thisYear ').append(str);
  });
}

//Current Bill - Payment Plan Summary - Budget Wise Billing - This Year Bar Chart -END

//Current Bill - Payment Plan Summary - Budget Wise Billing - Next Year Bar Chart -START
function bwbsppCompareLastYr(obj) {
    var cycles = obj.attributes.details.cycles;
    var dataArray = [
      ['', '', '']
    ];
    cycles.forEach(function(cycle) {
      dataArray.push([cycle.period, cycle.previous.amount> 0 ? cycle.previous.amount:0, 0])
    });
    var data = google.visualization.arrayToDataTable(dataArray);
    var options = {
      width: '100%',
      height: 265,
      chart: {
        title: '',
        subtitle: ''
      },
      gridlines: {
        color: 'transparent'
      },
      colors: ['#c8c8c8', '#F89728'],
      legend: {
        position: 'none'
      },
      axes: {
        x: {
          distance: {
            label: '',
            side: 'bottom'
          } // Left y-axis.
        }
      }
    };

    var chart = new google.charts.Bar(this.$('#bwb_lastYear').get(0));
    chart.draw(data, options);
    var resize = false;

    function resizeHandler() {
      resize = true;
      chart.draw(data, options);
    }
    if (window.addEventListener) {
      window.addEventListener('resize', resizeHandler, false);
    } else if (window.attachEvent) {
      window.attachEvent('onresize', resizeHandler);
    }
    google.visualization.events.addListener(chart, 'ready', function() {
      var str =
        '<hr id="ruler" class="WDTH86 MRGL50PX linePos T-24PX"></hr>';
      str += '<div class="row chartMonth">';
      cycles.forEach(function(cycle) {
        str += '<div class="col-md-1 col-sm-1 col-xs-1 col-lg-1">' +
          cycle.period + '</div>';
      });
      str += '<div>';
      $('#bwb_lastYear g:nth-child(3)').remove();
      $('#bwb_lastYear g:nth-child(5)').children(':eq(5)').nextAll().prepend(
        '$').attr('dx', '-20px');
      $('#bwb_lastYear g:nth-child(5) ').children(':lt(7)').remove();
      $('.row .chartMonth').html('');
      $('#ruler').remove();
      $('#bwb_lastYear').append(str);
    });
  }
  //Current Bill - Payment Plan Summary - Budget Wise Billing - Next Year Bar Chart -END
