		function startMove(obj, json, func){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){

				var bStop = true; 

				//1.取出该属性的初值
				for(var attr in json){
					var iCur = 0;
					if(attr == "opacity"){
						iCur = parseFloat(getStyle(obj, attr)) * 100;
					}else{
						iCur = parseInt(getStyle(obj, attr))
					}
					var speed = (json[attr] - iCur) / 8;
					//8 缩放系数,缓冲运动效果最好的缩放系数
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					if(iCur != json[attr]){
						bStop = false;
					}
					if(attr == "opacity"){
						obj.style.filter = "alpha(opacity: " + (iCur + speed) + ")";
						obj.style.opacity = (iCur + speed) / 100;
					}else{
						obj.style[attr] = iCur + speed + "px";
					}
				}
				if(bStop){
					clearInterval(obj.timer);
					if(func){
						func();
					}
				}
			}, 30);
		}


		function getStyle(obj, attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj)[attr];
			}
		}