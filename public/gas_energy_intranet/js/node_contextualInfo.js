exports.context = function context(request, callback) {

	this.contextualHelpList =  {
		
		"Gas" : [
			{
				"key":"Customer Charge",
				"value":"A fixed monthly charge that allows DTE Energy to recover basic administrative costs, such as billing, customer service, meter reading, and more. The customer charge applies each month to every customer who can take service on our system, even if they have zero gas usage."
			},
			{
				"key":"Gas Distribution Charge",
				"value":"This is the amount you pay to deliver the natural gas you use to your home, based on the amount of gas you use during the billing period."
			},
			{
				"key":"Energy Optimization",
				"value":"This surcharge allows DTE Energy to offer an Energy Optimization program that provides rebates, incentives and energy efficiency education to our customers. This credit/surcharge is based on the amount of gas you use during the billing period."
			},
			{
				"key":"Gas Cost Recovery",
				"value":"Typically the largest portion of a heating bill, the GCR rate is the price you pay for natural gas. Although the rate can change monthly, it is the same price we pay to purchase our gas supply. Note: If you participate in the Gas Customer Choice (GCC) program, the gas component on your bill is represented by the GCC Supplier Charge. DTE Energy simply bills for this charge, collects payment and reimburses the GCC supplier. Gas choice customers should contact their alternative gas supplier with questions about their cost of gas."
			},
			{
				"key":"IRM Surcharge",
				"value":"The Infrastructure Recovery Mechanism (IRM) is a surcharge that allows DTE Energy to recover costs related to gas main, pipeline and meter improvements."
			},
			{
				"key":"Reservation Charge",
				"value":"DTE Energy is the “supplier of last resort” and has to ensure gas supply is available to its customers, regardless of who supplies their natural gas. The Reservation Charge allows DTE to obtain the assets necessary ensure reliable gas supply for its customers as supplier of last resort."
			},
			{	
				"key":"Residential Michigan Sales Tax",
				"value": "Michigan Sales tax is applicable to your utility usage."
			}
		],

		"Electric" : [
			{
				"key":"Power Supply Energy",
				"value" :"The Power Supply Energy Charge is the cost to generate the electricity you used, including the fuel costs and the expenses of owning, operating and maintaining power plants."
			},
			{
				"key":"Renewable Energy Plan Surchg",
				"value":"This charge covers the cost of incorporating renewable sources in DTE Energy’s generation mix as specified in Public Act 295 of 2008."
			},
			{
				"key":"Other Power Supply Surcharges*",
				"value":"This line item includes the Power Supply Cost Recovery surcharge, which is a portion of the cost to generate the electricity you use. It may also include related surcharges to fund specific programs and address collections or refunds of items approved by the Michigan Public Service Commission."
			},
			{
				"key":"Service Charge",
				"value":"A fixed charge that allows DTE Energy to recover basic administrative costs, such as billing, customer service, meter reading, and more"
			},
			{
				"key":"Distribution",
				"value":"The Distribution Charge is the amount you pay per kilowatt hour for delivering your electricity across our wires as well as maintenance of the distribution system."
			},
			{
				"key":"Energy Optimization",
				"value":"This surcharge funds energy efficiency programs for DTE Energy electric customers."
			},
			{
				"key":"VHWF Credit",
				"value":"The Vulnerable Household Warmth Fund (VHWF) Credit has reduced customer bills each month since August 2012. This credit will terminate for service after July 1, 2015."
			},
			{
				"key":"LIEAF Factor",
				"value":"The Low Income Energy Assistance Fund (LIEAF) Factor is a surcharge in compliance with Public Act 95 of 2013. Monies collected through the LIEAF surcharge are passed to the Department of Human Services to provide heating assistance to Michigan’s low-income customers."
			},
			{
				"key":"Other Delivery Surcharges**",
				"value":"These additional charges or credits are used to fund specific programs, and to address collection or refunds of items approved by the Michigan Public Service Commission."
			},
			{
				"key":"Residential Michigan Sales Tax",
				"value":"The Michigan Sales tax is applicable to your utility usage."
			}
		],

		"Home Protection Plus" : [
			{
				"key":"Home Protection Plus® Ultimate Protection",
				"value":"Ultimate Protection acts like an extended warranty for your furnace, water heater (tank type), refrigerator, range/oven/cooktop, clothes washer and dryer and a central air conditioning unit."
			},
			{
				"key":"Home Protection Plus® Core Protection",
				"value":"Core Protection acts like an extended warranty for two of your most important necessities—your furnace and water heater (tank type)."
			},
			{
				"key":"Home Protection Plus® Platinum Plan",
				"value":"It’s total protection. Platinum Protection acts like an extended warranty for your furnace, water heater (tank-type), refrigerator, range/oven/cooktop, clothes washer and dryer, dishwasher, microwave, chest or upright freezer and a central air conditioning unit."
			},
			{
				"key":"Home Protection Plus® Kitchen Protection",
				"value":"It’s extra protection for the busiest area in your home. Kitchen Protection acts like an extended warranty for YOUR refrigerator and range/oven/cooktop as well as your furnace and water heater (tank-type)."
			}
		]

	}

	callback("",this.contextualHelpList)

}





 
 


 

 
 

