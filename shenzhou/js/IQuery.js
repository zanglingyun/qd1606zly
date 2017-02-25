function IQuery(vArg){

	//保存选中的元素  这个数组用保存选中的元素节点的
	this.elements = [];
	switch(typeof vArg){
		case "function": //window.onload
			//window.onload = vArg;
			addEvent(window, "load", vArg);
			break;
		case "string": //选择元素
			switch(vArg.charAt(0)){
				case "#": //ID
					var obj = document.getElementById(vArg.substring(1));
					this.elements.push(obj);
					break;
				case ".": //class
					//var nodes = document.getElementsByClassName()
					this.elements = getByClass(document, vArg.substring(1));
					break;

				default: //tagName
					this.elements = document.getElementsByTagName(vArg);
					break;

			}
			break;
		case "object": //this document window
			this.elements.push(vArg);
			break;
		default:
			break;
	}
}



IQuery.prototype.click = function(func){
	//被选中所有的元素都有了
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i], "click", func);
	}
	return this;
}

IQuery.prototype.mouseover = function(func){
	//被选中所有的元素都有了
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i], "mouseover", func);
	}
	return this;
}

/*
	mouseover
	mouseout  attr
	...
*/


IQuery.prototype.css = function(attr, value){
	//取值赋值一体化  传参的个数
	if(arguments.length == 2){ //设置样式
		for(var i = 0; i < this.elements.length; i++){
			this.elements[i].style[attr] = value;
		}
	}else{ 
		if(typeof attr == "string"){
			//获取样式
			//获取样式的时候,只获取第一个节点的样式
			return getStyle(this.elements[0], attr);
		}else if(typeof attr == "object"){
			for(var i = 0; i < this.elements.length; i++){
				//将所有的json对象里面的样式都去设置一遍
				for(var key in attr){
					this.elements[i].style[key] = attr[key];
				}
			}
		}

	}
	return this;
}
IQuery.prototype.attr = function(attr, value){
	//取值赋值一体化, 传参个数
	if(arguments.length == 2){ //设置属性
		for(var i = 0; i < this.elements.length; i++){
			this.elements[i][attr] = value;
		}
	}else{
		return this.elements[0][attr];
	}
	return this;
}





IQuery.prototype.show = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "block";
	}
	return this;
}

IQuery.prototype.hide = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "none";
	}
	return this;
}


//hover
/*
$().hover(function(){
	//mouseover
}, function(){
	//mouseout
})
	

*/

IQuery.prototype.hover = function(fnOver, fnOut){
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i], "mouseover", fnOver);
		addEvent(this.elements[i], "mouseout", fnOut);
	}
	return this;
}






function $(vArg){
	return new IQuery(vArg);
}


function addEvent(obj, type, func){
	if(obj.addEventListener){

		//【注】想办法接收的函数调用的返回值false
		obj.addEventListener(type, function(ev){
			if(false == func.call(obj)){
				//想要阻止事件冒泡
				//并且阻止默认事件
				ev.cancelBubble = true;
				ev.preventDefault();
			}
		}, false);
	}else if(obj.attachEvent){
		//IE  this传递不成功
		obj.attachEvent("on" + type, function(){
			 //将obj通过call方法传入,那么this的指向就不会出现问题。
			 if(false == func.call(obj)){
			 	window.event.stopPropagation();
			 	window.event.returnValue = false;
			 }
		});
	}
}




function getByClass(oParent, sClass){
	var aEle = oParent.getElementsByTagName("*");
	var aResult = []; //class符合条件的节点
	for(var i = 0; i < aEle.length; i++){
		if(aEle[i].className == sClass){
			aResult.push(aEle[i]);
		}
	}
	return aResult; 
}

//当前有效的样式
function getStyle(element, style){
	if(element.currentStyle){
		return element.currentStyle[style];
	}else{
		return getComputedStyle(element)[style];
	}
}


/*IQuery.prototype.toggle = function(){
	for(var i = 0; i < this.elements.length; i++){
		addToggle(this.elements[i]);
	}
	function addToggle(obj){
		var count = 0;
		addEvent(obj, "click", function(){
			alert(count++);
		})
	}
}*/

IQuery.prototype.toggle = function(){
	//arguments  [fn1, fn2, fn3]     count++ % arguments.length
	//arguments 和 this一样 只属于当前函数
	var _arguments = arguments;

	for(var i = 0; i < this.elements.length; i++){
		addToggle(this.elements[i]);
	}
	function addToggle(obj){
		var count = 0;
		addEvent(obj, "click", function(){
			_arguments[count++ % _arguments.length].call(obj);
		})
	}
	return this;
}



IQuery.prototype.eq = function(n){
	// this.elements[n];
	return $(this.elements[n]); //new IQuery();
}


function getIndex(obj){
	//1、找到所有的兄弟节点
	var aBrother = obj.parentNode.children;
	for(var i = 0; i < aBrother.length; i++){
		if(aBrother[i] == obj){
			return i;
		}
	}
}

IQuery.prototype.index = function(){
	return getIndex(this.elements[0]);
}


IQuery.prototype.find = function(str){
	var aResult = []; //这个装符合条件的元素
	for(var i = 0; i < this.elements.length; i++){
		switch(str.charAt(0)){
			case ".": //class
				var aEle = getByClass(this.elements[i], str.substring(1));
				aResult = aResult.concat(aEle);
				break;
			default: //标签
				//将伪数组转成数组
				var aEle = Array.from(this.elements[i].getElementsByTagName(str));
				aResult = aResult.concat(aEle);
				break;
		}
	}
	//aResult
	//必须返回一个IQuery对象才能调用后续IQuery的函数。
	var obj = new IQuery();
	obj.elements = aResult;
	return obj;
}


/*

	$.extend
	$.fn.extend   插件方法

	IQuery  添加extend
*/

IQuery.prototype.extend = function(json){
	//在不修改IQuery库的基础上,拓展IQuery库
	for(var key in json){
		IQuery.prototype[key] = json[key];
	}
}





































