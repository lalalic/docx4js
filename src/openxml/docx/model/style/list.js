//<w:numbering><w:num w:numId="1">
export default class List extends require('../style'){
	constructor(wXml, wDoc, mParent){
		super(wXml, wDoc, mParent)
		this.id=this.name=this.constructor.asStyleId(wXml.attr('w:numId'))
		this.wDoc.style.set(this)
		this.levels=new Map()
	}
	
	_iterate(f, factories, visitors){
		for(var i=0,children=this.wXml.$('lvlOverride'),l=children.length, t; i<l; i++){
			t=new this.constructor.Level(children[i],this.wDoc, this)
			this.levels.set(t.level,t)
			t.parse(visitors)
		}
	}

	static get type(){return 'style.list'}

	getParentStyle(){
		var definition=this.wDoc.style.get(require('./numberingDefinition').asStyleId(this.wXml.$1('abstractNumId').attr('w:val')))
		if(definition.link){
			return this.wDoc.style.get(definition.link).asNumberingStyle().getParentStyle()
		}else
			return definition
	}
	
	getLabel(){
		return this.getParentStyle().getLabel(...arguments)
	}
	
	getNumId(){
		return this.wXml.attr('w:numId')
	}

	static asStyleId(numId){
		return '_list'+numId
	}
}
