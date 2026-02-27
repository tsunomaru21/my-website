$(function(){
	$("#title").css("color","blue")
});	

$(function(){
	$(".clear").click(function(){
		$("li:hidden").show();
	});	
});

$(function(){
	$(".simokitazawa1").click(function(){
		$("li").not(".simokitazawa").hide()
	});
});		

$(function(){
	$(".tyouhu1").click(function(){
		$("li").not(".tyouhu").hide()
	});
});		

$(function(){
	$(".shinnjuku1").click(function(){
		$("li").not(".shinnjuku").hide()
	});
});		

$(function(){
	$(".tokyo1").click(function(){
		$("li").not(".tokyo").hide()
	});
});		
