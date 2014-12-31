define(['../model'],function(Model){
	return Model.extend({
		type:'document',
		_getValidChildren: function(){
			var children=[this.wDoc.getPart('styles').root,this.wXml.$1('body')]
			var numbering=this.wDoc.getPart('numbering')
			if(numbering)
				children.splice(1,0,numbering.root)
			return children
		}
	})
})