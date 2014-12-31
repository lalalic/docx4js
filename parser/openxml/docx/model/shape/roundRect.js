define(['../shape'],function(Shape){
	return Shape.extend(function(){
		Shape.apply(this,arguments)
	},{
		type:'shape.roundRect'
	})
})