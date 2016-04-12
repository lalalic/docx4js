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

	static get type(){return 'document'}
}
