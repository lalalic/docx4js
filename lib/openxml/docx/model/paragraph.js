import Style from "./style/paragraph"
export default class paragraph extends require('../model'){
	getStyleId(a){
		return this._val('>pPr>pStyle')
	}
	getNamedStyle(){
		return this.wDoc.style.get(this.getStyleId()) || this.wDoc.style.getDefault(Style.type)
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
