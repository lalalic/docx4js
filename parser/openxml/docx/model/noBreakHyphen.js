define(['./text'],function(Model){
	return Model.extend({
		type:'noBreakHyphen',
		getText: function(){
			return String.fromCharCode(0x2011)
		}
	})
})