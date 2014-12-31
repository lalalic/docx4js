define(['./text'],function(Model){
	return Model.extend({
		type:'tab',
		getText: function(){
			return String.fromCharCode(0x9)
		}
	})
})