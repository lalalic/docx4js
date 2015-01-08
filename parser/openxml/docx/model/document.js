define(['../model'],function(Super){
	return Super.extend({
		type:'document',
		parse: function(){
			var visitors=Super.prototype.parse.apply(this,arguments)
			visitors.forEach(function(a){
				a.props=this.wDoc.props
			}.bind(this))
			return visitors
		},
		_getValidChildren: function(){
			var children=[this.wDoc.getPart('styles').documentElement,this.wXml.$1('body')]
			var numbering=this.wDoc.getPart('numbering')
			if(numbering)
				children.splice(1,0,numbering.documentElement)
			return children
		}
	})
})