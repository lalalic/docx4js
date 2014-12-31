define(['./text'],function(Model){
	return Model.extend({
		type:'softHyphen',
		getText: function(){
			return String.fromCharCode(0xAD)
		}
	})
})