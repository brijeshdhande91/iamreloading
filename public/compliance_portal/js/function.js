function Add(){
	$(".tblData tbody").append( "<tr>"+ "<td><input type='text'/></td>"+ "<td><input type='text'/></td>"+ "<td><input type='text'/></td>"+  "<td><input type='text'/></td>"+ "<td style='text-align: center;'><input type='button' value='&#10004;' class='btnSave'></td>"+ "</tr>");
	$(".btnSave").bind("click", Save);	$(".btnDelete").bind("click", Delete); 
}

function Save(){ 
	var par = $(this).parent().parent(); //tr 
	var tdName = par.children("td:nth-child(1)"); 
	var tdFrequency = par.children("td:nth-child(2)"); 
	var tdReturnDate = par.children("td:nth-child(3)"); 
	var tdMonth = par.children("td:nth-child(4)");
	var tdButtons = par.children("td:nth-child(5)"); 
	tdName.html(tdName.children("input[type=text]").val()); 
	tdFrequency.html(tdFrequency.children("input[type=text]").val()); 
	tdReturnDate.html(tdReturnDate.children("input[type=text]").val()); 
	tdMonth.html(tdMonth.children("input[type=text]").val()); 
	tdButtons.html("<input type='button' value='&#10071;' class='btnEdit'/>"); 
	$(".btnDelete").bind("click", Delete); 	
	$(".btnEdit").bind("click", Edit);
}
 
function Edit(){ 
	var par = $(this).parent().parent(); //tr 
	var tdName = par.children("td:nth-child(1)"); 
	var tdFrequency = par.children("td:nth-child(2)"); 
	var tdReturnDate = par.children("td:nth-child(3)"); 
	var tdMonth = par.children("td:nth-child(4)");
	var tdButtons = par.children("td:nth-child(5)");  
	tdName.html("<input type='text' id='txtName' value='"+tdName.html()+"'/>"); 
	tdFrequency.html("<input type='text' id='txtFrequency' value='"+tdFrequency.html()+"'/>"); 
	tdReturnDate.html("<input type='text' id='txtReturnDate' value='"+tdReturnDate.html()+"'/>"); 
	tdMonth.html("<input type='text' id='txtMonth' value='"+tdMonth.html()+"'/>"); 
	tdButtons.html("<input type='button' value='&#10004' class='btnSave'/>"); 
	$(".btnSave").bind("click", Save); 
	$(".btnEdit").bind("click", Edit); 
	$(".btnDelete").bind("click", Delete);
}
 
function Delete(){
	var par = $(this).parent().parent(); //tr 
	par.remove(); 
}

function AddVendor(){
	$(".vendortblData tbody").append( "<tr>"+ "<td><input type='text'/></td>"+ "<td><input type='text'/></td>"+ "<td><input type='text'/></td>"+  "<td><input type='text'/></td>"+ "<td><input type='text'/></td>"+ "<td><input type='text'/></td>"+"<td style='text-align: center;'><input type='button' value='&#10004;' class='btnSavevendor'></td>"+ "</tr>");
	$(".btnSavevendor").bind("click", SaveVendor);	$(".btnDeletevendor").bind("click", DeleteVendor); 
}

function SaveVendor(){ 
	var par = $(this).parent().parent(); //tr 
	var tdName = par.children("td:nth-child(1)"); 
	var tdFrequency = par.children("td:nth-child(2)"); 
	var tdReturnDate = par.children("td:nth-child(3)"); 
	var tdMonth = par.children("td:nth-child(4)");
	var tdUnit = par.children("td:nth-child(5)"); 
	var tdNature = par.children("td:nth-child(6)");
	var tdButtons = par.children("td:nth-child(7)");
	tdName.html(tdName.children("input[type=text]").val()); 
	tdFrequency.html(tdFrequency.children("input[type=text]").val()); 
	tdReturnDate.html(tdReturnDate.children("input[type=text]").val()); 
	tdMonth.html(tdMonth.children("input[type=text]").val()); 
	tdUnit.html(tdUnit.children("input[type=text]").val()); 
	tdNature.html(tdNature.children("input[type=text]").val()); 
	tdButtons.html("<input type='button' value='&#10071;' class='btnEditvendor'/>"); 
	$(".btnDeletevendor").bind("click", DeleteVendor); 	
	$(".btnEditvendor").bind("click", EditVendor);
}
 
function EditVendor(){ 
	var par = $(this).parent().parent(); //tr 
	var tdName = par.children("td:nth-child(1)"); 
	var tdFrequency = par.children("td:nth-child(2)"); 
	var tdReturnDate = par.children("td:nth-child(3)"); 
	var tdMonth = par.children("td:nth-child(4)");
	var tdUnit = par.children("td:nth-child(5)"); 
	var tdNature = par.children("td:nth-child(6)");
	var tdButtons = par.children("td:nth-child(7)");
	tdName.html("<input type='text' id='txtName' value='"+tdName.html()+"'/>"); 
	tdFrequency.html("<input type='text' id='txtFrequency' value='"+tdFrequency.html()+"'/>"); 
	tdReturnDate.html("<input type='text' id='txtReturnDate' value='"+tdReturnDate.html()+"'/>"); 
	tdMonth.html("<input type='text' id='txtMonth' value='"+tdMonth.html()+"'/>"); 
	tdUnit.html("<input type='text' id='txtUnit' value='"+tdUnit.html()+"'/>"); 
	tdNature.html("<input type='text' id='txtNature' value='"+tdNature.html()+"'/>"); 
	tdButtons.html("<input type='button' value='&#10004;' class='btnSavevendor'/>"); 
	$(".btnSavevendor").bind("click", SaveVendor); 
	$(".btnEditvendor").bind("click", EditVendor); 
	$(".btnDeletevendor").bind("click", DeleteVendor);
}
 
function DeleteVendor(){
	var par = $(this).parent().parent(); //tr 
	par.remove(); 
}
	 
$(function(){ //Add, Save, Edit and Delete functions code 
	$(".btnEdit").bind("click", Edit);
	// $(".btnDelete").bind("click", Delete); 
	$("._addnewact").bind("click", Add); 
	$("._addnewvendor").bind("click", AddVendor); 
	$(".btnEditvendor").bind("click", EditVendor);
	// $(".btnDeletevendor").bind("click", DeleteVendor); 
});





