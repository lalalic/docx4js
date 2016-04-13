export default class model extends require('../parser'){
	constructor(wXml,wDoc,mParent){
		super(...arguments)
		this.mParent=mParent
		this.content=[]
		if(mParent)
			mParent.content.push(this)
		this.type=this.constructor.type
	}
	parse(visitFactories){
		var visitors=[]
		var paramizedVisitFactories=[];
		$.map(visitFactories, function(visitFactory){
			var visitor=visitFactory(this)
			if(visitor && visitor.visit()!==false){
				visitors.push(visitor)
				paramizedVisitFactories.push(visitFactory.with(visitor))
			}
		}.bind(this));

		if(visitors.length>0){
			let factory=this.wDoc.factory.bind(this.wDoc)
			this._iterate(
				(wXml)=>factory(wXml,this.wDoc,this).parse(paramizedVisitFactories)
				,paramizedVisitFactories, visitors)
		}

		return visitors
	}
	_iterate(f,paramizedVisitFactories){
		for(var i=0,children=this._getValidChildren(),l=children?children.length:0; i<l; i++)
			(!this._shouldIgnore(children[i])) && f(children[i])
	}
	_getValidChildren(){
		return this.wXml.childNodes
	}
	_shouldIgnore(wXml){
		return false
	}
	_attr(selector, key){
		var n=arguments.length==1 ? (key=selector, this.wXml) : this.wXml.$1(selector)
		return n ? n.attr(key) : null
	}
	_val(selector){
		return this._attr(selector,'w:val')
	}

}
