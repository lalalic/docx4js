import TableStyle from "./style/table"



export default class table extends require('../model'){
	parse(){
		this.wDoc.parseContext.table.push(this)
		super.parse(...arguments)
		this.wDoc.parseContext.table.pop(this)
	}
	
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
		let asPt=TableStyle.Properties.prototype.asPt
		let pt2Px=TableStyle.Properties.prototype.pt2Px
		var widths=[], sum=0
		for(var cols=this.wXml.$('>tblGrid>gridCol'),len=cols.length,i=0,a;i<len;i++){
			widths.push(a=pt2Px(asPt(cols[i].attr('w:w'))))
			sum+=a
		}
		return {sum:sum, cols:widths};
	}
	_shouldIgnore(wXml){
		return wXml.localName=='tblPr'||wXml.localName=='tblGrid'
	}
	static get type(){return 'table'}
	
	static Context=class{
		constructor(doc){
			this.wDoc=doc
			this._stack=[]
			this._current=null
		}
		
		push(table){
			this._stack.push(this._current=new TableContext(table))
		}
		
		pushRow(row){
			this._current.pushRow(row)
		}
		
		pushCell(cell){
			this._current.pushCell(cell)
		}
		
		pop(){
			this._stack.pop()
		}
		
		popRow(){
			this._current.popRow()
		}
		
		popCell(){
			this._current.popCell()
		}
		
		isFirstRow(){
			return this._current.isFirstRow()
		}
		
		isLastRow(){
			return this._current.isLastRow()
		}
		
		isFirstCol(){
			return this._current.isFirstCol()
		}
		
		isLastCol(){
			return this._current.isLastCol()
		}
	}
}

class TableContext{
	constructor(converter){
		this.rows=converter.wXml.$('tr').length//@todo:nested table not work
		this.cols=converter.wXml.$('>tblGrid>gridCol').length
		this.currentRow=0
		this.currentCell=0
	}
	pushRow(row){
		this.currentRow++
	}
	
	pushCell(cell){
		this.currentCell++
	}
	
	popRow(row){
		this.currentCell=0
	}
	
	popCell(cell){
		
	}
	
	isFirstRow(){
		return this.currentRow==1
	}
	
	isLastRow(){
		return this.currentRow==this.rows
	}
	
	isFirstCol(){
		return this.currentCell==1
	}
	
	isLastCol(){
		return this.currentCell==this.cols
	}
}
