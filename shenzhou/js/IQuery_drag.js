

$().extend({
	drag: function(){
		//让没一个选中的函数都拥有拖拽
		for(var i = 0; i < this.elements.length; i++){
			drag(this.elements[i]);
		}
	}
})



function drag(oDiv){
	oDiv.onmousedown = function(ev){
		var oEvent = ev || window.event;
		var disX = oEvent.clientX - oDiv.offsetLeft;
		var disY = oEvent.clientY - oDiv.offsetTop;

		document.onmousemove = function(ev){
			var oEvent = ev || window.event;
			oDiv.style.left = oEvent.clientX - disX + "px";
			oDiv.style.top = oEvent.clientY - disY + "px";
		}

		document.onmouseup = function(){
			document.onmousemove = null;
		}
	}
}