$(function(){
$(".all_class").find("li").hover(function(){
				$(".all_class").find("dl").attr("class", "");
				$(".all_class").find("dl").css("display", "none");
				// $(this).attr("class", "active");
				$(".all_class").find("dl").eq($(this).index()).css("display", "block");
			});
				$("#nav_left").mouseover(function(){
					$(".all_class").css("display","block");

				})
				$("#nav_left").mouseout(function(){
					$(".all_class").css("display","none");
					
				})
})
