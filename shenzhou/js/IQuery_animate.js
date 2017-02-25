$().extend({
	animate: function(json, func){
		for(var i = 0; i < this.elements.length; i++){
			startMove(this.elements[i], json, func);
		}
	}
});


