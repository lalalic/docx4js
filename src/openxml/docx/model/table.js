import TableStyle from "./style/table"

export default class table extends require('../model'){
	getStyleId(a){
		return this._val('>tblPr>tblStyle') || ((a=this.wDoc.style.getDefault(TableStyle.type)) && a.id)
	}
	getNamedStyle(){
		return this.wDoc.style.get(this.getStyleId())
	}
	getDirectStyle(pr){
		return (pr=this.wXml.$1('>tblPr')) && new TableStyle.Properties(pr,this.wDoc,this)
	}
	getColWidth(){
		var widths=[], sum=0
		for(var cols=this.wXml.$('>tblGrid>gridCol'),len=cols.length,i=0,a;i<len;i++){
			widths.push(a=parseInt(cols[i].attr('w:w')))
			sum+=a
		}
		return {sum:sum, cols:widths};
	}
	_shouldIgnore(wXml){
		return wXml.localName=='tblPr'||wXml.localName=='tblGrid'
	}
	static get type(){return 'table'}
	
	static Context=class{
		
	}
}
