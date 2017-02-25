$(function(){
	
	function sc_msg(){
		$.ajax({
			url: "../json/car.json",
			type: "GET",
			success: function(res){
				var sc_str = $.cookie("goods");
				if(sc_str){
					var sc_arr = JSON.parse(sc_str);
					var sc_num = 0;
					var html = "";
					for(var i in sc_arr){
						html += '<li><div class="sc_goodsPic"><img src="'+res[sc_arr[i].id].img+'" alt=""></div><p>'+res[sc_arr[i].id].xinghao+'</p><p> ￥'+res[sc_arr[i].id].jiage+'</p><p>商品数量: '+sc_arr[i].num+'</p><p>商品总价:'+(sc_arr[i].num)*(res[sc_arr[i].id].jiage)+'</p><p><input type="button" class="del" value="删除"></p></li>';
					}
					$("#main ul").html(html);
				}
			}
		})
	}
	
		sc_msg()
		
})