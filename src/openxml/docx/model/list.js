import Style from "./style/list"

/**
* numbering style is a normal paragraph style, plus
* numId Style with override/direct level style, 
* which inherit from abstract numbering definition
* rPr, and attribute of level style is on label only
* pPr of level style is on paragraph
list label: numId.level + abstract.level
list content: numId.level.pPr + abstract.level.pPr
priority: list style > p direct style >named style 
*/
export default class list extends require('./paragraph'){
	constructor(){
		super(...arguments)
		
		let numId=(t=>{
			var numId=(t=this.wXml.$1('>pPr>numPr')) && (t=t.$1('numId')) && (t=t.attr('w:val'))
			!numId && (t=this.getNamedStyle()) && (numId=t.getNumId())
			return numId
		})();
		
		let level=(t=>{
			return (t=this.wXml.$1('>pPr>numPr>ilvl')) ? t.attr('w:val') : '0'
		})();
		
		this.getLevel=()=>level
		
		this.getNumberingId=()=>numId
	}
	parse(){
		let {numbering}=this.wDoc.parseContext
		numbering.push(this.getNumberingId(), parseInt(this.getLevel()))
		super.parse(...arguments)
	}
	
	getNumberingStyle(){
		return this.wDoc.style.get(Style.asStyleId(this.getNumberingId()))
	}

	getLabel(){
		return this.wDoc.parseContext.numbering.getLabel(this.getNumberingId(), parseInt(this.getLevel()))
	}
	
	static get type(){return 'list'}
	
	static Context=class {
		constructor(doc){
			this.wDoc=doc
			this._stack=new Map()
		}
		push(id,level){
			let list
			if(!(list=this._stack.get(id)))
				this._stack.set(id,list=new Map())
			
			list.set(level,1+(list.get(level)||0))
		}
		
		getLabel(id,level){
			var ctx=this._stack.get(id)
			return this.wDoc.style.get(Style.asStyleId(id)).getLabel(...ctx)
		}
	}
}