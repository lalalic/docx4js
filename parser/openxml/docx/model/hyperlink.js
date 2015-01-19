define(['../model'],function(Model){
	return Model.extend({
		type:'hyperlink',
		getLink: function(a){
      if (!a) {
        a=this._attr('r:id');
      }
      var ret = (a) ? this._getLocalLink(a): ('#'+this._attr('w:anchor') );
      return ret;
		},
		_getLocalLink: function(id){
      return this.wDoc.getRel(id);
		}
	})
})
