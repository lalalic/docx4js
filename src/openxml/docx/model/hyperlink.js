define(['../model'],function(Model){
	return Model.extend({

		getLink: function(a){
			return (a=this._attr('r:id')) ? this._getLocalLink(a): ('#'+this._attr('w:anchor') )
		},
		_getLocalLink: function(id){
			return this.wDoc.partMain.getRel(id)
		}
	},{type:'hyperlink'})
})
