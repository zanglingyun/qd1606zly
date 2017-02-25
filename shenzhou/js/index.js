$(function(){
			$.ajax({
			url:'json/index.json',
			type:'GET',
			success:function(res){
				var html = '';
				var star_top = "";
				var star_bottom = "";
				var shop4 = "";
				var navA = "";
				var navB = "";
				var navC = "";
				var navD = "";
				var navE = "";
				var navF = "";
				var navG = "";
				for(var i = 0 ; i < res.links.length; i ++){
					html += '<li><img src="'+res.links[i].img+'"><li>'

				};
				for(var i = 0 ; i < res.star.length; i ++){
					star_top += '<li><a ><img src="'+res.star[i].img+'"><div><h3>'+res.star[i].xinghao+'</h3><p>'+res.star[i].peizhi+'</p><p>商城价:<span>'+res.star[i].jiage+'</span></p></div></a></li>'

				};
				for(var i = 0 ; i < res.star_bottom.length; i ++){
					star_bottom += '<li><a href="#"><div><h3>'+res.star_bottom[i].xinghao+'</h3><p>'+res.star_bottom[i].peizhi+'</p><p><span>'+res.star_bottom[i].jiage+'</span></p></div><img src="'+res.star_bottom[i].img+'"></a></li>'

				};
				for(var i = 0 ; i < res.shop4.length; i ++){
					shop4 += '<li><a href="#"><div><h3>'+res.shop4[i].xinghao+'</h3><p>'+res.shop4[i].peizhi+'</p><p><span>'+res.shop4[i].jiage+'</span></p></div><img src="'+res.shop4[i].img+'"></a></li>'

				};
				for(var i=0 ; i< res.nav1.length;i++){
					navA += '<dd><a href="#"><img src="'+res.nav1[i].img+'"></a><h2>'+res.nav1[i].biaoti+'</h2><h3>'+res.nav1[i].leibie+'</h3>'+res.nav1[i].xinghao+'</dd>'
				};
				for(var i=0 ; i< res.nav2.length;i++){
					navB += '<dd><a href="#"><img src="'+res.nav2[i].img+'"></a><h2>'+res.nav2[i].biaoti+'</h2><h3>'+res.nav2[i].leibie+'</h3>'+res.nav2[i].xinghao+'</dd>'
				};
				for(var i=0 ; i< res.nav3.length;i++){
					navC += '<dd><a href="#"><img src="'+res.nav3[i].img+'"></a><h2>'+res.nav3[i].biaoti+'</h2><h3>'+res.nav3[i].leibie+'</h3>'+res.nav3[i].xinghao+'</dd>'
				};
				for(var i=0 ; i< res.nav4.length;i++){
					navD += '<dd><a href="#"><img src="'+res.nav4[i].img+'"></a><h2>'+res.nav4[i].biaoti+'</h2><h3>'+res.nav4[i].leibie+'</h3>'+res.nav4[i].xinghao+'</dd>'
				};
				for(var i=0 ; i< res.nav5.length;i++){
					navE += '<dd><a href="#"><img src="'+res.nav5[i].img+'"></a><h2>'+res.nav5[i].biaoti+'</h2><h3>'+res.nav5[i].leibie+'</h3>'+res.nav5[i].xinghao+'</dd>'
				};
				for(var i=0 ; i< res.nav6.length;i++){
					navF += '<dd><a href="#"><img src="'+res.nav6[i].img+'"></a><h2>'+res.nav6[i].biaoti+'</h2><h3>'+res.nav6[i].leibie+'</h3>'+res.nav6[i].xinghao+'</dd>'
				};
				for(var i=0 ; i< res.nav7.length;i++){
					navG += '<dd><a href="#"><img src="'+res.nav7[i].img+'"></a><h2>'+res.nav7[i].biaoti+'</h2><h3>'+res.nav7[i].leibie+'</h3>'+res.nav7[i].xinghao+'</dd>'
				};
				$('.idx_top ul').html(html);
				$('.star_top').html(star_top);
				$('.star_bottom').html(star_bottom);
				$('.shop4 ul').html(shop4);
				$('.nav1').html(navA);
				$('.nav2').html(navB);
				$('.nav3').html(navC);
				$('.nav4').html(navD);
				$('.nav5').html(navE);
				$('.nav6').html(navF);
				$('.nav7').html(navG);
			}
		})
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

			var oBtn = $("#play").find("ol").find("li");
			var oUl = $("#play").find("ul");
			var aLi = oUl.find("li");
			
			//当前被选中的按钮的下标
			var iNow = 0;
			//定时器
			var timer = null; 
			oBtn.click(function(){
				iNow = $(this).index();
				tab();
			});

			$("#play").hover(function(){
				clearInterval(timer);
			}, function(){
				timer = setInterval(timerInner, 3000);
			})

			timer = setInterval(timerInner, 3000);

			function timerInner(){
				iNow++;
				tab();
			}

			//切换图片的函数
			function tab(){
				oBtn.attr("class", "");
				oBtn.eq(iNow).attr("class", "active");
				//判断是否到最后一张
				if(iNow == aLi.size() - 1){
					oBtn.eq(0).attr("class", "active");
				}
				oUl.animate({left: -1300* iNow}, function(){
					//当最后一张图片动画执行完成以后,我切回第一张
					console.log(iNow);
					if(iNow == aLi.size() - 1){
						iNow = 0;
						oUl.css("left", "0px");
					}
				});
			}
		})

		$().extend({size: function(){
			return this.elements.length;
		}})
				