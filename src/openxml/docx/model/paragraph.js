import Style from "./style/paragraph"
export default class paragraph extends require('../model'){
	getStyleId(a){
		return this._val('>pPr>pStyle')|| ((a=this.wDoc.style.getDefault(Style.type)) && a.id)
	}
	getNamedStyle(){
		return this.wDoc.style.get(this.getStyleId())
	}
	getDirectStyle(pr){
		if(pr=this.wXml.$1('>pPr'))
			return new Style.Properties(pr,this.wDoc,this)
	}
	_shouldIgnore(wXml){
		return wXml.localName=='pPr'
	}
	static get type(){return 'paragraph'}
}
