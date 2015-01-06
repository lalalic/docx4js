define(['require','../model','./header','./footer','./style/section'], function(require,Model,Header,Footer,Style){
	var empty=[]
	return Model.extend(function(wXml, wDoc, mParent){
		this.wFirst=mParent.content.length ? mParent.content[mParent.content.length-1].wLast.nextSibling : mParent.wXml.firstChild
		
		this.wLast=wXml
		while(this.wLast.parentNode!=mParent.wXml)
			this.wLast=this.wLast.parentNode
		if(this.wLast==wXml)
			this.wLast=wXml.previousSibling

		Model.apply(this,arguments)
		wDoc.parseContext.section.current=this
	},{
		type:'section',
		_iterate: function(f, visitorFactories){
			this._iterateHeaderFooter(visitorFactories,'header')
			var current=this.wFirst
			do{
				f(current)
				current=current==this.wLast ? null : current.nextSibling
			}while(current)
			this._iterateHeaderFooter(visitorFactories,'footer')
		},
		_iterateHeaderFooter: function(visitorFactories,refType){
			for(var refs=this.wXml.$(refType+'Reference'),i=0,len=refs.length;i<len;i++){
				var part=this.wDoc.parseContext.part.current=this.wDoc.getRel(refs[i].attr('r:id'))
				var model=new (require('./'+refType))(part.documentElement, this.wDoc, this, refs[i].attr('w:type'))
				model.parse(visitorFactories)
				this.wDoc.parseContext.part.current=this.wDoc.partMain
			}
		},
		getDirectStyle: function(){
			return new Style(this.wXml,this.wDoc, this)
		}
	})
})