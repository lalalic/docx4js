import Style from "./style/list"

export default class list extends require('./paragraph'){
	getLevel(numPr,t){
		return (t=this.wXml.$1('>pPr>numPr>ilvl')) ? t.attr('w:val') : '0'
	}
	getNumberingStyle(t){
		var numId=(t=this.wXml.$1('>pPr>numPr')) && (t=t.$1('numId')) && (t=t.attr('w:val'))
		!numId && (t=this.getNamedStyle()) && (numId=t.getNumId())
		return this.wDoc.style.get(Style.asStyleId(numId))
	}
	static get type(){return 'list'}
}
