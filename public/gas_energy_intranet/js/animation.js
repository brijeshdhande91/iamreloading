selAccPay = "";
$(document).ready(function() {
	var myamount = 0;
	var selAccArr = [];

	$(document).on("click", '.toggleHeader', function() {
		toggleBar(this);
	})
	$(document).on("click", '#multiAccountDetails', function() {
		paymentToggleBar(this);
	})

	.on("click", '.compareTabs li', function() {
		var cl = $(this).attr('class');
		if (cl == 'bwb_lastYear') {
			$(
				'#bwb_thisYear,#bwb_lastYear,#bwb_compare'
			).hide();
			$(this).closest('section').next('section').children('#' + cl).show();
			$('#bwb_thisYear_Tab').removeClass('active');
			$('#bwb_lastYear_Tab').addClass('active');
			$('#bwb_compare_Tab').removeClass('active');
		} else if (cl == 'bwb_thisYear') {
			$(
				'#bwb_thisYear,#bwb_lastYear,#bwb_compare'
			).hide();
			$(this).closest('section').next('section').children('#' + cl).show();
			$('#bwb_thisYear_Tab').addClass('active');
			$('#bwb_lastYear_Tab').removeClass('active');
			$('#bwb_compare_Tab').removeClass('active');
		} else if (cl == 'bwb_compare') {
			$(
				'#bwb_thisYear,#bwb_lastYear,#bwb_compare'
			).hide();
			$(this).closest('section').next('section').children('#' + cl).show();
			$('#bwb_thisYear_Tab').removeClass('active');
			$('#bwb_lastYear_Tab').removeClass('active');
			$('#bwb_compare_Tab').addClass('active');
		}
	})


	.on('click', 'input[type="button"]', function(event) {
		event.stopPropagation();
	})

	.on("click", '.billcomparisonTabs li', function() {
		var cl = $(this).attr('class');
		if (cl == 'currentbill_billcomparison_usage') {
			$(
				'#currentbill_billcomparison_billamount,#currentbill_billcomparison_usage,#currentbill_billcomparison_billingperiod,#currentbill_billcomparison_temperature'
			).hide();
			$(this).closest('section').next('section').children('#' + cl).show();
			$('#currentbill_billcomparison_billamount_Tab').removeClass(
				'active');
			$('#currentbill_billcomparison_usage_Tab').addClass('active');
			$('#currentbill_billcomparison_billingperiod_Tab').removeClass(
				'active');
			$('#currentbill_billcomparison_temperature_Tab').removeClass(
				'active');
		} else if (cl == 'currentbill_billcomparison_billingperiod') {
			$(
				'#currentbill_billcomparison_billamount,#currentbill_billcomparison_usage,#currentbill_billcomparison_billingperiod,#currentbill_billcomparison_temperature'
			).hide();
			$(this).closest('section').next('section').children('#' + cl).show();
			$('#currentbill_billcomparison_billamount_Tab').removeClass(
				'active');
			$('#currentbill_billcomparison_usage_Tab').removeClass('active');
			$('#currentbill_billcomparison_billingperiod_Tab').addClass(
				'active');
			$('#currentbill_billcomparison_temperature_Tab').removeClass(
				'active');
		} else if (cl == 'currentbill_billcomparison_temperature') {
			$(
				'#currentbill_billcomparison_billamount,#currentbill_billcomparison_usage,#currentbill_billcomparison_billingperiod,#currentbill_billcomparison_temperature'
			).hide();
			$(this).closest('section').next('section').children('#' + cl).show();
			$('#currentbill_billcomparison_billamount_Tab').removeClass(
				'active');
			$('#currentbill_billcomparison_usage_Tab').removeClass('active');
			$('#currentbill_billcomparison_billingperiod_Tab').removeClass(
				'active');
			$('#currentbill_billcomparison_temperature_Tab').addClass(
				'active');
		} else if (cl == 'currentbill_billcomparison_billamount') {
			$(
				'#currentbill_billcomparison_billamount,#currentbill_billcomparison_usage,#currentbill_billcomparison_billingperiod,#currentbill_billcomparison_temperature'
			).hide();
			$(this).closest('section').next('section').children('#' + cl).show();
			$('#currentbill_billcomparison_billamount_Tab').addClass('active');
			$('#currentbill_billcomparison_usage_Tab').removeClass('active');
			$('#currentbill_billcomparison_billingperiod_Tab').removeClass(
				'active');
			$('#currentbill_billcomparison_temperature_Tab').removeClass(
				'active');
		}
		$('.billcomparisondropdown, .billcomparedropdown').change();
	})

	.on("click", '.billcomparisonTabsMonth_Year li', function() {
			var cl = $(this).attr('class');
			if (cl == 'billComparisonLastMonth') {
				$(this).closest('section').next('section').children('#' + cl).show();
				$('#billComparisonLastYear').removeClass('active');
				$('#billComparisonLastMonth').addClass('active');
			} else if (cl == 'billComparisonLastYear') {
				$(this).closest('section').next('section').children('#' + cl).show();
				$('#billComparisonLastYear').addClass('active');
				$('#billComparisonLastMonth').removeClass('active');
			}
		})
		.on("change", '.multiAccSorting', function() {
			var cl = $(this).val();
			if (cl == 'amountDueHtoL') {
				_CBfun.sortAmountDue();
			} else if (cl == 'amountDueLtoH') {
				_CBfun.sortAmountDue();
			} else if (cl == 'dueDateLtoH') {
				_CBfun.sortDate();
			} else if (cl == 'dueDateHtoL') {
				_CBfun.sortDate();
			} else if (cl == 'accountLtoH') {
				_CBfun.sortAcc();
			} else if (cl == 'accountHtoL') {
				_CBfun.sortAcc();
			} else if (cl == 'serviceAddressLtoH') {
				_CBfun.sortAddress();
			} else if (cl == 'serviceAddressHtoL') {
				_CBfun.sortAddress();
			}
		})
		.on('click', '.sort ul li', function() {
			$(this).children('span').toggleClass('downarrow');
		})

	.on("click", '#srch', function() {
		_CBfun.Accsearch()
			//_CBfun.ResSearch();;

	})

	.on("keyup", '', function(e) {
			if (e.keyCode == 13) _CBfun.Accsearch();
		})
		.on("click", '.reset', function() {
			$('#srchVal').val('');
			$('.accountsRow').show();
			$('.error').hide();
		})


	.on("click", '.chkBox', function(event) {
		event.stopPropagation();
		if ($('.accountsRow').length < 5) {
			$("#togleicon").addClass("hidden");
			$("#togleairticle").removeClass("toggleHeader");
			$("#multiAccNote").addClass("hidden");
			$("#multiAccNoteHead").addClass("hidden");
		} else {
			$("#togleicon").removeClass("hidden");
			$("#togleairticle").addClass("toggleHeader");
		}

		if ($('.multiAccounts .chkBox:checked').length > 5) {
			if ($('.selectedAcc').children().hasClass('blubgColor')) {
				$("#errorMSG").addClass("eleNone")
				$("#errorMSG1").addClass("eleNone")
			} else {
				$("#errorMSG").removeClass("eleNone")
				$("#errorMSG1").removeClass("eleNone")

			}
			$("#errorMSG2").removeClass("eleNone")
			$("#errorMSG3").removeClass("eleNone")
			$("#errorMSG4").removeClass("eleNone")
			$("#errorMSG5").removeClass("eleNone")
			$("#errorMSG6").removeClass("eleNone")
			$(".pay_selected_bill").addClass('disabled');
			$("#pay_selected_bill_btm").addClass('paybtnbtm');
			$("#payseletedbilltt").prop("disabled", true);
			$("#makeFuturePayBtn").prop("disabled", true);
			$("#payseletedbilltop").prop("disabled", true);
			$("#makeFuturePayBtnTop").prop("disabled", true);
			$("#payseletedbillBottom").prop("disabled", true);
			$("#makefuturepaymentbottom").prop("disabled", true);
			$("#payseletedbilltt").addClass("gryBtnclr");
			$("#makeFuturePayBtn").addClass("gryBtnclr");
			$("#payseletedbilltop").addClass("gryBtnclr");
			$("#makeFuturePayBtnTop").addClass("gryBtnclr");
			$("#payseletedbillBottom").addClass("gryBtnclr");
			$("#makefuturepaymentbottom").addClass("gryBtnclr");
		} else {
			$(".pay_selected_bill").removeClass('disabled');
			$("#pay_selected_bill_btm").removeClass('paybtnbtm');
			$("#payseletedbilltt").prop("disabled", false);
			$("#makeFuturePayBtn").prop("disabled", false);
			$("#payseletedbilltop").prop("disabled", false);
			$("#makeFuturePayBtnTop").prop("disabled", false);
			$("#payseletedbillBottom").prop("disabled", false);
			$("#makefuturepaymentbottom").prop("disabled", false);
			$("#payseletedbilltt").removeClass("gryBtnclr");
			$("#makeFuturePayBtn").removeClass("gryBtnclr");
			$("#payseletedbilltop").removeClass("gryBtnclr");
			$("#makeFuturePayBtnTop").removeClass("gryBtnclr");
			$("#payseletedbillBottom").removeClass("gryBtnclr");
			$("#makefuturepaymentbottom").removeClass("gryBtnclr");
			$("#errorMSG").addClass("eleNone")
			$("#errorMSG1").addClass("eleNone")
			$("#errorMSG2").addClass("eleNone")
			$("#errorMSG3").addClass("eleNone")
			$("#errorMSG4").addClass("eleNone")
			$("#errorMSG5").addClass("eleNone")
			$("#errorMSG6").addClass("eleNone")
		}

		if ($('.multiAccounts .chkBox:checked')) {
			var acNo = $(this).closest('.row').find('.acNo').text(),
				amtDue = $(this).closest('.row').find('.amtDue').text();
			if (amtDue.indexOf('-$') >= 0)
				amtDue = '$-' + amtDue.slice(2)
			var arrVal = utils.obscureNumber(acNo.replace(/\s/g, '')) + '=' + amtDue
				.substring(
					1);
			if ($(this).is(':checked') === true) {
				selAccArr.push(arrVal);
				selAccPay = selAccArr.join('&');
				$(this).closest('.brdRedRgt').css('borderRight', '5px solid #e31937')
				$(this).closest('.brdOrgRgt').css('borderRight', '5px solid #f26b21')
				_CBfun.copySelectedInfo(this);
				_CBfun.amntAddition(this)
				$(this).parent('.customChkBox').removeClass('unChecked');
				$(this).parent('.customChkBox').addClass('checked');
				$(".selectedBill").removeClass("hidden");
			} else {
				_CBfun.hideSelectedInfo(this);
				_CBfun.removeAddition(this);
				$(this).parent('.customChkBox').removeClass('checked');
				$(this).parent('.customChkBox').addClass('unChecked');
				selAccArr.splice(selAccArr.indexOf(arrVal), 1);
				selAccPay = selAccArr.join('&');
				accCount();
				$(this).closest('.brdRedRgt').css('borderRight', '5px solid #e31937')
				$(this).closest('.brdOrgRgt').css('borderRight', '5px solid #f26b21')
			}
		} else {
			$(this).prop('checked', false).parent().removeClass('checked');
		}
		if ($('.multiAccounts .chkBox:checked').length < 1) {
			$(".EnableOnBillsSelected").prop("disabled", true);
			$('.selectedAcc,.selectedAccInfo').hide();
		}

	})


	.on('click', '.remove', function() {
		_CBfun.removeSelectedInfo(this);
		accCount();
	})

	.on('click', '#sort_amtDue', function() {
		$(this).toggleClass('desc');
		if ($(this).hasClass(!'desc')) {
			$(this).toggleClass('asce');
		}

		_CBfun.sortPrice();
	})

	.on('click', '#sort_account', function() {
		$(this).toggleClass('desc');
		if ($(this).hasClass(!'desc')) {
			$(this).toggleClass('asce');
		}
		_CBfun.sortAcc();
	})

	.on('click', '#sort_address', function() {
		$(this).toggleClass('desc');
		if ($(this).hasClass(!'desc')) {
			$(this).toggleClass('asce');
		}
		_CBfun.sortAddress();
	})

	.on('click', '#sort_date', function() {
		$(this).toggleClass('desc');
		if ($(this).hasClass(!'desc')) {
			$(this).toggleClass('asce');
		}
		_CBfun.sortDate();
	})

});


var _CBfun = {

	Accsearch: function() {
		var accCnt = $('.acNo'),
			accVal = accCnt.html(),
			accArray = [],
			addr,
			text = "";
		for (var i = 0; i < accCnt.length; i++) {
			text = $('.acNo:eq(' + i + ')').html();
			addr = $('.addressSec:eq(' + i + ')').text().toLowerCase();
			accArray.push(text + ' ' + addr);
		}
		var sv = $('#srchVal').val().toLowerCase();
		var sv_regexp = new RegExp(sv);
		var err = !1;
		$('.accountsRow').hide();
		for (var j = 0; j < accArray.length; j++) {
			if (sv_regexp.test(accArray[j])) {
				$('.accountsRow:eq(' + j + ')').show();
				err = !0;
				$('.multiAccounts .error').remove('.error');

			} else {
				//err=!1;
				$('.accountsRow:eq(' + j + ')').hide();
			}
		}
		if (sv.length < 1) {
			$('.accountsRow').show();
			$('.error').hide();
		}
		if (err == !1) {
			$('.multiAccounts .error').remove('.error');
			$('.multiAccounts').append('<span class="error">Records Not found</span>');
		}

	},

	ResSearch: function() {
		var acAddress = $('.address'),
			acAddressVal = acAddress.html(),
			addrArray = [],
			txt = "";
		for (var k = 0; k < acAddress.length; k++) {
			txt = $('.address:eq(' + k + ')').html().toLowerCase();
			addrArray.push(txt);
		}
		var sv = $('#srchVal').val().toLowerCase();
		var sv_regexp = new RegExp(sv);
		var err = !1;
		$('.accountsRow').hide();
		for (var l = 0; l < addrArray.length; l++) {
			if (sv_regexp.test(addrArray[l])) {
				$('.accountsRow:eq(' + l + ')').show();
				err = !0;
				$('.multiAccounts .error').remove('.error');

			} else {
				//err=!1;
				$('.accountsRow:eq(' + l + ')').hide();
			}
		}
		if (sv.length < 1) {
			$('.accountsRow').show();
			$('.error').hide();
		}
		if (err == !1) {
			$('.multiAccounts .error').remove('.error');
			$('.multiAccounts').append(
				'<span class="error">Records Not found</span>');
		}

	},
	amntAddition: function(ele) {
		var accrw = $('.accountsRow'),
			cnt = $('.accountsRow .chkBox:checked').length,
			billAmnt = [],
			amt = 0,
			selAc = $('.selectedAcc'),
			txt;
		for (var a = 0; a < accrw.length; a++) {
			if ($('.chkBox:eq(' + a + ')').is(':checked')) {
				txt = $('.chkBox:eq(' + a + ')').parents('.accountsRow').find(
					'.amtDue').html().slice(1);
				if (txt.indexOf('$') >= 0)
					txt = '-' + txt.slice(1)
				amt += parseFloat(txt);
			}

		}

		if (amt > 0) {
			$('#payseletedbillb').removeClass("hidden");
			$('#makefuturepaymentb').addClass("hidden");
			$('#makeFutureBtnB').removeClass("hidden");
			$('.payseletedbills').removeClass("hidden");
			$('.makefuturepayments').addClass("hidden");
			$('#payseletedbillt').removeClass("hidden");
			$('#makefuturepaymentt').addClass("hidden");
		} else {
			$('#payseletedbillb').addClass("hidden");
			$('#makeFutureBtnB').addClass("hidden");
			$('#makefuturepaymentb').removeClass("hidden");
			$('.payseletedbills').addClass("hidden");
			$('.makefuturepayments').removeClass("hidden");
			$('#payseletedbillt').addClass("hidden");
			$('#makefuturepaymentt').removeClass("hidden");
		}
		if (cnt > 0) {
			$(".EnableOnBillsSelected").prop("disabled", false);
			$(selAc).show();
		} else {
			$(selAc).hide();
			$(selAc).next('.selectedAccInfo').hide();
		}
		$('.noAcc').html(cnt);
		$('.additionVal').html(amt.toDisplayCurrency());
	},
	removeAddition: function(ele) {
		var val = $(ele).parents('.accountsRow').find('.DueMsgSection').children(
			'.amtDue').text();
		if (val.indexOf('-$') >= 0)
			val = '$-' + val.slice(2)
		var currentVal = $('.additionVal').html(),
			amt = currentVal.substring(1) - val.substring(1);
		if ($('.multiAccounts .chkBox:checked').length <= 0) {
			$('#payseletedbillb').removeClass("hidden");
			$('#makeFutureBtnB').removeClass("hidden");
			$('#makefuturepaymentb').addClass("hidden");
			$('.payseletedbills').removeClass("hidden");
			$('.makefuturepayments').addClass("hidden");
			$('#payseletedbillt').removeClass("hidden");
			$('#makefuturepaymentt').addClass("hidden");
		} else {
			if (amt <= 0) {
				$('#payseletedbillb').addClass("hidden");
				$('#makeFutureBtnB').addClass("hidden");
				$('#makefuturepaymentb').removeClass("hidden");
				$('.payseletedbills').addClass("hidden");
				$('.makefuturepayments').removeClass("hidden");
				$('#payseletedbillt').addClass("hidden");
				$('#makefuturepaymentt').removeClass("hidden");
			} else {
				$('#payseletedbillb').removeClass("hidden");
				$('#makefuturepaymentb').addClass("hidden");
				$('.payseletedbills').removeClass("hidden");
				$('.makefuturepayments').addClass("hidden");
				$('#payseletedbillt').removeClass("hidden");
				$('#makefuturepaymentt').addClass("hidden");
			}
		}

		$('.additionVal').html(amt.toDisplayCurrency())
	},

	copySelectedInfo: function(selector) {
		var cnt = $('.accountsRow .chkBox:checked').length;
		if (cnt > 0)
			$('.selAddr').append(copyFun(selector));
	},
	hideSelectedInfo: function(sel) {
		var rw = $('.selAddr .frmTbl');
		for (var i = 0; i < rw.length; i++) {
			if ($(rw).eq(i).attr('id') === $(sel).attr('id')) {
				$(rw).eq(i).remove();
			}
		}

	},
	removeSelectedInfo: function(sel) {
		var Id = $(sel).closest('.frmTbl').attr('id'),
			amtVal = $(sel).closest('.frmTbl').find('.amtDue').text();
		aVal = $('.additionVal').html();
		val = aVal.substring(1) - amtVal.substring(1);
		chkBox = $('.accountsRow .chkBox');
		for (var i = 0; i < chkBox.length; i++) {
			if ($(chkBox).eq(i).attr('id') === Id) {
				$(chkBox).eq(i).prop('checked', false);
				$(chkBox).eq(i).parent().removeClass('checked');
				$('.additionVal').html('$' + val.toFixed(2));
				$(chkBox).eq(i).closest('.brdRedRgt').css('borderRight',
					'5px solid #e31937')
				$(chkBox).eq(i).closest('.brdOrgRgt').css('borderRight',
					'5px solid #f26b21')
			}
			if ($(chkBox).is(':checked') === false) $(
				'.selectedAcc, .selectedAccInfo').hide();
		}
		$(sel).closest('.frmTbl').remove();
	},

	sortDate: function() {
		var accrw = $('.accountsRow'),
			users = [],
			prefixtxt, msg, cls, pastDueMsg,
			address, price, date, accNo, chkbx, acctxt, dataRange, eleccharges,
			gascharges, other, curBill, total, dueDate;
		var count = 0,
			chkBoxList = [];
		var chkBoxLength = $('.chkBox');
		for (var i = 0; i < chkBoxLength.length; i++) {
			if (chkBoxLength[i].checked) {
				var chkBoxId = $(chkBoxLength[i]).attr('id');
				chkBoxList.push(chkBoxId);
			}
		}
		for (var i = 0; i < accrw.length; i++) {
			prefixtxt = $('.accountsRow:eq(' + i +
				') .addressSec .bluColor:eq(0)').text();
			address = $('.accountsRow:eq(' + i + ') .addressSec .address').text();
			price = $('.DueMsgSection:eq(' + i + ') .amtDue').text();
			accNo = $('.addressSec:eq(' + i + ') .acNo').text();
			acctxt = "Account No.";
			cls = $('.DueMsgSection:eq(' + i + ')').children().attr('class').split(' ')[
				1];
			pastDueMsg = $('.multiAccounts .accList:eq(' + i + ') .pastDueMsg').html();
			msg = $('.DueMsgSection:eq(' + i + ')').children(':eq(1)').text();
			indexNmbr = $('.accList:eq(' + i + ') .btn-primary').attr(
				'data-accountindexnum')
			chkbx = $('.customChkBox:eq(' + i + ')').html();
			dataRange = $('.accList:eq(' + i + ') h4:eq(1)').html();
			eleccharges = $('.accList:eq(' + i + ') .electric').children(':eq(1)')
				.html();
			gascharges = $('.accList:eq(' + i + ') .gas').children(':eq(1)').html();
			other = $('.accList:eq(' + i + ') .other').children(':eq(1)').html();
			curBill = $('.accList:eq(' + i + ') .currentBill').children(':eq(1)')
				.html();
			total = $('.accList:eq(' + i + ') .totalAmt').html();
			dueDate = $('.dueDateSection:eq(' + i + ') .dateSection').html();
			users.push({
				prefixtxt: prefixtxt,
				msg: msg,
				cls: cls,
				pastDueMsg: pastDueMsg,
				indexNmbr: indexNmbr,
				chkbx: chkbx,
				acctxt: acctxt,
				address: address,
				accNo: accNo,
				price: price,
				dataRange: dataRange,
				eleccharges: eleccharges,
				gascharges: gascharges,
				other: other,
				curBill: curBill,
				total: total,
				dueDate: dueDate
			});

		}

		if ($('#sort_date').hasClass('desc')) {
			users.sort(function(a, b) {
				var dateA = new Date(a.dueDate),
					dateB = new Date(b.dueDate);
				if (dateA < dateB) { //sort string ascending
					return -1
				}
				if (dateA > dateB) {
					return 1
				}
				return 0 //default return value (no sorting)
			});
		} else {
			users.sort(function(a, b) {
				var dateA = new Date(a.dueDate),
					dateB = new Date(b.dueDate);
				if (dateA > dateB) { //sort string ascending
					return -1
				}
				if (dateA < dateB) {
					return 1
				}
				return 0 //default return value (no sorting)
			});
		}

		if ($('.multiAccSorting').val() === 'dueDateLtoH') {
			users.sort(function(a, b) {
				var dateA = new Date(a.dueDate),
					dateB = new Date(b.dueDate);
				if (dateA < dateB) { //sort string ascending
					return -1
				}
				if (dateA > dateB) {
					return 1
				}
				return 0 //default return value (no sorting)
			});
		} else if ($('.multiAccSorting').val() === 'dueDateHtoL') {
			users.sort(function(a, b) {
				var dateA = new Date(a.dueDate),
					dateB = new Date(b.dueDate);
				if (dateA > dateB) { //sort string ascending
					return -1
				}
				if (dateA < dateB) {
					return 1
				}
				return 0 //default return value (no sorting)
			});
		}



		$('.multiAccounts').html('')
		for (var j = 0; j < accrw.length; j++) {
			sortAddr(users[j].prefixtxt, users[j].address, acctxt, users[j].accNo,
				users[j].price, users[j].msg, users[j].cls, users[j].pastDueMsg, users[j]
				.chkbx, users[j].dataRange, users[j].eleccharges, users[j].gascharges,
				users[j].other, users[j].curBill, users[j].total, users[j].dueDate);

		}
		for (var i = 0; i < chkBoxList.length; i++) {
			$('.multiAccounts').find('#' + chkBoxList[i]).prop('checked', true)
			$('.multiAccounts').find('#' + chkBoxList[i]).parent('.customChkBox').addClass(
				'checked');
		}
	},

	sortAddress: function() {
		var accrw = $('.accountsRow'),
			users = [],
			prefixtxt, msg, cls, pastDueMsg,
			address, price, date, accNo, chkbx, acctxt, dataRange, eleccharges,
			gascharges, other, curBill, total, dueDate;
		var count = 0,
			chkBoxList = [];
		var chkBoxLength = $('.chkBox');
		for (var i = 0; i < chkBoxLength.length; i++) {
			if (chkBoxLength[i].checked) {
				var chkBoxId = $(chkBoxLength[i]).attr('id');
				chkBoxList.push(chkBoxId);
			}
		}
		for (var i = 0; i < accrw.length; i++) {
			prefixtxt = $('.accountsRow:eq(' + i +
				') .addressSec .bluColor:eq(0)').text();
			address = $('.accountsRow:eq(' + i + ') .addressSec .address').text();
			price = $('.DueMsgSection:eq(' + i + ') .amtDue').text();
			accNo = $('.addressSec:eq(' + i + ') .acNo').text();
			acctxt = "Account No.";
			cls = $('.DueMsgSection:eq(' + i + ')').children().attr('class').split(' ')[
				1];
			pastDueMsg = $('.multiAccounts .accList:eq(' + i + ') .pastDueMsg').html();
			msg = $('.DueMsgSection:eq(' + i + ')').children(':eq(1)').text();
			indexNmbr = $('.accList:eq(' + i + ') .btn-primary').attr(
				'data-accountindexnum')
			chkbx = $('.customChkBox:eq(' + i + ')').html();
			dataRange = $('.accList:eq(' + i + ') h4:eq(1)').html();
			eleccharges = $('.accList:eq(' + i + ') .electric').children(':eq(1)')
				.html();
			gascharges = $('.accList:eq(' + i + ') .gas').children(':eq(1)').html();
			other = $('.accList:eq(' + i + ') .other').children(':eq(1)').html();
			curBill = $('.accList:eq(' + i + ') .currentBill').children(':eq(1)')
				.html();
			total = $('.accList:eq(' + i + ') .totalAmt').html();
			dueDate = $('.dueDateSection:eq(' + i + ') .dateSection').html();
			users.push({
				prefixtxt: prefixtxt,
				msg: msg,
				cls: cls,
				pastDueMsg: pastDueMsg,
				indexNmbr: indexNmbr,
				chkbx: chkbx,
				acctxt: acctxt,
				address: address,
				accNo: accNo,
				price: price,
				dataRange: dataRange,
				eleccharges: eleccharges,
				gascharges: gascharges,
				other: other,
				curBill: curBill,
				total: total,
				dueDate: dueDate
			});

		}

		if ($('#sort_address').hasClass('desc')) {
			users.sort(function(a, b) {
				var addressA = isNaN(parseInt(a.address.trim().split(' ')[0])) ? a.address
					.trim().toLowerCase() : parseInt(a.address.trim().split(' ')[0]),
					addressB = isNaN(parseInt(b.address.trim().split(' ')[0])) ? b.address
					.trim().toLowerCase() : parseInt(b.address.trim().split(' ')[0]);
				if (addressA < addressB) { //sort string ascending
					return -1
				}
				if (addressA > addressB) {
					return 1
				}
				return 0 //default return value (no sorting)
			});
		} else {
			users.sort(function(a, b) {
				var addressA = isNaN(parseInt(a.address.trim().split(' ')[0])) ? a.address
					.trim().toLowerCase() : parseInt(a.address.trim().split(' ')[0]),
					addressB = isNaN(parseInt(b.address.trim().split(' ')[0])) ? b.address
					.trim().toLowerCase() : parseInt(b.address.trim().split(' ')[0]);
				if (addressA > addressB) { //sort string ascending
					return -1
				}
				if (addressA < addressB) {
					return 1
				}
				return 0 //default return value (no sorting)
			});
		}

		if ($('.multiAccSorting').val() === 'serviceAddressLtoH') {
			users.sort(function(a, b) {
				var addressA = isNaN(parseInt(a.address.trim().split(' ')[0])) ? a.address
					.trim().toLowerCase() : parseInt(a.address.trim().split(' ')[0]),
					addressB = isNaN(parseInt(b.address.trim().split(' ')[0])) ? b.address
					.trim().toLowerCase() : parseInt(b.address.trim().split(' ')[0]);
				if (addressA < addressB) { //sort string ascending
					return -1
				}
				if (addressA > addressB) {
					return 1
				}
				return 0 //default return value (no sorting)
			});
		} else if ($('.multiAccSorting').val() === 'serviceAddressHtoL') {
			users.sort(function(a, b) {
				var addressA = isNaN(parseInt(a.address.trim().split(' ')[0])) ? a.address
					.trim().toLowerCase() : parseInt(a.address.trim().split(' ')[0]),
					addressB = isNaN(parseInt(b.address.trim().split(' ')[0])) ? b.address
					.trim().toLowerCase() : parseInt(b.address.trim().split(' ')[0]);
				if (addressA > addressB) { //sort string ascending
					return -1
				}
				if (addressA < addressB) {
					return 1
				}
				return 0 //default return value (no sorting)
			});
		}



		$('.multiAccounts').html('')
		for (var j = 0; j < accrw.length; j++) {
			sortAddr(users[j].prefixtxt, users[j].address, acctxt, users[j].accNo,
				users[j].price, users[j].msg, users[j].cls, users[j].pastDueMsg, users[j]
				.chkbx, users[j].dataRange, users[j].eleccharges, users[j].gascharges,
				users[j].other, users[j].curBill, users[j].total, users[j].dueDate);

		}
		for (var i = 0; i < chkBoxList.length; i++) {
			$('.multiAccounts').find('#' + chkBoxList[i]).prop('checked', true)
			$('.multiAccounts').find('#' + chkBoxList[i]).parent('.customChkBox').addClass(
				'checked');
		}
	},
	sortAcc: function() {
		var accrw = $('.accountsRow'),
			users = [],
			prefixtxt, msg, cls, pastDueMsg,
			address, price, date, accNo, chkbx, acctxt, dataRange, eleccharges,
			gascharges, other, curBill, total, dueDate;
		var count = 0,
			chkBoxList = [];
		var chkBoxLength = $('.chkBox');
		for (var i = 0; i < chkBoxLength.length; i++) {
			if (chkBoxLength[i].checked) {
				var chkBoxId = $(chkBoxLength[i]).attr('id');
				chkBoxList.push(chkBoxId);
			}
		}
		for (var i = 0; i < accrw.length; i++) {
			prefixtxt = $('.accountsRow:eq(' + i +
				') .addressSec .bluColor:eq(0)').text();
			address = $('.accountsRow:eq(' + i + ') .addressSec .address').text();
			price = $('.DueMsgSection:eq(' + i + ') .amtDue').text();
			accNo = $('.addressSec:eq(' + i + ') .acNo').text();
			acctxt = "Account No.";
			cls = $('.DueMsgSection:eq(' + i + ')').children().attr('class').split(' ')[
				1];
			pastDueMsg = $('.multiAccounts .accList:eq(' + i + ') .pastDueMsg').html();
			msg = $('.DueMsgSection:eq(' + i + ')').children(':eq(1)').text();
			indexNmbr = $('.accList:eq(' + i + ') .btn-primary').attr(
				'data-accountindexnum')
			chkbx = $('.customChkBox:eq(' + i + ')').html();
			dataRange = $('.accList:eq(' + i + ') h4:eq(1)').html();
			eleccharges = $('.accList:eq(' + i + ') .electric').children(':eq(1)').html();
			gascharges = $('.accList:eq(' + i + ') .gas').children(':eq(1)').html();
			other = $('.accList:eq(' + i + ') .other').children(':eq(1)').html();
			curBill = $('.accList:eq(' + i + ') .currentBill').children(':eq(1)')
				.html();
			total = $('.accList:eq(' + i + ') .totalAmt').html();
			dueDate = $('.dueDateSection:eq(' + i + ') .dateSection').html();
			users.push({
				prefixtxt: prefixtxt,
				msg: msg,
				cls: cls,
				pastDueMsg: pastDueMsg,
				indexNmbr: indexNmbr,
				chkbx: chkbx,
				acctxt: acctxt,
				address: address,
				accNo: accNo,
				price: price,
				dataRange: dataRange,
				eleccharges: eleccharges,
				gascharges: gascharges,
				other: other,
				curBill: curBill,
				total: total,
				dueDate: dueDate
			});

		}

		if ($('#sort_account').hasClass('desc')) {
			users.sort(function(a, b) {
				return a.accNo.replace(/\s/g, '').substring(1) - b.accNo.replace(/\s/g,
					'').substring(1)
			});
		} else {
			users.sort(function(a, b) {
				return b.accNo.replace(/\s/g, '').substring(1) - a.accNo.replace(/\s/g,
					'').substring(1)
			});
		}

		if ($('.multiAccSorting').val() === 'accountLtoH') {
			users.sort(function(a, b) {
				return a.accNo.replace(/\s/g, '').substring(1) - b.accNo.replace(/\s/g,
					'').substring(1)
			});
		} else if ($('.multiAccSorting').val() === 'accountHtoL') {
			users.sort(function(a, b) {
				return b.accNo.replace(/\s/g, '').substring(1) - a.accNo.replace(/\s/g,
					'').substring(1)
			});
		}



		$('.multiAccounts').html('')
		for (var j = 0; j < accrw.length; j++) {


			sortAddr(users[j].prefixtxt, users[j].address, acctxt, users[j].accNo,
				users[j].price, users[j].msg, users[j].cls, users[j].pastDueMsg, users[j]
				.chkbx, users[j].dataRange, users[j].eleccharges, users[j].gascharges,
				users[j].other, users[j].curBill, users[j].total, users[j].dueDate);
		}
		for (var i = 0; i < chkBoxList.length; i++) {
			$('.multiAccounts').find('#' + chkBoxList[i]).prop('checked', true)
			$('.multiAccounts').find('#' + chkBoxList[i]).parent('.customChkBox').addClass(
				'checked');
		}

	},
	sortPrice: function() {
		var accrw = $('.accountsRow'),
			users = [],
			prefixtxt, msg, cls, pastDueMsg,
			address, price, date, accNo, chkbx, acctxt, dataRange, eleccharges,
			gascharges, other, curBill, total, dueDate;
		var count = 0,
			chkBoxList = [];
		var chkBoxLength = $('.chkBox');
		for (var i = 0; i < chkBoxLength.length; i++) {
			if (chkBoxLength[i].checked) {
				var chkBoxId = $(chkBoxLength[i]).attr('id');
				chkBoxList.push(chkBoxId);
			}
		}
		for (var i = 0; i < accrw.length; i++) {
			prefixtxt = $('.accountsRow:eq(' + i +
				') .addressSec .bluColor:eq(0)').text();
			address = $('.accountsRow:eq(' + i + ') .addressSec .address').text();
			price = $('.DueMsgSection:eq(' + i + ') .amtDue').text();
			accNo = $('.addressSec:eq(' + i + ') .acNo').text();
			acctxt = "Account No.";
			cls = $('.DueMsgSection:eq(' + i + ')').children().attr('class').split(' ')[
				1];
			pastDueMsg = $('.multiAccounts .accList:eq(' + i + ') .pastDueMsg').html();
			msg = $('.DueMsgSection:eq(' + i + ')').children(':eq(1)').text();
			indexNmbr = $('.accList:eq(' + i + ') .btn-primary').attr(
				'data-accountindexnum');
			chkbx = $('.customChkBox:eq(' + i + ')').html();
			dataRange = $('.accList:eq(' + i + ') h4:eq(1)').html();
			eleccharges = $('.accList:eq(' + i + ') .electric').children(':eq(1)').html();
			gascharges = $('.accList:eq(' + i + ') .gas').children(':eq(1)').html();
			other = $('.accList:eq(' + i + ') .other').children(':eq(1)').html();
			curBill = $('.accList:eq(' + i + ') .currentBill').children(':eq(1)').html();
			total = $('.accList:eq(' + i + ') .totalAmt').html();
			dueDate = $('.dueDateSection:eq(' + i + ') .dateSection').html();
			users.push({
				prefixtxt: prefixtxt,
				msg: msg,
				cls: cls,
				pastDueMsg: pastDueMsg,
				indexNmbr: indexNmbr,
				chkbx: chkbx,
				acctxt: acctxt,
				address: address,
				accNo: accNo,
				price: price,
				dataRange: dataRange,
				eleccharges: eleccharges,
				gascharges: gascharges,
				other: other,
				curBill: curBill,
				total: total,
				dueDate: dueDate
			});

		}
		if ($('#sort_amtDue').hasClass('desc')) {
			users.sort(function(a, b) {
				return a.price.substring(1) - b.price.substring(1)
			});
		} else {
			users.sort(function(a, b) {
				return b.price.substring(1) - a.price.substring(1)
			});
		}



		$('.multiAccounts').html('')
		for (var j = 0; j < accrw.length; j++) {

			sortAddr(users[j].prefixtxt, users[j].address, acctxt, users[j].accNo,
				users[j].price, users[j].msg, users[j].cls, users[j].pastDueMsg, users[j]
				.chkbx, users[j].dataRange, users[j].eleccharges, users[j].gascharges,
				users[j].other, users[j].curBill, users[j].total, users[j].dueDate);
		}
		for (var i = 0; i < chkBoxList.length; i++) {
			$('.multiAccounts').find('#' + chkBoxList[i]).prop('checked', true)
			$('.multiAccounts').find('#' + chkBoxList[i]).parent('.customChkBox').addClass(
				'checked');
		}

	},

	sortAmountDue: function() {
		var accrw = $('.accountsRow'),
			users = [],
			prefixtxt, msg, cls, pastDueMsg,
			address, price, date, accNo, chkbx, acctxt, dataRange, eleccharges,
			gascharges, other, curBill, total, dueDate;
		var count = 0,
			chkBoxList = [];
		var chkBoxLength = $('.chkBox');
		for (var i = 0; i < chkBoxLength.length; i++) {
			if (chkBoxLength[i].checked) {
				var chkBoxId = $(chkBoxLength[i]).attr('id');
				chkBoxList.push(chkBoxId);
			}
		}
		for (var i = 0; i < accrw.length; i++) {
			prefixtxt = $('.accountsRow:eq(' + i +
				') .addressSec .bluColor:eq(0)').text();
			address = $('.accountsRow:eq(' + i + ') .addressSec .address').text();
			price = $('.DueMsgSection:eq(' + i + ') .amtDue').text();
			accNo = $('.addressSec:eq(' + i + ') .acNo').text();
			acctxt = "Account No.";
			cls = $('.DueMsgSection:eq(' + i + ')').children().attr('class').split(' ')[
				1];
			pastDueMsg = $('.multiAccounts .accList:eq(' + i + ') .pastDueMsg').html();
			msg = $('.DueMsgSection:eq(' + i + ')').children(':eq(1)').text();
			indexNmbr = $('.accList:eq(' + i + ') .btn-primary').attr(
				'data-accountindexnum');
			chkbx = $('.customChkBox:eq(' + i + ')').html();
			dataRange = $('.accList:eq(' + i + ') h4:eq(1)').html();
			eleccharges = $('.accList:eq(' + i + ') .electric').children(':eq(1)').html();
			gascharges = $('.accList:eq(' + i + ') .gas').children(':eq(1)').html();
			other = $('.accList:eq(' + i + ') .other').children(':eq(1)').html();
			curBill = $('.accList:eq(' + i + ') .currentBill').children(':eq(1)').html();
			total = $('.accList:eq(' + i + ') .totalAmt').html();
			dueDate = $('.dueDateSection:eq(' + i + ') .dateSection').html();
			users.push({
				prefixtxt: prefixtxt,
				msg: msg,
				cls: cls,
				pastDueMsg: pastDueMsg,
				indexNmbr: indexNmbr,
				chkbx: chkbx,
				acctxt: acctxt,
				address: address,
				accNo: accNo,
				price: price,
				dataRange: dataRange,
				eleccharges: eleccharges,
				gascharges: gascharges,
				other: other,
				curBill: curBill,
				total: total,
				dueDate: dueDate
			});

		}

		if ($('.multiAccSorting').val() === 'amountDueLtoH') {
			users.sort(function(a, b) {
				return a.price.substring(1) - b.price.substring(1)
			});
		} else if ($('.multiAccSorting').val() === 'amountDueHtoL') {
			users.sort(function(a, b) {
				return b.price.substring(1) - a.price.substring(1)
			});
		}


		$('.multiAccounts').html('')
		for (var j = 0; j < accrw.length; j++) {

			sortAddr(users[j].prefixtxt, users[j].address, acctxt, users[j].accNo,
				users[j].price, users[j].msg, users[j].cls, users[j].pastDueMsg, users[j]
				.chkbx, users[j].dataRange, users[j].eleccharges, users[j].gascharges,
				users[j].other, users[j].curBill, users[j].total, users[j].dueDate);
		}
		for (var i = 0; i < chkBoxList.length; i++) {
			$('.multiAccounts').find('#' + chkBoxList[i]).prop('checked', true)
			$('.multiAccounts').find('#' + chkBoxList[i]).parent('.customChkBox').addClass(
				'checked');
		}

	}

};

function toggleBar(ele) {
	$(ele).next('.toggle').toggle();
	if ($(ele).next('.toggle').is(':visible') == true) {
		$(ele).children().addClass('blubgColor');
		$("#errorMSG").addClass("eleNone")
		$("#errorMSG1").addClass("eleNone")
		$(ele).find('.tglIcon').addClass('contract-icon').removeClass(
			'expand-icon');
		$('.payBillBtn').hide();
		$('.additionVal:first').addClass('bluColor');
	} else {
		$(ele).children().removeClass('blubgColor');
		$(ele).find('.tglIcon').removeClass('contract-icon').addClass(
			'expand-icon');
		$("#errorMSG").removeClass("eleNone")
		$("#errorMSG1").removeClass("eleNone")
		$('.payBillBtn').show();
		$('.additionVal:first').removeClass('whiteColor');
		if ($('.multiAccounts .chkBox:checked').length > 5) {
			$("#errorMSG").removeClass("eleNone")
			$("#errorMSG1").removeClass("eleNone")
		} else {
			$("#errorMSG").addClass("eleNone")
			$("#errorMSG1").addClass("eleNone")
		}
	}
}

function paymentToggleBar(ele) {
	$(ele).next('#toggle').toggle();
	if ($(ele).next('.toggle').is(':visible') == true) {
		$(ele).children().addClass('blubgColor');
		$(ele).find('.tglIcon').addClass('contract-icon').removeClass(
			'expand-icon');
		$('.payBillBtn').show();
		$('.additionVal:first').addClass('bluColor');
	} else {
		$(ele).children().removeClass('blubgColor');
		$(ele).find('.tglIcon').removeClass('contract-icon').addClass(
			'expand-icon');
		$('.payBillBtn').show();
		$('.additionVal:first').removeClass('whiteColor');
	}
}

function copyFun(selector) {
	var acc = $(selector).closest('.row').find('.addressSec').html(),
		dueMsg = $(selector).closest('.row').children('.DueMsgSection').html(),
		ID = $(selector).attr('id'),
		str;
	str = '<div class="frmTbl" id="' + ID + '"><div class="frmRow">' +
		'<div class="frmCell WDTH42 text-left PADDL15PX selAddress">' + acc +
		'</div>' +
		'<div class="frmCell WDTH42 text-right PADDR20PX">' + dueMsg + '</div>' +
		'<div class="frmCell WDTH8 text-right PADDT20PX PADDR15PX">' +
		'<span class="remove hnd">Remove</span>' +
		'</div>' +
		'</div>' +
		'</div>';
	return str;

}

function accCount() {
	var cnt = $('.accountsRow .chkBox:checked').length;
	$('.noAcc').html(cnt);
	var remAcc = $('.noAcc').html(),
		currentVal = $('.additionVal').html();
	currentVal = currentVal.replace('$', '');
	if (parseInt(currentVal) <= 0) {
		$('#payseletedbillb').addClass("hidden");
		$('#makeFutureBtnB').addClass("hidden");
		$('#makefuturepaymentb').removeClass("hidden");
		$('.payseletedbills').addClass("hidden");
		$('.makefuturepayments').removeClass("hidden");
		$('#payseletedbillt').addClass("hidden");
		$('#makefuturepaymentt').removeClass("hidden");
	} else {
		$('#payseletedbillb').removeClass("hidden");
		$('#makeFutureBtnB').removeClass("hidden");
		$('#makefuturepaymentb').addClass("hidden");
		$('.payseletedbills').removeClass("hidden");
		$('.makefuturepayments').addClass("hidden");
		$('#payseletedbillt').removeClass("hidden");
		$('#makefuturepaymentt').addClass("hidden");
	}
	if (remAcc > 5) {
		$(".pay_selected_bill").addClass('disabled');
		$('#makeFutureBtnB').addClass("hidden");
		$("#payseletedbilltt").prop("disabled", true);
		$("#makeFuturePayBtn").prop("disabled", true);
		$("#payseletedbilltop").prop("disabled", true);
		$("#makeFuturePayBtnTop").prop("disabled", true);
		$("#payseletedbillBottom").prop("disabled", true);
		$("#makefuturepaymentbottom").prop("disabled", true);
		$("#payseletedbilltt").addClass("gryBtnclr");
		$("#makeFuturePayBtn").addClass("gryBtnclr");
		$("#payseletedbilltop").addClass("gryBtnclr");
		$("#makeFuturePayBtnTop").addClass("gryBtnclr");
		$("#payseletedbillBottom").addClass("gryBtnclr");
		$("#makefuturepaymentbottom").addClass("gryBtnclr");
		$("#pay_selected_bill_btm").addClass('paybtnbtm');
		if ($('.selectedAcc').children().hasClass('blubgColor')) {
			$("#errorMSG").addClass("eleNone")
			$("#errorMSG1").addClass("eleNone")
		} else {
			$("#errorMSG").removeClass("eleNone")
			$("#errorMSG1").removeClass("eleNone")

		}
		$("#errorMSG2").removeClass("eleNone")
		$("#errorMSG3").removeClass("eleNone")
		$("#errorMSG4").removeClass("eleNone")
		$("#errorMSG5").removeClass("eleNone")
		$("#errorMSG6").removeClass("eleNone")
	} else {
		$('#makeFutureBtnB').addClass("hidden");
		$(".pay_selected_bill").removeClass('disabled');
		$("#payseletedbilltt").prop("disabled", false);
		$("#makeFuturePayBtn").prop("disabled", false);
		$("#payseletedbilltop").prop("disabled", false);
		$("#makeFuturePayBtnTop").prop("disabled", false);
		$("#payseletedbillBottom").prop("disabled", false);
		$("#makefuturepaymentbottom").prop("disabled", false);
		$("#payseletedbilltt").removeClass("gryBtnclr");
		$("#makeFuturePayBtn").removeClass("gryBtnclr");
		$("#payseletedbilltop").removeClass("gryBtnclr");
		$("#makeFuturePayBtnTop").removeClass("gryBtnclr");
		$("#payseletedbillBottom").removeClass("gryBtnclr");
		$("#makefuturepaymentbottom").removeClass("gryBtnclr");
		$("#pay_selected_bill_btm").removeClass('paybtnbtm');
		$("#errorMSG").addClass("eleNone")
		$("#errorMSG1").addClass("eleNone")
		$("#errorMSG2").addClass("eleNone")
		$("#errorMSG3").addClass("eleNone")
		$("#errorMSG4").addClass("eleNone")
		$("#errorMSG5").addClass("eleNone")
		$("#errorMSG6").addClass("eleNone")
	}

	if (remAcc == 0) {
		$(".selectedBill").addClass("hidden");
		$("#payseletedbillBottom").prop("disabled", true);
		$("#makefuturepaymentbottom").prop("disabled", true);
		$('#payseletedbillt').removeClass("hidden");
		$('#makefuturepaymentt').addClass("hidden");
		$('#makefuturepaymentb').addClass("hidden");
		$('#makeFutureBtnB').removeClass("hidden");
		$('#payseletedbillb').removeClass("hidden");
	}

}


function sortAddr(prefixtxt, address, acctxt, accNo, price, msg, cls,
	pastDueMsg, chkbx, dataRange, eleccharges, gascharges, other, curBill, total,
	dueDate) {
	var str = "";
	if (cls == "IL_PastDueL2StsMsg") {
		str += '<section>' +
			'<div class="summaryInfo toggleHeader accountsRow hnd">' +
			'<div class="row brdBtm brdRedRgt">' +
			'<div class="col-md-6 col-sm-6 text-left">' +
			'<span class="tglIcon expand-icon MRGR20PX MRGT15PX"></span>' +
			'<section class="addressSec">' +
			'<span class="bluColor">' + prefixtxt + '</span>' +
			'<span class="address">' + address + '<br/></span>' +
			'<span class="bluColor">' + acctxt + '</span>' +
			'<span class="acNo">' + accNo + '</span>' +
			'</section>' +
			'</div>' +
			'<div class="col-md-1 text-right multichkbx">' +
			'<span class="customChkBox">' + chkbx + '</span>' +
			'</div>' +
			'<div class="col-md-5 text-right DueMsgSection mMultiAccAmt">' +
			'<span class="amtDue ' + cls + '">' + price +
			'</span>' +
			'<div class="' + cls + '">' + msg + '</div>' +
			'<div id="dueDateSection" class="dueDateSection eleNone"><span class="dateSection">' +
			dueDate + '</span></div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<article class="summaryInfo toggle eleNone MRGT10PX accList">' +

			(typeof pastDueMsg !== "undefined" ?
				'<div class="row brdNone pastDueMsg">' + pastDueMsg + '</div>' : "") +
			'<div class="row brdBtm">' +
			'<div class="WDTH60">' +
			'<h4 class="PADDT10PX text-center">Summary of Charges:</h4>' +
			'<h4 class="PADDB10PX text-center">' + dataRange + '</h4>' +
			'</div>' +
			'<div class="frmTbl oflwHidden MRGT10PX WDTH96 mrgCenter">' +
			'<div class="frmRow">' +
			'<div class="frmCell WDTH60 vTop brdNone">' +
			(typeof eleccharges !== "undefined" ?
				'<div class="row brdBtm electric fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Electric:</div>' +
				'<div class="col-md-6 text-right">' + eleccharges + '</div>' +
				'</div>' : "") +
			(typeof gascharges !== "undefined" ?
				'<div class="row brdBtm gas fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Gas:</div>' +
				'<div class="col-md-6 text-right">' + gascharges + '</div>' +
				'</div>' : "") +
			(typeof other !== "undefined" ?
				'<div class="row brdBtm other fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Other:</div>' +
				'<div class="col-md-6 text-right">' + other + '</div>' +
				'</div>' : "") +
			(typeof curBill !== "undefined" ?
				'<div class="row currentBill fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Current Bill:</div>' +
				'<div class="col-md-6 text-right">' + curBill + '</div>' +
				'</div>' : "") +
			'<div class="text-center MRGT15PX MRGB10PX">' +
			'<input type="button" value="View Current Bill" data-accountindexnum="' +
			indexNmbr + '" class="btn-primary multipleAccountViewBill">' +
			'</div>' +
			'</div>' +
			'<div class="frmCell text-center brdNone vTop">' +
			'<label class="fnt1-4EM">' + 'Total Amount Due:' + '</label>' +
			'<br/>' +
			'<h3 class="fnt3-31EM totalAmt">' + total + '</h3>' +
			'<div class="text-center MRGT10PX"><input type="button" value="Pay Now" class="btnBlue WDTH200PX"></div>' +
			' </div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</article>' +
			'</section>';

		$('.multiAccounts').append(str)
	} else if (cls == "IL_PastDueL1StsMsg") {
		str += '<section>' +
			'<div class="summaryInfo toggleHeader accountsRow hnd">' +
			'<div class="row brdBtm brdOrgRgt">' +
			'<div class="col-md-6 col-sm-6 text-left">' +
			'<span class="tglIcon expand-icon MRGR20PX MRGT15PX"></span>' +
			'<section class="addressSec">' +
			'<span class="bluColor">' + prefixtxt + '</span>' +
			'<span class="address">' + address + '<br/></span>' +
			'<span class="bluColor">' + acctxt + '</span>' +
			'<span class="acNo">' + accNo + '</span>' +
			'</section>' +
			'</div>' +
			'<div class="col-md-1 text-right multichkbx">' +
			'<span class="customChkBox">' + chkbx + '</span>' +
			'</div>' +
			'<div class="col-md-5 text-right DueMsgSection mMultiAccAmt">' +
			'<span class="amtDue ' + cls + '">' + price +
			'</span>' +
			'<div class="' + cls + '">' + msg + '</div>' +
			'<div id="dueDateSection" class="dueDateSection eleNone"><span class="dateSection">' +
			dueDate + '</span></div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<article class="summaryInfo toggle eleNone MRGT10PX accList">' +

			(typeof pastDueMsg !== "undefined" ?
				'<div class="row brdNone pastDueMsg">' + pastDueMsg + '</div>' : "") +
			'<div class="row brdBtm">' +
			'<div class="WDTH60">' +
			'<h4 class="PADDT10PX text-center">Summary of Charges:</h4>' +
			'<h4 class="PADDB10PX text-center">' + dataRange + '</h4>' +
			'</div>' +
			'<div class="frmTbl oflwHidden MRGT10PX WDTH96 mrgCenter">' +
			'<div class="frmRow">' +
			'<div class="frmCell WDTH60 vTop brdNone">' +
			(typeof eleccharges !== "undefined" ?
				'<div class="row brdBtm electric fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Electric:</div>' +
				'<div class="col-md-6 text-right">' + eleccharges + '</div>' +
				'</div>' : "") +
			(typeof gascharges !== "undefined" ?
				'<div class="row brdBtm gas fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Gas:</div>' +
				'<div class="col-md-6 text-right">' + gascharges + '</div>' +
				'</div>' : "") +
			(typeof other !== "undefined" ?
				'<div class="row brdBtm other fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Other:</div>' +
				'<div class="col-md-6 text-right">' + other + '</div>' +
				'</div>' : "") +
			(typeof curBill !== "undefined" ?
				'<div class="row currentBill fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Current Bill:</div>' +
				'<div class="col-md-6 text-right">' + curBill + '</div>' +
				'</div>' : "") +
			'<div class="text-center MRGT15PX MRGB10PX">' +
			'<input type="button" value="View Current Bill" data-accountindexnum="' +
			indexNmbr + '" class="btn-primary multipleAccountViewBill">' +
			'</div>' +
			'</div>' +
			'<div class="frmCell text-center brdNone vTop">' +
			'<label class="fnt1-4EM">' + 'Total Amount Due:' + '</label>' +
			'<br/>' +
			'<h3 class="fnt3-31EM totalAmt">' + total + '</h3>' +
			'<div class="text-center MRGT10PX"><input type="button" value="Pay Now" class="btnBlue WDTH200PX"></div>' +
			' </div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</article>' +
			'</section>';

		$('.multiAccounts').append(str)
	} else {
		str += '<section>' +
			'<div class="summaryInfo toggleHeader accountsRow hnd">' +
			'<div class="row brdBtm ">' +
			'<div class="col-md-6 col-sm-6 text-left">' +
			'<span class="tglIcon expand-icon MRGR20PX MRGT15PX"></span>' +
			'<section class="addressSec">' +
			'<span class="bluColor">' + prefixtxt + '</span>' +
			'<span class="address">' + address + '<br/></span>' +
			'<span class="bluColor">' + acctxt + '</span>' +
			'<span class="acNo">' + accNo + '</span>' +
			'</section>' +
			'</div>' +
			'<div class="col-md-1 text-right multichkbx">' +
			'<span class="customChkBox">' + chkbx + '</span>' +
			'</div>' +
			'<div class="col-md-5 text-right DueMsgSection mMultiAccAmt">' +
			'<span class="amtDue ' + cls + '">' + price +
			'</span>' +
			'<div class="' + cls + '">' + msg + '</div>' +
			'<div id="dueDateSection" class="dueDateSection eleNone"><span class="dateSection">' +
			dueDate + '</span></div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<article class="summaryInfo toggle eleNone MRGT10PX accList">' +

			(typeof pastDueMsg !== "undefined" ?
				'<div class="row brdNone pastDueMsg">' + pastDueMsg + '</div>' : "") +
			'<div class="row brdBtm">' +
			'<div class="WDTH60">' +
			'<h4 class="PADDT10PX text-center">Summary of Charges:</h4>' +
			'<h4 class="PADDB10PX text-center">' + dataRange + '</h4>' +
			'</div>' +
			'<div class="frmTbl oflwHidden MRGT10PX WDTH96 mrgCenter">' +
			'<div class="frmRow">' +
			'<div class="frmCell WDTH60 vTop brdNone">' +
			(typeof eleccharges !== "undefined" ?
				'<div class="row brdBtm electric fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Electric:</div>' +
				'<div class="col-md-6 text-right">' + eleccharges + '</div>' +
				'</div>' : "") +
			(typeof gascharges !== "undefined" ?
				'<div class="row brdBtm gas fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Gas:</div>' +
				'<div class="col-md-6 text-right">' + gascharges + '</div>' +
				'</div>' : "") +
			(typeof other !== "undefined" ?
				'<div class="row brdBtm other fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Other:</div>' +
				'<div class="col-md-6 text-right">' + other + '</div>' +
				'</div>' : "") +
			(typeof curBill !== "undefined" ?
				'<div class="row currentBill fnt1EM">' +
				'<div class="col-md-6 PADDL46PX">Current Bill:</div>' +
				'<div class="col-md-6 text-right">' + curBill + '</div>' +
				'</div>' : "") +
			'<div class="text-center MRGT15PX MRGB10PX">' +
			'<input type="button" value="View Current Bill" data-accountindexnum="' +
			indexNmbr + '" class="btn-primary multipleAccountViewBill">' +
			'</div>' +
			'</div>' +
			'<div class="frmCell text-center brdNone vTop">' +
			'<label class="fnt1-4EM">' + 'Total Amount Due:' + '</label>' +
			'<br/>' +
			'<h3 class="fnt3-31EM totalAmt">' + total + '</h3>' +
			'<div class="text-center MRGT10PX"><input type="button" value="Pay Now" class="btnBlue WDTH200PX"></div>' +
			' </div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</article>' +
			'</section>';

		$('.multiAccounts').append(str)
	}
}   