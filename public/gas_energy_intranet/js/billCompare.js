//Current Bill - Payment Plan Summary - Bill Compare Bill Amount -START

function loadBillCompBillAmt(obj) {


	if (!obj.billCompareData.lastCycle || !obj.billCompareData.currentCycle) {
		$('#bill_compare_billamount').hide();
		$('#bill_compare_billamount_nodata').show();
	} else {
		$('#bill_compare_billamount').show();
		$('#bill_compare_billamount_nodata').hide();
	}
	var lastMonth = 0.00,
		currentMonth = 0.00,
		lastYear = null;
	if (obj.billCompareData.lastCycle.billAmount)
		lastMonth = parseFloat(obj.billCompareData.lastCycle.billAmount);
	if (obj.billCompareData.currentCycleLastYear && obj.billCompareData
		.currentCycleLastYear.billAmount)
		lastYear = parseFloat(obj.billCompareData.currentCycleLastYear.billAmount);
	if (obj.billCompareData.currentCycle && obj.billCompareData.currentCycle.billAmount)
		currentMonth = parseFloat(obj.billCompareData.currentCycle.billAmount);

	var data = google.visualization.arrayToDataTable([
		['Element', 'Density', {
			role: 'style'
		}, {
			role: 'annotation'
		}],
		["", lastMonth, '#f9f9f9', '$' + lastMonth.toFixed(2) + ''],
		["", currentMonth, '#f3f6f9', '$' + currentMonth.toFixed(2) + ''],
	]);

	var data1 = google.visualization.arrayToDataTable([
		['Element', 'Density', {
			role: 'style'
		}, {
			role: 'annotation'
		}],
		["", lastYear, '#f9f9f9', '$' + (lastYear ? lastYear.toFixed(2) : '') + ''],
		["", currentMonth, '#f3f6f9', '$' + currentMonth.toFixed(2) + ''],
	]);

	var view = new google.visualization.DataView(data);
	var view1 = new google.visualization.DataView(data1);
	var formatter = new google.visualization.NumberFormat({
		prefix: '$'
	});
	formatter.format(data, 1);
	var options = {
		annotations: {
			textStyle: {
				auraColor: '#ffffff',
				
				color: '#ffffff',
				fontSize: 60,
			}
		},
		title: "",
		width: '100%',
		height: 320,
		bar: {
			groupWidth: "99%"
		},
		legend: {
			position: "none"
		},
		enableInteractivity: false,
		chartArea: {
			top: 15,
			height: '300',
			width: '100%'
		},
		vAxis: {
			gridlines: {
				color: 'transparent'
			},
			baselineColor: 'transparent',
		},
		hAxis: {
			textStyle: {
				color: '#808080',
				fontSize: 16
			},
		},
		vAxes: {
			0: {
				textStyle: {
					fontStyle: "normal",
					italic: false,
					color: '#144D8B',
				},
				minValue: 0
			},
		}
	};
	var options1 = {
		annotations: {
			textStyle: {
				auraColor: '#ffffff',
				
				color: '#ffffff',
				fontSize: 30,
			}
		},
		title: "",
		width: '100%',
		height: 320,
		bar: {
			groupWidth: "99%"
		},
		legend: {
			position: "none"
		},
		enableInteractivity: false,
		chartArea: {
			top: 15,
			height: '300',
			width: '100%'
		},
		vAxis: {
			gridlines: {
				color: 'transparent'
			},
			baselineColor: 'transparent',
		},
		hAxis: {
			textStyle: {
				color: '#808080',
				fontSize: 16
			},
		},
		vAxes: {
			0: {
				textStyle: {
					fontStyle: "normal",
					italic: false,
					color: '#144D8B',
				},
				minValue: 0
			},
		}
	};
	var chart = new google.visualization.ColumnChart(this.$(
		"#bill_compare_billamount").get(0));
	chart.draw(view, options);
	var containerSize = $(".container_WDT960PX").width();
	if (containerSize > 960) {
		chart.draw(view, options);
	} else if (containerSize <= 959) {
		chart.draw(view, options1);
	}


	function resizeHandler() {
		chart.draw(data, options1);
	}
	if (window.addEventListener) {
		window.addEventListener('resize', resizeHandler, false);
		window.addEventListener('load', resizeHandler, false);
	} else if (window.attachEvent) {
		window.attachEvent('onresize', resizeHandler);
		window.attachEvent('onload', resizeHandler);
	}
	google.visualization.events.addOneTimeListener(chart, 'ready', function() {
		$(
			'#bill_compare_billamount g[clip-path="url(#_ABSTRACT_RENDERER_ID_0)"]'
		).children(':nth-child(2)').remove();
		$('.billcomparisondropdown,.billcomparedropdown').on('change',
			function() {
				if ($(this).val() == "LastMonth") {
					if (obj.billCompareData.lastCycle && obj.billCompareData.currentCycle) {
						$('#bill_compare_billamount').show();
						$('#bill_compare_billamount_nodata').hide();
						$('#lastMonthDate_billing_amount').html(utils.formatDateLong(
								obj.billCompareData.lastCycle.startDate) + ' - ' +
							utils.formatDateLong(
								obj.billCompareData.lastCycle.endDate));
						$('#currentMonthDate_billing_amount').html(utils.formatDateLong(
								obj.billCompareData.currentCycle.startDate) + ' - ' +
							utils
							.formatDateLong(
								obj.billCompareData.currentCycle.endDate));
						$('#lastmonthdate').html(utils.formatDateLong(obj.billCompareData
							.lastCycle.startDate) + ' - ' + utils.formatDateLong(
							obj.billCompareData.lastCycle.endDate));
						$('#lastmonthdate_temp').html(utils.formatDateLong(obj.billCompareData
							.lastCycle.startDate) + ' - ' + utils.formatDateLong(
							obj.billCompareData.lastCycle.endDate));
						$('#lastmonthdays').html(obj.billCompareData.lastCycle.dayCount);
						$('#lastmonthdays_temp').html(obj.billCompareData.lastCycle.averageDailyTemperatures
							.average);
						var startDatelm = utils.formatDateLong(obj.billCompareData.lastCycle.startDate);
						var startDatelms = startDatelm.split(",");
						var endDatelm = utils.formatDateLong(obj.billCompareData.lastCycle.endDate);
						var endDatelms = endDatelm.split(",");
						$('#templaststartdate').html(startDatelms[0]);
						$('#templastenddate').html(endDatelms[0]);
						chart.draw(view, options);
					} else {
						$('#bill_compare_billamount').hide();
						$('#bill_compare_billamount_nodata').show();
					}

				} else {
					if (lastYear) {
						$('#bill_compare_billamount').show();
						$('#bill_compare_billamount_nodata').hide();
						$('#lastMonthDate_billing_amount').html(utils.formatDateLong(
								obj.billCompareData.currentCycleLastYear.startDate) +
							' - ' + utils.formatDateLong(
								obj.billCompareData.currentCycleLastYear.endDate));
						$('#currentMonthDate_billing_amount').html(utils.formatDateLong(
								obj.billCompareData.currentCycle.startDate) + ' - ' +
							utils
							.formatDateLong(
								obj.billCompareData.currentCycle.endDate));
						$('#lastmonthdate').html(utils.formatDateLong(
							obj.billCompareData
							.currentCycleLastYear.startDate) + ' - ' + utils.formatDateLong(
							obj.billCompareData.currentCycleLastYear.endDate));
						$('#lastmonthdate_temp').html(utils.formatDateLong(
							obj.billCompareData
							.currentCycleLastYear.startDate) + ' - ' + utils.formatDateLong(
							obj.billCompareData.currentCycleLastYear.endDate));
						$('#lastmonthdays').html(obj.billCompareData.currentCycleLastYear
							.dayCount);
						$('#lastmonthdays_temp').html(obj.billCompareData.currentCycleLastYear
							.averageDailyTemperatures.average);
						var startDatelm = utils.formatDateLong(obj.billCompareData.currentCycleLastYear
							.startDate);
						var startDatelms = startDatelm.split(",");
						var endDatelm = utils.formatDateLong(obj.billCompareData.currentCycleLastYear
							.endDate);
						var endDatelms = endDatelm.split(",");
						$('#templaststartdate').html(startDatelms[0]);
						$('#templastenddate').html(endDatelms[0]);
						chart.draw(view1, options);
					} else {
						$('#bill_compare_billamount').hide();
						$('#bill_compare_billamount_nodata').show();
					}
				}
			});
		$('.billComparisonLastMonth,.billComparisonLastYear').on('click',
			function() {
				var billComparisonLastMonth = $(".billComparisonLastMonth").attr(
					"class");
				if (billComparisonLastMonth == "billComparisonLastMonth") {
					if (obj.billCompareData.lastCycle && obj.billCompareData.currentCycle) {
						$('#bill_compare_billamount').show();
						$('#bill_compare_billamount_nodata').hide();
						$('#lastMonthDate_billing_amount').html(utils.formatDateLong(
							obj.billCompareData.lastCycle.startDate) + ' - ' + utils.formatDateLong(
							obj.billCompareData.lastCycle.endDate));
						$('#currentMonthDate_billing_amount').html(utils.formatDateLong(
								obj.billCompareData.currentCycle.startDate) + ' - ' + utils
							.formatDateLong(
								obj.billCompareData.currentCycle.endDate));
						$('#lastmonthdate').html(utils.formatDateLong(obj.billCompareData
							.lastCycle.startDate) + ' - ' + utils.formatDateLong(
							obj.billCompareData.lastCycle.endDate));
						$('#lastmonthdays').html(obj.billCompareData.lastCycle.dayCount);
						$('#lastmonthdays_temp').html(obj.billCompareData.lastCycle.averageDailyTemperatures
							.average);
						$('#lastmonthdate_temp').html(utils.formatDateLong(obj.billCompareData
							.lastCycle.startDate) + ' - ' + utils.formatDateLong(
							obj.billCompareData.lastCycle.endDate));
						var startDatelm = utils.formatDateLong(obj.billCompareData.lastCycle.startDate);
						var startDatelms = startDatelm.split(",");
						var endDatelm = utils.formatDateLong(obj.billCompareData.lastCycle.endDate);
						var endDatelms = endDatelm.split(",");
						$('#templaststartdate').html(startDatelms[0]);
						$('#templastenddate').html(endDatelms[0]);
						if (containerSize > 990) {
							chart.draw(view, options);
						} else if (containerSize <= 989) {
							chart.draw(view, options1);
						}
					} else {
						$('#bill_compare_billamount').hide();
						$('#bill_compare_billamount_nodata').show();
					}

				} else {
					if (lastYear) {
						$('#bill_compare_billamount').show();
						$('#bill_compare_billamount_nodata').hide();
						$('#lastMonthDate_billing_amount').html(utils.formatDateLong(
								obj.billCompareData.currentCycleLastYear.startDate) +
							' - ' + utils.formatDateLong(
								obj.billCompareData.currentCycleLastYear.endDate));
						$('#currentMonthDate_billing_amount').html(utils.formatDateLong(
								obj.billCompareData.currentCycle.startDate) + ' - ' +
							utils
							.formatDateLong(
								obj.billCompareData.currentCycle.endDate));
						$('#lastmonthdate').html(utils.formatDateLong(
							obj.billCompareData
							.currentCycleLastYear.startDate) + ' - ' + utils.formatDateLong(
							obj.billCompareData.currentCycleLastYear.endDate));
						$('#lastmonthdays').html(obj.billCompareData.currentCycleLastYear
							.dayCount);
						$('#lastmonthdate_temp').html(utils.formatDateLong(
							obj.billCompareData
							.currentCycleLastYear.startDate) + ' - ' + utils.formatDateLong(
							obj.billCompareData.currentCycleLastYear.endDate));
						$('#lastmonthdays_temp').html(obj.billCompareData.currentCycleLastYear
							.averageDailyTemperatures.average);
						var startDatelm = utils.formatDateLong(obj.billCompareData.currentCycleLastYear
							.startDate);
						var startDatelms = startDatelm.split(",");
						var endDatelm = utils.formatDateLong(obj.billCompareData.currentCycleLastYear
							.endDate);
						var endDatelms = endDatelm.split(",");
						$('#templaststartdate').html(startDatelms[0]);
						$('#templastenddate').html(endDatelms[0]);
						if (containerSize > 990) {
							chart.draw(view1, options);
						} else if (containerSize <= 989) {
							chart.draw(view1, options1);
						}
					} else {
						$('#bill_compare_billamount').hide();
						$('#bill_compare_billamount_nodata').show();
					}
				}
			});
	})

}

//Current Bill - Payment Plan Summary - Bill Compare - Bill Amount - END

//Current Bill - Payment Plan Summary - Bill Compare - Usage - Electric -START
function loadBillCompUsage(obj) {
	var data_lastMonth = null;
	if (obj.billCompareData.lastCycle && obj.billCompareData.lastCycle.products) {
		data_lastMonth = _.findWhere(obj.billCompareData.lastCycle.products, {
			type: 'Electric'
		});
	}
	var data_currentMonth = null;
	if (obj.billCompareData.lastCycle && obj.billCompareData.lastCycle.products) {
		data_currentMonth = _.findWhere(obj.billCompareData.currentCycle.products, {
			type: 'Electric'
		});
		if (data_currentMonth) {
			var electricType = String(data_currentMonth.type);
			if (electricType == "Electric") {
				$("#electricUsage").html(
					'<hr class="billcomparison_usage_barline linePos  MRGT40PX musagebrdline"><h5 class=" "><span class="icon-electric-cb bill_usgae_icon MML0PX"></span><span class="mlineht">Electric Usage</span></h5><hr class="billcomparison_usage_barline linePos  MRGT40PX musagebrdline">'
				);
			}
		}
	}
	var electric_lastMonth = 0;
	if (data_lastMonth) {
		electric_lastMonth = parseFloat(data_lastMonth.usage)
	}
	var data_lastYear = null;
	var electric_lastYear = 0;
	if (obj.billCompareData.currentCycleLastYear && obj.billCompareData.currentCycleLastYear
		.products && obj.billCompareData.currentCycleLastYear
		.products.length > 0) {
		data_lastYear = _.findWhere(obj.billCompareData.currentCycleLastYear.products, {
			type: 'Electric'
		});
		if (data_lastYear) {
			electric_lastYear = parseFloat(data_lastYear.usage)
		}

	}
	var electric_currentMonth = 0;
	if (data_currentMonth)
		electric_currentMonth = parseFloat(data_currentMonth.usage);

	var data = google.visualization.arrayToDataTable([
		['Element', 'Density', {
			role: 'style'
		}, {
			role: 'annotation'
		}],
		["", electric_lastMonth, '#c8c8c8', electric_lastMonth + ' ' + 'KWH'],
		["", electric_currentMonth, '#ffc900', electric_currentMonth + ' ' +
			'KWH'
		],
	]);
	var data1 = google.visualization.arrayToDataTable([
		['Element', 'Density', {
			role: 'style'
		}, {
			role: 'annotation'
		}],
		["", electric_lastYear, '#c8c8c8', electric_lastYear + ' ' + 'KWH'],
		["", electric_currentMonth, '#ffc900', electric_currentMonth + ' ' +
			'KWH'
		],
	]);
	var view = new google.visualization.DataView(data);
	var view1 = new google.visualization.DataView(data1);
	var formatter = new google.visualization.NumberFormat({
		prefix: '$'
	});
	formatter.format(data, 1);
	var options = {
		annotations: {
			textStyle: {
				
				fontSize: 24,
				fontcolor: 'white',
			}
		},
		title: "",
		width: '',
		height: 200,
		bar: {
			groupWidth: "95%"
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
			},
		},
		hAxis: {
			textStyle: {
				textposition: 'none',
				color: '#ffffff',
				fontSize: 16
			},
		},
		vAxes: {
			0: {
				textStyle: {
					fontStyle: "normal",
					italic: false,
					color: '#144D8B',
				},
				minValue: 0
			},
		}
	};
	var chart = new google.visualization.ColumnChart(this.$("#usageleft").get(0));
	chart.draw(view, options);
	if (data_currentMonth && data_lastMonth) {
		$('.usageleft_hr').removeClass('brdNone');
		$('#usageleft_nodata').hide();
		$('#usageleft').show();
		$('#usageleft_axis').show();
	} else {
		$('.usageleft_hr').addClass('brdNone');
		$('#usageleft_nodata').show();
		$('#usageleft').hide();
		$('#usageleft_axis').hide();
	}

	function resizeHandler() {
		chart.draw(data, options);
	}
	if (window.addEventListener) {
		window.addEventListener('resize', resizeHandler, false);
		window.addEventListener('load', resizeHandler, false);
	} else if (window.attachEvent) {
		window.attachEvent('onresize', resizeHandler);
		window.attachEvent('onload', resizeHandler);
	}
	google.visualization.events.addOneTimeListener(chart, 'ready', function() {
		$('#usageleft g[clip-path="url(#_ABSTRACT_RENDERER_ID_0)"]').children(
			':nth-child(2)').remove();
		$('.billcomparisondropdown,.billcomparedropdown').on('change',
			function() {
				if ($(this).val() == "LastMonth") {
					chart.draw(view, options);
					$('.billcomparison_usage_label_Lmonth').text('Last Month')
					if (data_currentMonth && data_lastMonth) {
						$('.usageleft_hr').removeClass('brdNone');
						$('#usageleft_nodata').hide();
						$('#usageleft').show();
						$('#usageleft_axis').show();
					} else {
						$('.usageleft_hr').addClass('brdNone');
						$('#usageleft_nodata').show();
						$('#usageleft').hide();
						$('#usageleft_axis').hide();
					}
				} else {
					chart.draw(view1, options);
					$('.billcomparison_usage_label_Lmonth').text('Last Year')
					if (data_currentMonth && data_lastYear) {
						$('.usageleft_hr').removeClass('brdNone');
						$('#usageleft_nodata').hide();
						$('#usageleft').show();
						$('#usageleft_axis').show();
					} else {
						$('.usageleft_hr').addClass('brdNone');
						$('#usageleft_nodata').show();
						$('#usageleft').hide();
						$('#usageleft_axis').hide();
					}
				}
			});
		$('.billComparisonLastMonth,.billComparisonLastYear').on('click',
			function() {
				var lastMonth = $(".billComparisonLastMonth").attr("class");
				if (lastMonth == "billComparisonLastMonth") {
					chart.draw(view, options);
					$('.billcomparison_usage_label_Lmonth').text('Last Month')
					if (data_currentMonth && data_lastMonth) {
						$('.usageleft_hr').removeClass('brdNone');
						$('#usageleft_nodata').hide();
						$('#usageleft').show();
						$('#usageleft_axis').show();
					} else {
						$('.usageleft_hr').addClass('brdNone');
						$('#usageleft_nodata').show();
						$('#usageleft').hide();
						$('#usageleft_axis').hide();
					}
				} else {
					chart.draw(view1, options);
					$('.billcomparison_usage_label_Lmonth').text('Last Year')
					if (data_currentMonth && data_lastYear) {
						$('.usageleft_hr').removeClass('brdNone');
						$('#usageleft_nodata').hide();
						$('#usageleft').show();
						$('#usageleft_axis').show();
					} else {
						$('.usageleft_hr').addClass('brdNone');
						$('#usageleft_nodata').show();
						$('#usageleft').hide();
						$('#usageleft_axis').hide();
					}

				}
			});
	});

}
//Current Bill - Payment Plan Summary - Bill Compare -Usage - Electric -END

//Current Bill - Payment Plan Summary - Bill Compare - Usage - Gas -START
function billCompUsageRight(obj) {


	var data_lastMonth = null;
	var data_currentMonth = null;
	if (obj.billCompareData.lastCycle && obj.billCompareData.lastCycle
		.products && obj.billCompareData.lastCycle
		.products.length > 0) {
		data_lastMonth = _.findWhere(obj.billCompareData.lastCycle.products, {
			type: 'Gas'
		});
	}
	if (obj.billCompareData.currentCycle && obj.billCompareData.currentCycle
		.products && obj.billCompareData.currentCycle
		.products.length > 0) {
		data_currentMonth = _.findWhere(obj.billCompareData.currentCycle.products, {
			type: 'Gas'
		});
		if (data_currentMonth) {
			var gasType = String(data_currentMonth.type);
			if (gasType == "Gas") {
				$("#gasUsage").html(
					'<hr class="billcomparison_usage_barline linePos  MRGT40PX musagebrdline"><h5 class=" "><span class="icon-gas-cb bill_usgae_icon MML0PX"></span>&nbsp <span class="mlineht">Gas Usage</span></h5><hr class="billcomparison_usage_barline linePos  MRGT40PX musagebrdline">'
				);
			}
		}
	}

	var gas_lastMonth = 0;
	if (data_lastMonth)
		gas_lastMonth = parseFloat(data_lastMonth.usage);
	var gas_lastYear = 0;
	var data_lastYear = null
	if (obj.billCompareData.currentCycleLastYear && obj.billCompareData.currentCycleLastYear
		.products && obj.billCompareData.currentCycleLastYear
		.products.length > 0) {
		data_lastYear = _.findWhere(obj.billCompareData.currentCycleLastYear.products, {
			type: 'Gas'
		});
		if (data_lastYear) {
			gas_lastYear = parseFloat(data_lastYear.usage);
		}
	}
	var gas_currentMonth = 0;
	if (data_currentMonth)
		gas_currentMonth = parseFloat(data_currentMonth.usage);

	var data = google.visualization.arrayToDataTable([
		['Element', 'Density', {
			role: 'style'
		}, {
			role: 'annotation'
		}],
		["", gas_lastMonth, '#c8c8c8', gas_lastMonth + ' ' + 'CCF'],
		["", gas_currentMonth, '#50c8e8', gas_currentMonth + ' ' + 'CCF'],
	]);
	var data1 = google.visualization.arrayToDataTable([
		['Element', 'Density', {
			role: 'style'
		}, {
			role: 'annotation'
		}],
		["", gas_lastYear, '#c8c8c8', gas_lastYear + ' ' + 'CCF'],
		["", gas_currentMonth, '#50c8e8', gas_currentMonth + ' ' + 'CCF'],
	]);
	var view = new google.visualization.DataView(data);
	var view1 = new google.visualization.DataView(data1);
	var formatter = new google.visualization.NumberFormat({
		prefix: '$'
	});
	formatter.format(data, 1);
	var options = {
		annotations: {
			textStyle: {
				
				fontSize: 24,
				color: 'transparent',
			}
		},
		title: "",
		width: '',
		height: 200,
		bar: {
			groupWidth: "95%"
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
			},
		},
		hAxis: {
			textStyle: {
				textposition: 'none',
				color: '#ffffff',
				fontSize: 16
			},
		},
		vAxes: {
			0: {
				textStyle: {
					fontStyle: "normal",
					italic: false,
					color: '#144D8B',
				},
				minValue: 0
			},

		}
	};
	var chart = new google.visualization.ColumnChart(this.$("#usageright").get(
		0));
	if (data_lastMonth && data_currentMonth) {
		$('.usageright_hr').removeClass('brdNone');
		$('#usageright_nodata').hide();
		$('#usageright').show();
		$('#usageright_axis').show();
	} else {
		$('.usageright_hr').addClass('brdNone');
		$('#usageright_nodata').show();
		$('#usageright').hide();
		$('#usageright_axis').hide();
	}
	chart.draw(view, options);

	function resizeHandler() {
		chart.draw(data, options);
	}
	if (window.addEventListener) {
		window.addEventListener('resize', resizeHandler, false);
	} else if (window.attachEvent) {
		window.attachEvent('onresize', resizeHandler);
	}
	google.visualization.events.addOneTimeListener(chart, 'ready', function() {
		$('#usageright g[clip-path="url(#_ABSTRACT_RENDERER_ID_0)"]').children(
			':nth-child(2)').remove();
		$('.billcomparisondropdown,.billcomparedropdown').on('change',
			function() {
				if ($(this).val() == "LastMonth") {
					if (data_lastMonth && data_currentMonth) {
						$('.usageright_hr').removeClass('brdNone');
						$('#usageright_nodata').hide();
						$('#usageright').show();
						$('#usageright_axis').show();
					} else {
						$('.usageright_hr').addClass('brdNone');
						$('#usageright_nodata').show();
						$('#usageright').hide();
						$('#usageright_axis').hide();
					}
					chart.draw(view, options);
					$('.billcomparison_usage_label_Lmonth').text('Last Month')
				} else {
					if (data_lastYear && data_currentMonth) {
						$('.usageright_hr').removeClass('brdNone');
						$('#usageright_nodata').hide();
						$('#usageright').show();
						$('#usageright_axis').show();
					} else {
						$('.usageright_hr').addClass('brdNone');
						$('#usageright_nodata').show();
						$('#usageright').hide();
						$('#usageright_axis').hide();
					}
					chart.draw(view1, options);
					$('.billcomparison_usage_label_Lmonth').text('Last Year')
				}
			});
		$('.billComparisonLastMonth,.billComparisonLastYear').on('click',
			function() {
				var lastMonth = $(".billComparisonLastMonth").attr("class");
				if (lastMonth == "billComparisonLastMonth") {
					if (data_lastMonth && data_currentMonth) {
						$('.usageright_hr').removeClass('brdNone');
						$('#usageright_nodata').hide();
						$('#usageright').show();
						$('#usageright_axis').show();
					} else {
						$('.usageright_hr').addClass('brdNone');
						$('#usageright_nodata').show();
						$('#usageright').hide();
						$('#usageright_axis').hide();
					}
					chart.draw(view, options);
					$('.billcomparison_usage_label_Lmonth').text('Last Month')
				} else {
					if (data_lastYear && data_currentMonth) {
						$('.usageright_hr').removeClass('brdNone');
						$('#usageright_nodata').hide();
						$('#usageright').show();
						$('#usageright_axis').show();
					} else {
						$('.usageright_hr').addClass('brdNone');
						$('#usageright_nodata').show();
						$('#usageright').hide();
						$('#usageright_axis').hide();
					}
					chart.draw(view1, options);
					$('.billcomparison_usage_label_Lmonth').text('Last Year')
				}
			});
	});
};



//Current Bill - Payment Plan Summary - Bill Compare - Usage - Gas -END

function drawDiscreteChartLeft(obj) {
	var str = "00B0";
	var degreeSign = String.fromCharCode(parseInt(str, 16));
	var lastcycles = null;
	var lastyrcycles = null;
	var avgTempLastMonth = 0;
	var avgTempLastYear = 0;
	var dataArray = [
		['', '', {
			type: 'string',
			role: 'tooltip',
			'p': {
				'html': true
			}
		}]
	];
	var dataArray1 = [
		['', '', {
			type: 'string',
			role: 'tooltip',
			'p': {
				'html': true
			}
		}]
	];

	if (obj.billCompareData.lastCycle && obj.billCompareData.lastCycle.averageDailyTemperatures &&
		obj.billCompareData.lastCycle.averageDailyTemperatures.averageTemperatures) {
		avgTempLastMonth = parseFloat(obj.billCompareData.lastCycle.averageDailyTemperatures
			.average);
		lastcycles = (obj.billCompareData.lastCycle.averageDailyTemperatures.averageTemperatures);
		lastcycles.forEach(function(cycle) {
			if (parseFloat(cycle.temp) < avgTempLastMonth) {
				dataArray.push(['', cycle.temp, customTooltipLow1(cycle.temp, degreeSign)])
			} else {
				dataArray.push(['', cycle.temp, customTooltipHigh1(cycle.temp, degreeSign)])
			}
		});
	}

	if (obj.billCompareData.currentCycleLastYear && obj.billCompareData.currentCycleLastYear
		.averageDailyTemperatures && obj.billCompareData.currentCycleLastYear.averageDailyTemperatures
		.averageTemperatures) {
		lastyrcycles = (obj.billCompareData.currentCycleLastYear.averageDailyTemperatures
			.averageTemperatures);
		avgTempLastYear = parseFloat(obj.billCompareData.currentCycleLastYear.averageDailyTemperatures
			.average);
		lastyrcycles.forEach(function(cycle) {
			if (parseFloat(cycle.temp) < avgTempLastYear) {
				dataArray1.push(['', cycle.temp, customTooltipLow1(cycle.temp, degreeSign)])
			} else {
				dataArray1.push(['', cycle.temp, customTooltipHigh1(cycle.temp,
					degreeSign)])
			}
		});
	}


	var formatter = new google.visualization.NumberFormat({
		fractionDigits: 0,
		suffix: degreeSign
	});
	var data = google.visualization.arrayToDataTable(dataArray);
	formatter.format(data, 1);
	var data1 = google.visualization.arrayToDataTable(dataArray1);
	formatter.format(data1, 1);
	var view = new google.visualization.DataView(data);
	var view1 = new google.visualization.DataView(data1);
	var options = {
		title: '',
		width: '100%',
		tooltip: {
			isHtml: true
		},
		legend: {
			position: 'none'
		},
		vAxis: {
			textPosition: 'none',
			gridlines: {
				color: 'transparent'
			}
		},
		hAxis: {
			textPosition: 'none'
		},
		bubble: {
			textStyle: {
				fontSize: 20
			}
		},
		series: {
			0: {
				color: '#a1a1a4',
				lineWidth: 1
			}
		},
		sizeAxis: {
			minValue: 11,
			maxSize: 11,
			maxValue: 11,
			minSize: 11
		},
		chartArea: {
			top: 10,
			left: 30,
			height: '300',
			width: '85%'
		},
	};

	// Create and draw the visualization.
	var chart = new google.visualization.AreaChart(this.$("#temperature1").get(
		0));
	google.visualization.events.addOneTimeListener(chart, 'ready', function(e) {
		chart.setSelection([{
			row: -1,
			column: null
		}]);
		$('#temperature1 g[clip-path="url(#_ABSTRACT_RENDERER_ID_0)"]').children(
			':nth-child(2)').remove();
		$('.billcomparisondropdown,.billcomparedropdown').on('change',
			function() {
				if ($(this).val() == "LastMonth") {
					if (!lastcycles) {
						$('#temperature1_nodata').show();
						$('#temperature1').hide();
						$('#temperature1_info').hide();
						$('#temperature1_daterange').hide();
					} else {
						$('#temperature1_nodata').hide();
						$('#temperature1').show();
						$('#temperature1_info').show();
						$('#temperature1_daterange').show();
						chart.draw(view, options);
						lastcycles.forEach(function(cycle) {
							if (cycle.high == true) {
								$("#hightemp").html(cycle.temp);
							}
							if (cycle.low == true) {
								$("#lowtemp").html(cycle.temp);
							}
						});
					}
				} else {
					if (!lastyrcycles) {
						$('#temperature1_nodata').show();
						$('#temperature1').hide();
						$('#temperature1_info').hide();
						$('#temperature1_daterange').hide();
					} else {
						$('#temperature1_nodata').hide();
						$('#temperature1').show();
						$('#temperature1_info').show();
						$('#temperature1_daterange').show();
						chart.draw(view1, options);
						lastyrcycles.forEach(function(cycle) {
							if (cycle.high == true) {
								$("#hightemp").html(cycle.temp);
							}
							if (cycle.low == true) {
								$("#lowtemp").html(cycle.temp);
							}
						});
					}

				}

			});
		$('.billComparisonLastMonth,.billComparisonLastYear').on('click',
			function() {
				var lastMonth = $(".billComparisonLastMonth").attr("class");
				if (lastMonth == "billComparisonLastMonth") {
					if (!lastcycles) {
						$('#temperature1_nodata').show();
						$('#temperature1').hide();
						$('#temperature1_info').hide();
						$('#temperature1_daterange').hide();
					} else {
						$('#temperature1_nodata').hide();
						$('#temperature1').show();
						$('#temperature1_info').show();
						$('#temperature1_daterange').show();
						chart.draw(view, options);
						lastcycles.forEach(function(cycle) {
							if (cycle.high == true) {
								$("#hightemp").html(cycle.temp);
							}
							if (cycle.low == true) {
								$("#lowtemp").html(cycle.temp);
							}
						});
					}

				} else {
					if (!lastyrcycles) {
						$('#temperature1_nodata').show();
						$('#temperature1').hide();
						$('#temperature1_info').hide();
						$('#temperature1_daterange').hide();
					} else {
						$('#temperature1_nodata').hide();
						$('#temperature1').show();
						$('#temperature1_info').show();
						$('#temperature1_daterange').show();
						chart.draw(view1, options);
						lastyrcycles.forEach(function(cycle) {
							if (cycle.high == true) {
								$("#hightemp").html(cycle.temp);
							}
							if (cycle.low == true) {
								$("#lowtemp").html(cycle.temp);
							}
						});
					}

				}

			});
	});
	if (lastcycles) {
		$('#temperature1_nodata').hide();
		$('#temperature1').show();
		$('#temperature1_info').show();
		$('#temperature1_daterange').show();
	} else {
		$('#temperature1_nodata').show();
		$('#temperature1').hide();
		$('#temperature1_info').hide();
		$('#temperature1_daterange').hide();
	}
	chart.draw(data, options);

	function resizeHandler() {
		chart.draw(data, options);
	}
	if (window.addEventListener) {
		window.addEventListener('resize', resizeHandler, false);
	} else if (window.attachEvent) {
		window.attachEvent('onresize', resizeHandler);
	}
}

function customTooltipHigh1(temp, degreeSign) {
	return '<div style="padding:5px;"><span class="tempupicongray  temparrow"></span><span  class="temptooltiptext">' +
	temp + degreeSign + '</span></div>';
}

function customTooltipLow1(temp, degreeSign) {
	return '<div style="padding:5px;"><span class="tempdownicongray  temparrow"></span><span  class="temptooltiptext">' +
	temp + degreeSign + '</span></div>';
}

function customTooltipHigh(temp, degreeSign) {
	return '<div style="padding:5px;"><span class="tempupiconblue  temparrow"></span><span  class="temptooltiptext bluColor">' +
	temp + degreeSign + '</span></div>';
}

function customTooltipLow(temp, degreeSign) {
	return '<div style="padding:5px;"><span class="tempdowniconblue  temparrow"></span><span class="temptooltiptext bluColor">' +
	temp + degreeSign + '</span></div>';
}

function drawDiscreteChartRight(obj) {
	var str = "00B0";
	var degreeSign = String.fromCharCode(parseInt(str, 16));
	var currentcycles = null;
	var currentyrcycles = null;
	var avgTemp = parseFloat(obj.billCompareData.currentCycle.averageDailyTemperatures
		.average);
	if (obj.billCompareData.currentCycle)
		currentcycles = (obj.billCompareData.currentCycle.averageDailyTemperatures.averageTemperatures);
	if (obj.billCompareData.currentCycleLastYear)
		currentyrcycles = (obj.billCompareData.currentCycle.averageDailyTemperatures.averageTemperatures);

	var dataArray = [
		['', '', {
			type: 'string',
			role: 'tooltip',
			'p': {
				'html': true
			}
		}]
	];
	var dataArray1 = [
		['', '', {
			type: 'string',
			role: 'tooltip',
			'p': {
				'html': true
			}
		}]
	];
	currentcycles.forEach(function(cycle) {
		if (parseFloat(cycle.temp) < avgTemp) {
			dataArray.push(['', cycle.temp, customTooltipLow(cycle.temp, degreeSign)])
		} else {
			dataArray.push(['', cycle.temp, customTooltipHigh(cycle.temp, degreeSign)])
		}
	});
	currentyrcycles.forEach(function(cycle) {
		if (parseFloat(cycle.temp) < avgTemp) {
			dataArray1.push(['', cycle.temp, customTooltipLow(cycle.temp, degreeSign)])
		} else {
			dataArray1.push(['', cycle.temp, customTooltipHigh(cycle.temp, degreeSign)])
		}
	});
	var formatter = new google.visualization.NumberFormat({
		fractionDigits: 0,
		suffix: degreeSign
	});
	var data = google.visualization.arrayToDataTable(dataArray);
	formatter.format(data, 1);
	var data1 = google.visualization.arrayToDataTable(dataArray1);
	formatter.format(data1, 1);
	var view = new google.visualization.DataView(data);
	var view1 = new google.visualization.DataView(data1);

	var options = {
		title: '',
		width: '100%',
		legend: {
			position: 'none'
		},
		vAxis: {
			textPosition: 'none',
			gridlines: {
				color: 'transparent'
			}
		},
		hAxis: {
			textPosition: 'none'
		},
		bubble: {
			textStyle: {
				fontSize: 20
			}
		},
		series: {
			0: {
				lineWidth: 1
			}
		},
		sizeAxis: {
			minValue: 11,
			maxSize: 11,
			maxValue: 11,
			minSize: 11
		},
		tooltip: {
			width: '100%',
			isHtml: true,
			textStyle: {
				color: 'blue',
			},
		},
		chartArea: {
			top: 10,
			left: 10,
			height: '300',
			width: '85%'
		},
	};

	// Create and draw the visualization.
	var chart = new google.visualization.AreaChart(this.$("#temperature2").get(
		0));
	google.visualization.events.addOneTimeListener(chart, 'ready', function(e) {
		chart.setSelection([{
			row: -1,
			column: null
		}]);
		$('#temperature2 g[clip-path="url(#_ABSTRACT_RENDERER_ID_0)"]').children(
			':nth-child(2)').remove();
		$('.billcomparisondropdown,.billcomparedropdown').on('change',
			function() {
				if ($(this).val() == "LastMonth") {
					chart.draw(view, options);
				} else {
					chart.draw(view1, options);
				}
			});
	});
	/*google.visualization.events.addOneTimeListener(chart, 'onmouseover', function(hover){
	if(hover){
	$('.google-visualization-tooltip-item:eq(1)').show() // remove the other info
	}
	});*/
	if (currentcycles) {
		$('#temperature2_nodata').hide();
		$('#temperature2').show();
		$('#temperature2_info').show();
		$('#temperature2_daterange').show();
	} else {
		$('#temperature2_nodata').show();
		$('#temperature2').hide();
		$('#temperature2_info').hide();
		$('#temperature2_daterange').hide();
	}
	chart.draw(data, options);

	function resizeHandler() {
		chart.draw(data, options);
	}
	if (window.addEventListener) {
		window.addEventListener('resize', resizeHandler, false);
	} else if (window.attachEvent) {
		window.attachEvent('onresize', resizeHandler);
	}
}
