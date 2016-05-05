import Style from './style/inline'

export default class inline extends require('../model'){
	getStyleId(a){
		return this._val('>rPr>rStyle') || ((a=this.wDoc.style.getDefault(Style.type)) && a.id)
	}
	getNamedStyle(){
		return this.wDoc.style.get(this.getStyleId()) 
	}
	getDirectStyle(pr){
		return (pr=this.wXml.$1('>rPr')) && new Style.Properties(pr,this.wDoc,this)
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
