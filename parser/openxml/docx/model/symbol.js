define(['./text'],function(Model){
	return Model.extend({
		type:'symbol',
		getText: function(){
			return String.fromCharCode(ParseInt('0x'+this._attr('w:char')))	
		},
		getFont: function(){
			return this._attr('w:font')
		}
	})
})