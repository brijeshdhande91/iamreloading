var host = 'http://portfolio.saptalabs.com:4000';

$.support.cors = true;
var accountNumber;
var selectedSiteID = 0;
var selectedSiteIndex = 0;
var myGoog = (google ? google : null);
constants = {
	DATA_CONTENT_TYPE: 'application/json',
	HTTP_GET_METHOD: 'GET'
}

var CurrentBillPageMainView = Backbone.View.extend({
	el: '#pageTarget',
	template: _.template($('#currentBillTemp').html()),
	temp: _.template($('#currentBillMultipleTemp').html()),
	events: {
		'click .multipleAccountViewBill': 'multipleToSingleView',
		'click #switchAccountModalTrigger': 'switchAccountModalTrigger',
		'click #viewAllAccounts': 'viewAllAccounts',
	},
	initialize: function(options) {
		var self = this;

		self.options = options;
		if (self.options.model.get("currentBillData")) {
			self.render();
			return this;
		}
		self.options.model.fetch({
			contentType: constants.DATA_CONTENT_TYPE,
			type: constants.HTTP_GET_METHOD,
			success: function(model, response) {
				currentBillDat = [{
					attributes: response
				}];
				self.options.model.set({
					currentBillData: response,
					currentBillDat: currentBillDat
				}, {
					silent: true
				});
				self.render();
			},
			error: function(model, response) {
				console.log("error");
				$('#bannerMessage').removeClass().addClass(
					'panel well-lg dte-emergency');
				//error.errorFunction( '#bannerMessage', response );
				$('.loadingSpinnerLarge').hide();
			}
		});
		return this;
	},
	render: function() {
		if (this.options.model.get("currentBillData").currentBillData.accounts ==
			null) {
			return this;
		}
		if (this.options.model.get("currentBillData").currentBillData.accounts
			.length >
			1 && this.options.model.get("status") == false) {
			this.$el.html(this.temp(this.options.model.toJSON()));
			new BalanceDataViewMobile().render();
		} else {
			this.$el.html(this.template(this.options.model.toJSON()));
			if (window.myGoog)
				window.myGoog.load("visualization",
					"1", {
						callback: this.drawGraph(this.options.model.toJSON()),
						packages: ["corechart", "table"]
					});
			/*new invoiceLineItemsView({
				model: this.options.model
			}).render();*/
			/*new switchAccountModalView({
				model: this.options.model
			}).render();*/
			/*new paymentPlanView({
				account: this.options.model.get("currentBillData"),
				accIndex: this.options.model.get("accountIndex")
			}).render();*/
			/*new BillCompare({
				model: this.options.model
			}).render();*/
			new BalanceDataViewMobile().render();
		}


		return this;
	},

	switchAccountModalTrigger: function(e) {
		e.stopPropagation();

		if (this.options.model.get('showSwitchAccountModal')) {
			this.options.model.set({
				showSwitchAccountModal: true
			}, {
				silent: true
			});
		} else {
			this.options.model.set({
				showSwitchAccountModal: true
			}, {
				silent: true
			});
			$('#switchAccountModal').addClass('fade').modal('show');
		}
		return this;
	},
	multipleToSingleView: function(ev) {
		var selectAccount = $(ev.currentTarget).data('accountindexnum');
		this.options.model.set({
			accountIndex: selectAccount
		});
		this.options.model.set({
			status: true
		});
		new CurrentBillPageMainView({
			model: this.options.model
		});
	},
	viewAllAccounts: function(ev) {
		this.options.model.set({
			status: false
		});
		new CurrentBillPageMainView({
			model: this.options.model
		});
	},

	 drawGraph: function(obj) {

		var elecVal = null;
		var gascVal = null;
		var sfcVal = null;
		var elecObj = obj.currentBillData.currentBillData.accounts[obj.accountIndex]
			.accountSummary.summaryOfCharges.charges.electric;
		var gasObj = obj.currentBillData.currentBillData.accounts[obj.accountIndex]
			.accountSummary.summaryOfCharges.charges.gas;
		var servObj = parseFloat(isNaN(obj.currentBillData.currentBillData.accounts[
				obj.accountIndex].accountSummary.summaryOfCharges.charges.other) ?
			0.00 :
			obj.currentBillData.currentBillData.accounts[obj.accountIndex].accountSummary
			.summaryOfCharges.charges.other);

		if (elecObj !== undefined && elecObj !== "" && !isNaN(elecObj)) {
			elecVal = parseFloat(elecObj);
			if (elecVal < 0)
				elecVal = 0
		}

		if (gasObj !== undefined && gasObj !== "" && !isNaN(gasObj)) {
			gascVal = parseFloat(gasObj);
			if (gascVal < 0)
				gascVal = 0
		}

		if (servObj !== undefined && servObj !== "" && !isNaN(servObj) &&
			servObj >
			0) {
			sfcVal = parseFloat(servObj);
			if (sfcVal < 0)
				sfcVal = 0
		}

		data = new google.visualization.arrayToDataTable([
			['Sales', 'Revenue Distribution'],
			['Electric', elecVal],
			['Gas', gascVal],
			['Services & Fees', sfcVal]
		]);
		dataForChart = new google.visualization.arrayToDataTable([
			['Sales', 'Revenue Distribution'],
			['Gas', gascVal],
			['Services & Fees', sfcVal],
			['Electric', elecVal]
		]);


		var options = {
			pieSliceText: 'value',
			title: '',
			pieHole: .96,
			pieStartAngle: 0,
			width: 325, //340,
			height: 236, //200,
			enableInteractivity: false,
			pieSliceTextStyle: {
				color: 'white'
			},
			legend: 'none',
			colors: ['#2AACE3', '#808080', '#FFCA07'],
			chartArea: {
				left: 100,
				top: 18.5,
				height: '200'
			}
		};
		var options1 = {
			pieSliceText: 'value',
			title: '',
			pieHole: .96,
			pieStartAngle: 0,
			width: "100%", //340,
			height: 236, //200,
			enableInteractivity: false,
			pieSliceTextStyle: {
				color: 'white'
			},
			legend: 'none',
			colors: ['#2AACE3', '#808080', '#FFCA07'],
			chartArea: {

				top: 18.5,
				height: '200'
			}
		};
		var chart = new google.visualization.PieChart(this.$('#piechart').get(0));

		chart.draw(dataForChart, options);
		var containerSize = $(".container_WDT960PX").width();
		if (containerSize > 960) {
			chart.draw(dataForChart, options);
		} else if (containerSize <= 959) {
			chart.draw(dataForChart, options1);
		}

		function resizeHandler() {
			if (containerSize > 960) {
				setTimeout(function() {
					chart.draw(dataForChart, options);
				}, 3000);
			} else if (containerSize <= 959) {
				setTimeout(function() {
					chart.draw(dataForChart, options1);
				}, 3000);
			}
		}
		if (window.addEventListener) {
			window.addEventListener('resize', resizeHandler, false);
			window.addEventListener('orientationchange', resizeHandler, false);
		} else if (window.attachEvent) {
			window.attachEvent('onresize', resizeHandler);
			window.attachEvent('orientationchange', resizeHandler);
		}
		if ((gascVal != null) && (elecVal != null) && (sfcVal != null && sfcVal != 0)) {
			var str =
				'<table class="table chartTbl msinglepropertycall" align="center">' +
				'<tr>' +
				'<td class="bluColor rmbrd text-center brdRgt piechart-WDT95PX"><div class="icon-electric-cb"></div><h5>' +
				data.Nf[0].c[0].v +
				'</h5><h4 class="piechart-alignment-Elc piechart-amt">$' + data.Nf[
					0].c[
					1].v.toFixed(2) + '</h4></td>' +
				'<td class="text-center rmbrd bluColor"><div class="icon-gas-cb"></div><h5>' +
				data.Nf[1].c[0].v +
				'</h5><h4 class="piechart-alignment-Gas piechart-amt">$' + data.Nf[
					1].c[
					1].v.toFixed(2) + '</h4></td>' +
				'</tr>' +
				'<tr>' +
				'<td class="bluColor text-center rmbrd PADDT0" colspan="2"><hr class="line"></hr><h5 class="lineheight0_75">' +
				data.Nf[2].c[0].v +
				'</h5><h4 class="piechart-alignment-Service piechart-amt">$' +
				data.Nf[2]
				.c[1].v.toFixed(2) + '</h4></td>' +
				'</tr>' +
				'</table>';
			$('#piechart').append(str)
		} else if ((gascVal != null) && (elecVal != null)) {
			var str =
				'<table class="table chartTbl msinglepropertycall mMRB7EM MGTPIE" align="center">' +
				'<tr>' +
				'<td class="bluColor rmbrd brdRgt text-center mrgCenter piechart-WDT95PX"><div class="icon-electric-cb"></div><h5>' +
				data.Nf[0].c[0].v +
				'</h5><h4 class="piechart-alignment-Elc piechart-amt">$' + data.Nf[
					0].c[
					1].v.toFixed(2) + '</h4></td>' +
				'<td class="text-center rmbrd bluColor"><div class="icon-gas-cb"></div><h5>' +
				data.Nf[1].c[0].v +
				'</h5><h4 class="piechart-alignment-Gas piechart-amt">$' + data.Nf[
					1].c[
					1].v.toFixed(2) + '</h4></td>' +
				'</tr>' +
				'</table>';
			$('#piechart').append(str)
		} else if ((gascVal != null) && (sfcVal != null && sfcVal != 0)) {
			var str =
				'<table class="table chartTbl msinglepropertycall" align="center">' +
				'<tr>' +
				'<td class="text-center rmbrd bluColor"><div class="icon-gas-cb"></div><h5>' +
				data.Nf[1].c[0].v +
				'</h5><h4 class="piechart-alignment-Gas piechart-amt">$' + data.Nf[
					1].c[
					1].v.toFixed(2) + '</h4></td>' +
				'</tr>' +
				'<tr>' +
				'<td class="bluColor text-center rmbrd PADDT0" colspan="2"><hr class="line"></hr><h5 class="lineheight0_75">' +
				data.Nf[2].c[0].v +
				'</h5><h4 class="piechart-alignment-Service piechart-amt">$' +
				data.Nf[2]
				.c[1].v.toFixed(2) + '</h4></td>' +
				'</tr>' +
				'</table>';
			$('#piechart').append(str)
		} else if ((elecVal != null) && (sfcVal != null && sfcVal != 0)) {
			var str =
				'<table class="table chartTbl msinglepropertycall" align="center">' +
				'<tr>' +
				'<td class="bluColor rmbrd text-center mrgCenter piechart-WDT95PX"><div class="icon-electric-cb"></div><h5>' +
				data.Nf[0].c[0].v +
				'</h5><h4 class="piechart-alignment-Elc piechart-amt">$' + data.Nf[
					0].c[
					1].v.toFixed(2) + '</h4></td>' +
				'</tr>' +
				'<tr>' +
				'<td class="bluColor text-center rmbrd PADDT0" colspan="2"><hr class="line"></hr><h5 class="lineheight0_75">' +
				data.Nf[2].c[0].v +
				'</h5><h4 class="piechart-alignment-Service piechart-amt">$' +
				data.Nf[2]
				.c[1].v.toFixed(2) + '</h4></td>' +
				'</tr>' +
				'</table>';
			$('#piechart').append(str)
		} else if (elecVal != null) {
			var str =
				'<table class="table chartTbl mchartTbl singlepropertycall msinglepropertycallGE" align="center">' +
				'<tr>' +
				'<td class="bluColor  rmbrd text-center"><div class="icon-electric-cb MGTP30PX"></div><h5>' +
				data.Nf[0].c[0].v + '</h5><h4 class="PADDTB8PX">$' + data.Nf[0].c[
					1].v.toFixed(
					2) + '</h4></td>' +
				'</tr>' +
				'</table>';
			$('#piechart').append(str)
		} else if (gascVal != null) {
			var str =
				'<table class="table chartTbl mchartTbl singlepropertycall msinglepropertycallGE">' +
				'<tr>' +
				'<td class="bluColor  rmbrd text-center"><div class="icon-gas-cb MGTP30PX"></div><h5>' +
				data.Nf[1].c[0].v + '</h5><h4 class="PADDTB8PX">$' + data.Nf[1].c[
					1].v.toFixed(
					2) + '</h4></td>' +
				'</tr>' +
				'</table>';
			$('#piechart').append(str)
		}  else if (sfcVal != null && sfcVal != 0) {
			var str =
				'<table class="table chartTbl mchartTbl singlepropertycall msinglepropertycallGE">' +
				'<tr>' +
				'<td class="bluColor  rmbrd text-center" style="padding-top: 30px !important;"><div class="MGTP30PX"></div><h5>' +
				data.Nf[2].c[0].v + '</h5><h4 class="PADDTB8PX">$' + data.Nf[2].c[
					1].v.toFixed(
					2) + '</h4></td>' +
				'</tr>' +
				'</table>';
			$('#piechart').append(str)
		}

	} 
});


///////////////// PaymentPlanData Start ////////////////

/*
var paymentPlanView = Backbone.View.extend({
	el: '#BWBandSPPBlock',
	initialize: function(options) {
		var self = this;
		accountNumber = options.account.currentBillData.accounts[options.accIndex]
			.accountNumber;
		return this;
	},
	render: function() {
		var that = this;
		var paymentPlanGraphs = new PaymentPlanModel();
		paymentPlanGraphs.fetch({
			contentType: constants.DATA_CONTENT_TYPE,
			type: constants.HTTP_GET_METHOD,
			success: function(paymentPlanData) {
				if (paymentPlanData.models.length == 0) {
					that.remove();
					return this;
				}

				if (paymentPlanData.models[0].attributes.details.planAmountDue &&
					paymentPlanData.models[0].attributes.details.planAmountDue
					.amount) {
					$('.totalMonthlyPaymentPlanSummaryAmount').html('$' +
						paymentPlanData.models[0].attributes.details.planAmountDue
						.amount.toFixed(
							2));
					$('#totalMonthlyPaymentPlanSummaryDiv').show();
				}
				var template = _.template($('#BWBAndSPPTemp').html(), {
					paymentPlanData: paymentPlanData.models
				});
				that.$el.html(template);
				if (window.myGoog)
					window.myGoog.load("visualization",
						"1.1", {
							callback: that.drawPPBWBGraphs(paymentPlanData.models[
								0]),
							packages: ["corechart", "table", "bar"]
						})
				$("[data-toggle=popover]").popover();
			},

			error: function(err, resp) {
				console.log('Error paymentplansummary fetch', err);
				that.$el.empty();
			}
		});
		return this;
	},
	drawPPBWBGraphs: function(data) {
		window.actbalancePaymentPlanSummary(data);
		window.comparechartBWBSPP(data);
		$('#bwb_thisYear_Tab').click(function() {
			$('#bwb_thisYear').empty();
			setTimeout(function() {
				window.bwbsppComparethisyr(data)
			}, 5);
		});
		$('#bwb_lastYear_Tab').click(function() {
			$('#bwb_lastYear').empty();
			setTimeout(function() {
				window.bwbsppCompareLastYr(data)
			}, 5);
		});
		$('#bwb_compare_Tab').click(function() {
			setTimeout(function() {
				window.comparechartBWBSPP(data);
			}, 5);
		});
	}
});
*/
///////////////// PaymentPlanData End ////////////////

///////////////// BillComparision Start ////////////////

/*var BillCompare = Backbone.View.extend({
	el: '#billCompareBlock',
	template: _.template($('#billCompareTemp').html()),
	events: {
		'change .billcomparisondropdown': 'billcomparisondropdownChanged',
		'change .billcomparedropdown': 'billcomparisondropdownChanged',
		'click  .billComparisonLastMonth': 'billcomparison_Tab',
		'click  .billComparisonLastYear': 'billcomparison_Tab',
		'change .multisitedropdown': 'multisitedropdownChanged'
	},
	initialize: function(options) {
		var self = this;
		self.options = options;
		self.options.parent = options.model;
		var accIndex = this.options.model.get("accountIndex")
		accountNumber = this.options.model.get("currentBillData").currentBillData
			.accounts[accIndex].accountNumber
		selectedSiteID = self.options.parent.get('currentBillData').currentBillData
			.accounts[self.options
				.parent.get('accountIndex')].serviceAddress[(selectedSiteIndex ?
				selectedSiteIndex : 0)].siteID;
		return this;
	},
	render: function() {
		var that = this;
		var _currentBillData = this.options.model.get("currentBillData");
		var _accIndex = this.options.model.get("accountIndex")
		var billCompareModel = new billCmpModel();
		billCompareModel.fetch({
			contentType: constants.DATA_CONTENT_TYPE,
			type: constants.HTTP_GET_METHOD,
			success: function(model, response) {
				var data = {
					"billCompareData": response,
					"currentBillData": _currentBillData,
					"accountIndex": _accIndex
				}
				that.options.model.set({
					"billCompareData": response
				});
				if (!data.billCompareData)
					return this;
				that.$el.html(that.template(data));
				if (window.myGoog)
					window.myGoog.load("visualization",
						"1", {
							callback: that.drawBillCompGraphs(data),
							packages: ["corechart", "table"]
						});
				$('#dropdownMultisite').val(window.selectedSiteIndex);
			},
			error: function(model, response) {
				console.log("error in bill comp fetch", response);
				that.$el.empty();
				// $('#bannerMessage').removeClass().addClass(
				// 	'panel well-lg dte-emergency');
				// //error.errorFunction( '#bannerMessage', response );
				// $('.loadingSpinnerLarge').hide();
				//TODO Figure out a way to  show no data or error when the call fails
			}
		});
		return this;
	},
	drawBillCompGraphs: function(data) {
		if (!data.billCompareData.currentCycleLastYear) {
			data.billCompareData.currentCycleLastYear = {};
		}
		window.loadBillCompBillAmt(data);
		window.setTimeout(function() {
			if (data.currentBillData.currentBillData.accounts[data.accountIndex]
				.accountSummary
				.summaryOfCharges.charges.electric !== "" && data.currentBillData
				.currentBillData
				.accounts[data.accountIndex].accountSummary.summaryOfCharges.charges
				.electric
			)
				window.loadBillCompUsage(data);
			if (data.currentBillData.currentBillData.accounts[data.accountIndex]
				.accountSummary
				.summaryOfCharges.charges.gas !== "" && data.currentBillData.currentBillData
				.accounts[data.accountIndex].accountSummary.summaryOfCharges.charges
				.gas
			)
				window.billCompUsageRight(data);
			window.drawDiscreteChartLeft(data);
			window.drawDiscreteChartRight(data);
		}, 25);
		if (!data.billCompareData.lastCycle) {
			this.$('#billingperiod_left').hide();
			this.$('#billingCyclePictographLastMonthTarget').html(
				"<h4 class='bluColor cbill billcomparison_usage_billingperiod_text'>No Data Available</h4>"
			);
		} else {
			this.$('#billingperiod_left').show();
			if (data.billCompareData.lastCycle.dayCount < 36)
				this.$('#billingCyclePictographLastMonthTarget').billingCyclePictograph({
					startDate: new Date(data.billCompareData.lastCycle.startDate),
					endDate: new Date(data.billCompareData.lastCycle.endDate),
					color: 'dte-cinderblock'
				});
		}

		if (!data.billCompareData.currentCycle) {
			this.$('#billingperiod_right').hide();
			this.$('#billingCyclePictographCurrentMonthTarget').html(
				"<h4 class='bluColor cbill billcomparison_usage_billingperiod_text'>No Data Available</h4>"
			);
		} else {
			this.$('#billingperiod_right').show();
			if (data.billCompareData.currentCycle.dayCount < 36)
				this.$('#billingCyclePictographCurrentMonthTarget').billingCyclePictograph({
					startDate: new Date(data.billCompareData.currentCycle.startDate),
					endDate: new Date(data.billCompareData.currentCycle.endDate),
					color: 'dte-michigan'
				});
		}
	},
	billcomparisondropdownChanged: function(ev) {
		var data = this.options.model.get('billCompareData');
		var accountIndex = this.options.model.get('accountIndex');

		if (ev.target.value == "LastMonth") {
			if (!data.lastCycle) {
				this.$('#billingperiod_left').hide();
				this.$('#billingCyclePictographLastMonthTarget').html(
					"<h4 class='bluColor cbill billcomparison_usage_billingperiod_text'>No Data Available</h4>"
				);
			} else {
				this.$('#billingperiod_left').show();
				if (data.lastCycle.dayCount < 36)
					this.$('#billingCyclePictographLastMonthTarget').billingCyclePictograph({
						startDate: new Date(data.lastCycle.startDate),
						endDate: new Date(data.lastCycle.endDate),
						color: 'dte-cinderblock'
					});
			}

		} else {
			if (data.currentCycleLastYear == {}) {
				this.$('#billingperiod_left').hide();
				this.$('#billingCyclePictographLastMonthTarget').html(
					"<h4 class='bluColor cbill billcomparison_usage_billingperiod_text'>No Data Available</h4>"
				);
			} else {
				this.$('#billingperiod_left').show();
				if (data.currentCycleLastYear.dayCount < 36)
					this.$('#billingCyclePictographLastMonthTarget').billingCyclePictograph({
						startDate: new Date(data.currentCycleLastYear.startDate),
						endDate: new Date(data.currentCycleLastYear.endDate),
						color: 'dte-cinderblock'
					});
			}

		}

	},
	billcomparison_Tab: function(ev) {
		//Handling else where
		var lastMonth = $(".billComparisonLastMonth").attr("class");
		if (lastMonth == "billComparisonLastMonth") {
			if (!data.lastCycle) {
				this.$('#billingperiod_left').hide();
				this.$('#billingCyclePictographLastMonthTarget').html(
					"<h4 class='bluColor cbill billcomparison_usage_billingperiod_text'>No Data Available</h4>"
				);
			} else {
				this.$('#billingperiod_left').show();
				if (data.lastCycle.dayCount < 36)
					this.$('#billingCyclePictographLastMonthTarget').billingCyclePictograph({
						startDate: new Date(data.lastCycle.startDate),
						endDate: new Date(data.lastCycle.endDate),
						color: 'dte-cinderblock'
					});
			}
		} else {
			if (data.currentCycleLastYear = {}) {
				this.$('#billingperiod_left').hide();
				this.$('#billingCyclePictographLastMonthTarget').html(
					"<h4 class='bluColor cbill billcomparison_usage_billingperiod_text'>No Data Available</h4>"
				);
			} else {
				this.$('#billingperiod_left').show();
				if (data.currentCycleLastYear.dayCount < 36)
					this.$('#billingCyclePictographLastMonthTarget').billingCyclePictograph({
						startDate: new Date(data.currentCycleLastYear.startDate),
						endDate: new Date(data.currentCycleLastYear.endDate),
						color: 'dte-cinderblock'
					});
			}
		}
	},
	multisitedropdownChanged: function(e) {
		selectedSiteIndex = $(e.currentTarget).find(':selected').data('siteid');
		new BillCompare({
			model: this.options.model
		}).render();
	}

});*/

///////////////// BillComparision End ////////////////
//Server Call For Balance Data START

var BalanceData = Backbone.Collection.extend({
	url: host+'/balanceDataPlan'
});

var BalanceDataView = Backbone.View.extend({
	el: '.balanceBlock',
	template: _.template($('#balanceAmtWidgetTemp').html()),
	render: function() {
		var that = this;
		var balanceDat = new BalanceData();
		balanceDat.fetch({
			success: function(balanceData) {
				/*var template = _.template($('#balanceAmtWidgetTemp').html(), {
					balanceData: balanceData.models
				});
				that.$el.html(template);*/
				var obj = {
					balanceData: balanceData.models
				}
				that.$el.html(that.template(obj));
				$("[data-toggle=popover]").popover();
			},
			error: function(err, stat) {
				console.log('Error in balance data', err);
			}
		})
	}
});

var BalanceDataViewMobile = Backbone.View.extend({
	el: '.balanceBlockMobile',
	render: function() {
		var that = this;
		var balanceDat = new BalanceData();
		balanceDat.fetch({
			success: function(balanceData) {
				var template = _.template($('#balanceAmtMobileWidgetTemp').html(), {
					balanceData: balanceData.models
				});
				that.$el.html(template);

				$("[data-toggle=popover]").popover();
			},
			error: function(err, stat) {
				console.log('Error in mobile balance data', err);
			}
		})
	}
});

/////////////////////// Switch Account Modal JS Start ///////////////////
var switchAccountModalView = Backbone.View.extend({

	// Page location to act upon
	el: "#switchAccountModalTarget",

	// Template to apply to above page location
	template: _.template($('#switchAccountModalTemp').html()),

	events: {
		//TODO: create event for when an account is clicked
		'click #switchAccountModalCloseButton': 'switchAccountModalCloseButton',
		'click #switchAccountModal': 'switchAccountModalCloseButton',
		'keydown #switchAccountSearch': 'switchAccountSearchField',
		'click #switchAccountSearchButton': 'switchAccountSearchButton',
		'click .switchAccountSearchButton': 'switchAccountSearchButtonMob',
		'click #switchAccountResetButton': 'switchAccountResetButton',
		'click [data-account-number]': 'switchAccount',
		'mouseenter [data-account-number]': 'accountHover',
		'mouseleave [data-account-number]': 'accountHover',
		'click .goToPage': 'pagination'
	},

	initialize: function(options) {
		var self = this;
		self.options = {};
		self.options.parent = options.model;
		// self.options.model  = options.model.clone();
		self.options.model = new switchAcctsModel();

		// Setup Items required for this Modal
		var accounts = self.options.parent.get('currentBillData').currentBillData
			.accounts;
		var length = accounts.length,
			page = 0,
			perpage = 5,
			start = page * perpage,
			end = (page + 1) * perpage,
			last = Math.ceil(length / perpage);
		self.options.model.set({
			accounts: accounts,
			accountNumberLabel: 'Account No.',
			resetButtonText: 'Reset',
			searchButtonText: 'Search',
			page: page,
			perpage: perpage,
			start: start,
			end: end,
			last: last
		});

		// When our this model changes, re-render ourself.
		self.options.model.on('change', this.render, this);

		return this;
	},

	render: function() {

		this.applySearch();

		this.$el.empty().html(this.template(this.options.model.toJSON()));

		if (!$('switchAccountModal').is(':visible') && $('.modal-backdrop').length >
			0) {
			$('.modal-backdrop').remove();
		}
		if (this.options.parent.get('showSwitchAccountModal') && $(
				'.modal-backdrop').length == 0) {
			$('#switchAccountModal').modal('show');
		}

		return this;
	},

	switchAccountModalCloseButton: function(e) {
		e.stopPropagation();

		if ($(e.target).is('#switchAccountModalCloseButton') ||
			$(e.target).is('#switchAccountModalCloseButton .icon-close') ||
			$(e.target).is('#switchAccountModal')
		) {
			this.options.parent.set({
				showSwitchAccountModal: false
			}, {
				silent: true
			});
		}

		return this;
	},

	switchAccountSearchButton: function(e) {
		e.stopPropagation();
		$('.modal-backdrop').remove();
		this.options.model.set({
			search: $('#switchAccountSearch').val()
		}, {
			silent: true
		});
		this.goToPage(0);
	},

	switchAccountSearchButtonMob: function(e) {
		e.stopPropagation();
		$('.modal-backdrop').remove();
		this.options.model.set({
			search: $('.switchAccountSearch').val()
		}, {
			silent: true
		});
		this.goToPage(0);
	},

	switchAccountResetButton: function(e) {
		e.stopPropagation();
		$('.modal-backdrop').remove();
		this.options.model.set({
			search: ''
		}, {
			silent: true
		});
		this.goToPage(0);
	},

	switchAccountSearchField: function(e) {
		if (e.which == 13) {
			e.preventDefault();
		}
	},

	switchAccount: function(e) {
		e.stopPropagation();
		console.log("selected an account", $(e.currentTarget).data('accindex'));
		var xyz = $(e.currentTarget).data('accindex');
		var accountNumber = $(e.target).attr('data-account-number') || $(e.target)
			.parents('[data-account-number]').attr('data-account-number');

		this.options.parent.set({
			showSwitchAccountModal: false,
			selectedAccount: accountNumber
		}, {
			silent: true
		});
		this.options.parent.set({
			'accountIndex': xyz
		});
		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');
		new CurrentBillPageMainView({
			model: this.options.parent
		});

	},

	accountHover: function(e) {
		$(e.currentTarget).toggleClass('dte-history-bkg');
	},

	applySearch: function() {
		var search = this.options.model.get('search'),
			pat = new RegExp(search, 'i'),
			accounts = this.options.model.get('accounts');
		// loop through the account to find the ones to show
		for (var i in accounts) {
			switch (true) {
				case search != '' && search != 'undefined' && pat.test(accounts[i]
					.accountNumber):
				case search == '' || search == 'undefined':
					accounts[i].show = true;
					break;
				default:
					accounts[i].show = false;
			}
			// if show is still false check against the service address
			if (search != '' && search != 'undefined' && accounts[i].show ==
				false) {
				for (var j in accounts[i].serviceAddress) {
					switch (true) {
						case pat.test(accounts[i].serviceAddress[j].address):
						case pat.test(accounts[i].serviceAddress[j].city):
						case pat.test(accounts[i].serviceAddress[j].state):
						case pat.test(accounts[i].serviceAddress[j].zip):
							accounts[i].show = true;
					}
				}
			}
		}
		this.options.model.set({
			accounts: accounts
		});
	},

	pagination: function(e) {
		e.stopPropagation();
		$('.modal-backdrop').remove();
		var page = parseInt($(e.currentTarget).attr('data-page'), 10);
		this.goToPage(page);
	},

	goToPage: function(page) {
		var perpage = this.options.model.get('perpage'),
			start = page * perpage,
			end = (page + 1) * perpage;
		this.options.model.set({
			page: page,
			start: start,
			end: end
		});
		this.options.model.trigger('change');
	}

});

//////////////////// Switch Account Modal JS End //////////////////
//////////////////// Invoice Line Items Start //////////////////
/*var invoiceLineItemsView = Backbone.View.extend({
	el: '#invoiceLineItemsTarget',
	template: _.template($('#invoiceLineItemsTemplate').html()),
	initialize: function(options) {
		var self = this;
		self.options = options;
		self.options.parent = options.model;
		var accIndex = this.options.model.get("accountIndex")
		accountNumber = this.options.model.get("currentBillData").currentBillData
			.accounts[accIndex].accountNumber
		return this;
	},

	render: function() {
		var that = this;
		var _currentBillData = this.options.model.get("currentBillData");
		var _accIndex = this.options.model.get("accountIndex")
		var invLineItemsModel = new invoiceLineItemsModel();
		invLineItemsModel.fetch({
			contentType: constants.DATA_CONTENT_TYPE,
			type: constants.HTTP_GET_METHOD,
			success: function(model, response) {
				var data = {
					"invLineItmsData": response,
					"contextHelpItem": window.contextualHelpList,
					"currentBillData": _currentBillData,
					"accountIndex": _accIndex
				};
				that.$el.html(that.template(data));
				$("[data-toggle=popover]").popover();
			},
			error: function(model, response) {alert(2)
				console.log("error in inv line items data", response);
				that.$el.empty();
				//TODO Figure out a way to  show no data or error when the call fails
			}
		});
		return this;
	}
});*/
//////////////////// Invoice Line Items End //////////////////
var CurrentBillData = Backbone.Model.extend({
	url: host+'/currentBillDataPlan',
	defaults: {
		currentBillData: "",
		status: false,
		accountIndex: 0,
		showSwitchAccountModal: false,
		currentBillDat: [{
			attributes: ""
		}]
	}
});


/*var billCmpModel = Backbone.Model.extend({
	//url: function(){ return 'api/account/' + accountNumber+ '/site/' +selectedSiteID +'/billComparison' ; },
	url: function() {
		
		return host+'/billCompareData';
	},
	defaults: {
		currentBillData: "",
		accountIndex: 0
	}
});
*/
/*var invoiceLineItemsModel = Backbone.Model.extend({

	//  url: function(){ return '/api/account/' + accountNumber + '/invoiceLineItems'; },
	url: function() {
		console.log('Inv Line Items Model Start \r\n currAccNum', accountNumber);
		console.log("Inv Line Items Model End"); //TODO Replace while integration
		return host+'/invoiceLineItems';
	}
});*/
var switchAcctsModel = Backbone.Model.extend({
	defaults: {
		accounts: [],
		search: ''
	}
});
/*var PaymentPlanModel = Backbone.Collection.extend({
	//  url: function(){ return '/api/account/' + accountNumber + '/paymentPlanData'; },
	url: function() {
		return host+'/paymentPlanData';
	},
});*/

var Router = Backbone.Router.extend({
	routes: {
		'': 'home'
	}
});

var currentBillModel = new CurrentBillData();

var router = new Router();
router.on('route:home', function() {
	new CurrentBillPageMainView({
		model: currentBillModel
	});

});
$(document).ready(function() {
	var xtr = new BalanceDataView();
	xtr.render();
});
Backbone.history.start();

var getStartEndDates = function(dateRange, numberOfDays) {
	var range = dateRange,
		dates = range.split('-'),
		startDate = new Date(dates[1]),
		endDate = new Date(dates[1]);
	startDate.setDate(startDate.getDate() - numberOfDays);
	return {
		strDate: startDate,
		endDate: endDate
	};
}

var openPaymentCenter = function(accNum, amount) {
	var maskedAcc = utils.obscureNumber(accNum);
	window.open('', '_self', false);
}
var openPaymentCenterSelectedBills = function() {
	window.open('', '_self', false);
}

String.prototype.toCamelCase = function() {
	var out = "";
	this.trim().split(" ").forEach(function(el, idx) {
		var add = el.toLowerCase();
		out += (idx === 0 ? add[0].toUpperCase() + add.slice(1).toLowerCase() :
			" " + add[0].toUpperCase() + add.slice(1).toLowerCase());
	});
	return out;
}
String.prototype.toDisplayCurrency = function() {
	var myVal = parseFloat(this)
	if (isNaN(myVal)) {
		return "$0.00"
	} else {
		return myVal.toDisplayCurrency();
	}
}
Number.prototype.toDisplayCurrency = function() {
	var thisVal = parseFloat(this);
	if (thisVal >= 0) {
		return '$' + (thisVal.toFixed(2));
	} else {
		return '-$' + (-1 * thisVal).toFixed(2);
	}
}
function changebtn(){
  $('#eBillEnroll').show();
  $('#eBillLearn').hide();
}