$(function(){
		$.ajax({
			url:'../json/shop.json',
			type:'GET',
			success:function(res){
				var html = '';
				var div1 = "";
				var div2 = "";
				var div3 = "";
				var div4 = "";
				var div5 = "";
				var div6 = "";
				var div7 = "";
				alert(res.shangpin.length)
				for(var i = 0 ; i < res.shangpin.length; i ++){
					html += '<li><a href = ""><img src="'+res.shangpin[i].img+'"</a><a href="">'+res.shangpin[i].peizhi+'<a><p>'+res.shangpin[i].xinghao+'</p><h3>'+res.shangpin[i].jiage+'</h3><table><tr><td ><span class="sc_btn" id="'+res.shangpin[i].id+'">&ensp;&ensp;加入购物车</span></td><td>'+res.shangpin[i].pinglun+'<td></tr></table></li>';

				}
				for(var i = 0 ; i <　res.xilie.length;i++){
					div1 += '<a href = "">'+res.xilie[i].a+'</a>'
				}
				for(var i = 0 ; i <　res.pingmu.length;i++){
					div2 += '<a href = "">'+res.pingmu[i].a+'</a>'
				}
				for(var i = 0 ; i <　res.redian.length;i++){
					div3 += '<a href = "">'+res.redian[i].a+'</a>'
				}
				for(var i = 0 ; i <　res.cpu.length;i++){
					div4 += '<a href = "">'+res.cpu[i].a+'</a>'
				}
				for(var i = 0 ; i <　res.xianka.length;i++){
					div5 += '<a href = "">'+res.xianka[i].a+'</a>'
				}
				for(var i = 0 ; i <　res.fenbianlv.length;i++){
					div6 += '<a href = "">'+res.fenbianlv[i].a+'</a>'
				}
				for(var i = 0 ; i <　res.jiage.length;i++){
					div7 += '<a href = "">'+res.jiage[i].a+'</a>'
				}
				$('.goods_box ul').html(html);
				$('.one').html(div1);
				$('.two').html(div2);
				$('.three').html(div3);
				$('.four').html(div4);
				$('.five').html(div5);
				$('.six').html(div6);
				$('.seven').html(div7);
			}
		})


		$(".goods_box ul").on("click", ".sc_btn", function(){
			var id = this.id;
			var first = $.cookie("goods") == null ? true : false;
			var same = false; 
			if(first){
				$.cookie("goods", '[{"id":' + id + ',"num":1}]');
			}else{
				var str = $.cookie("goods");
				var arr = JSON.parse(str);
				for(var i in arr){
					if(arr[i].id == id){
						arr[i].num++; 
						var cookieStr = JSON.stringify(arr);
						alert("已添加到购物车");
						$.cookie("goods", cookieStr);
						same = true;
					}
				}
				if(!same){
					var obj = {
						id: id,
						num: 1
					}
					arr.push(obj);
					var cookieStr = JSON.stringify(arr);
					alert("已添加到购物车");
					$.cookie("goods", cookieStr);
				}
			}
			sc_car();
		})
		function sc_car(){
			var sc_str = $.cookie("goods");
			if(sc_str){
				var sc_arr = JSON.parse(sc_str);
				var sc_num = 0;
				for(var i in sc_arr){
					sc_num += Number(sc_arr[i].num);
				}
				$("#logo_shop span").html(sc_num);
			}
		}
		function sc_msg(){
			$.ajax({
				url: "data.json",
				type: "GET",
				success: function(res){
					var sc_str = $.cookie("goods");
					if(sc_str){
						var sc_arr = JSON.parse(sc_str);
						var sc_num = 0;
						var html = "";
						for(var i in sc_arr){
							html += '<li><div class="sc_goodsPic"><img src="'+res[sc_arr[i].id].img+'" alt=""></div><div class="sc_goodsTitle"><p>这是商品曲奇饼干</p></div><div class="sc_goodsBtn" id="'+sc_arr[i].id+'">购买</div><div class="sc_goodsNum">商品数量:'+sc_arr[i].num+'</div></li>';
						}
						$(".sc_right ul").html(html);
					}
				}
			})
		}


	})