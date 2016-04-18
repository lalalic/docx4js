import Style from './style/inline'

export default class Document extends require('../model'){
	parse(){
		var visitors=super.parse(...arguments)
		visitors.forEach((a)=>a.props=this.wDoc.props)
		return visitors
	}
	_getValidChildren(){
		var children=[this.wDoc.getPart('styles').documentElement,this.wXml.$1('body')]
		var numbering=this.wDoc.getPart('word/numbering.xml')
		if(numbering)
			children.splice(1,0,numbering.documentElement)
		return children
	}
	
	/**
	* return color string, or
	* WeakMap:{bwmode,fillcolor,targetscreesize,color2,angle,focus,type}
	*/
	getBackgroundStyle(){
		var pr=this.wXml.$1('>background')
		var stylePr=new Style.Properties(pr,this.wDoc,this)
		if(pr){
			let fill=this.wXml.$1('fill')
			if(fill){
				let attr=new WeakMap()
				fill.attributes.forEach(a=>attr.set(a.localName,a.value))
				fill.parentNode.attributes.forEach(a=>attr.set(a.localName,a.value))
				if(attr.has('fillcolor'))
					attr.fillcolor=stylePr.asColor(attr.get('fillcolor'))
				if(attr.has('color2'))
					attr.color2=stylePr.asColor(attr.get('color2'))
				
				return attr
			}else{
				return stylePr.color(pr)
			}
		}
	}

	static get type(){return 'document'}
}

