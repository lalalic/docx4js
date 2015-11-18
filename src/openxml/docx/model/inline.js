export default class inline extends require('../model'){
	getStyleId(){
		return this._val('>rPr>rStyle')
	}
	getNamedStyle(){
		return this.wDoc.style.get(this.getStyleId()) || this.wDoc.style.getDefault(Style.type)
	}
	getDirectStyle(pr){
		return (pr=this.wXml.$1('>rPr')) && new require('../style/inline').Properties(pr,this.wDoc,this)
	}
	_shouldIgnore(wXml){
		return wXml.localName=='rPr'
	}
	isWebHidden(){
		return this.wXml.$1('>rPr>webHidden')
	}
	isHidden(){
		return this.wXml.$1('>rPr>vanish')
	}
	static get type(){return 'inline'}
}
