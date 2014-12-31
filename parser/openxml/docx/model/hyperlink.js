define(['../model'],function(Model){
	return Model.extend({
		type:'hyperlink',
		getLink: function(a){
			return (a=this._attr('r:id')) ? this._getLocalLink(a): ('#'+this._attr('w:anchor') )
		},
		_getLocalLink: function(id){
			
		}
	})
})