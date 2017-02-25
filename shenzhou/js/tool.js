
function $(vArg){
	//首先我们要判断首字母是否是#或者.
	switch(vArg[0]){
		case "#":
			//这是一个id
			var node = document.getElementById(vArg.substring(1, vArg.length));
			return node;
		case ".":
			//这是一个class,在这里注意我们的className是获取一堆节点
			var nodes = document.getElementsByClassName(vArg.substring(1, vArg.length));
			return nodes;
		default:
			//在这里判断是否有name=,如果有name=说明是获取byName
			var start = vArg.indexOf("name=");
			var nodes = null;
			if(start == -1){
				//说明是tagName
				nodes = document.getElementsByTagName(vArg);
			}else{
				nodes = document.getElementsByName(vArg.substring("name=".length, vArg.length));
			}
			return nodes;
			break;
	}
}


function randomColor(){
	var color = "rgba(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255)	+ "," + Math.round(Math.random() * 255) + ",1)";
	return color;
}

function getStyle(element, style){
	return element.currentStyle ? element.currentStyle[style] : getComputedStyle(element)[style];
}

function removeSpaceNode2(node){
	for(var i = 0; i < node.childNodes.length; i++){
		if(node.childNodes[i].nodeType == 3 && /^\s+$/.test(node.childNodes[i].nodeValue)){
			node.removeChild(node.childNodes[i]);
		}
	}
}


function removeSpaceNode1(nodes){
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
			//直接删除掉该空白节点
			nodes[i].parentNode.removeChild(nodes[i]);
		}
	}
}

		//剔除空白节点 传入所有的子节点进行处理
function removeSpaceNode(nodes){
	//将不是空白节点节点插入到新数组中
	var newArr = [];
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
			continue;
		}else{
			newArr.push(nodes[i]);
		}
	}
	//返回剔除掉空白节点的数组
	return newArr;
}

function insertAfter(newElement, oldElement){
	//如果oldElement不是最后一个节点,插入到oldElement的后一个节点之前
	//否则如果oldElement是最后一个节点,直接插入到当前节点列表的末尾
	var parentNode = oldElement.parentNode;
	if(oldElement == parentNode.lastChild){
		parentNode.appendChild(newElement);
	}else{
		parentNode.insertBefore(newElement, oldElement.nextSibling);
	}
}


function createNodeWithText(type, text){
	var node = document.createElement(type);
	//判断当前文本是否存在
	if(text){
		var textNode = document.createTextNode(text);
		node.appendChild(textNode);
	}
	return node;
}

//跨浏览器添加事件
function addEvent(obj, type, fn){
	if(obj.addEventListener){
		obj.addEventListener(type, fn, false);
	}else if(obj.attachEvent){
		//IE添加事件的方法
		obj.attachEvent("on" + type, fn);
	}
}

function removeEvent(obj, type, fn){
	if(obj.removeEventListener){
		obj.removeEventListener(type, fn);
	}else if(obj.detachEvent){
		obj.detachEvent("on" + type, fn);
	}
}


function preDef(evt){
	if(evt.preventDefault){
		evt.preventDefault();
	}else if(evt.returnValue){
		evt.returnValue = false;
	}
}

function getDate(n){
	var now = new Date();
	var day = now.getDate();
	now.setDate(day + n);
	return now;
}




function setCookie(name, value, expires, path, domain, isSecure){
	var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	//【注】后面的可选项,我们判断是否进行传值,如果已经传值,我们就设置这个属性,如果没有传值,或者传值为空,我们跳过这个属性
	if(expires){
		cookieText += ";expires=" + expires;
	}
	if(path){
		cookieText += ";path=" + path;
	}
	if(domain){
		cookieText += ";domain=" + domain;
	}
	if(isSecure){
		cookieText += ";secure";
	}
	document.cookie = cookieText;

}


function getCookie(name){
	var cookieText = decodeURIComponent(document.cookie);
	var start = cookieText.indexOf(name);
	//【注】我们必须判断该健左边为0或者为空格
	while(1){
		if(start == -1){ //如果最终结果找不到,跳出循环
				break;
		}
		if(!((start == 0 || start != 0 && cookieText[start - 1] == " ") && cookieText[start + name.length] == "=")){
			start = cookieText.indexOf(name, start + name.length);
		}else{
			break;
		}
	}
	if(start >= 0){
		var end = cookieText.indexOf(";" , start);
		if(end == -1){
			//最后一个 直接将结束位置赋值为字符串长度
			end = cookieText.length;
		}
	}else{
		return "找不到";
	}
	var str = cookieText.substring(start, end);
	//将键值对用=进行分割
	var arr = str.split("=");
	return arr[1];
}

function removeCookie(name){
	//删除cookie 我们可以通过将过期时间设置成过去的事件就行
	setCookie(name, "", new Date(0));
}


function $_cookie(name, value, obj){
	if(arguments.length == 1){
		//取值 getCookie
		var cookieText = decodeURIComponent(document.cookie);
		var start = cookieText.indexOf(name);
		//【注】我们必须判断该健左边为0或者为空格
		while(1){
			if(start == -1){ //如果最终结果找不到,跳出循环
					break;
			}
			if(!((start == 0 || start != 0 && cookieText[start - 1] == " ") && cookieText[start + name.length] == "=")){
				start = cookieText.indexOf(name, start + name.length);
			}else{
				break;
			}
		}
		if(start >= 0){
			var end = cookieText.indexOf(";" , start);
			if(end == -1){
				//最后一个 直接将结束位置赋值为字符串长度
				end = cookieText.length;
			}
		}else{
			return null;
		}
		var str = cookieText.substring(start, end);
		//将键值对用=进行分割
		var arr = str.split("=");
		return arr[1];
	}else if(arguments.length == 2 && value == null){
		//删除cookie
		document.cookie = encodeURIComponent(name) + "=;expires=" + new Date(0);
	}else{
		//设置cookie
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		if(obj){
			if(obj.expires){
				//默认传入天数,在内部,我们在转成日期
				cookieText += ";expires=" + getDate(obj.expires);
			}
			if(obj.path){
				cookieText += ";path=" + obj.path;
			}
			if(obj.domain){
				cookieText += ";domain=" + obj.domain;
			}
			if(obj.isSecure){
				cookieText += ";secure";
			}
			document.cookie = cookieText;
		}
	}
}


function drag(node){
	var setX = 0;
	var setY = 0; //记录相对位置
	node.onmousedown = function(even){
		//1、当鼠标按下的时候,记录一下鼠标按下位置和被拖拽控件的相对位置。
		var e = even || window.event;
		setX = e.clientX - node.offsetLeft;
		setY = e.clientY - node.offsetTop;
		document.onmousemove = function(even){
			var e = even || window.event;
			node.style.left = e.clientX - setX + "px";
			node.style.top = e.clientY - setY + "px";
		}
	}
	document.onmouseup = function(){
		document.onmousemove = null;
	}
}


//【注】针对于阻止事件冒泡我们也需要兼容性写法
function stopBubble(e){
	if(e.cancelBubble){
		e.cancelBubble = true;
	}else if(e.stopPropagation){
		e.stopPropagation();
	}
}








