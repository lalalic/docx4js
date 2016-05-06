import Style from '../style'
import Paragraph from './paragraph'
import Inline from './inline'

export default class Table extends Style{
	parse(factories){
		super.parse(...arguments)

		var TableStyle=this.constructor
		for(var styles=this.wXml.$('tblStylePr'), len=styles.length, i=0;i<len;i++){
			var model=new TableStyle(styles[i],this.wDoc,this)
			model.id=this.id
			model.parse(factories)
		}
	}
	_iterate(f, factories, visitors){
		var pr=null;
		(pr=this.wXml.$1('>tblPr:not(:empty)')) && new this.constructor.Properties(pr,this.wDoc,this).parse(visitors);
		(pr=this.wXml.$1('>trPr:not(:empty)')) && new this.constructor.RowProperties(pr,this.wDoc,this).parse(visitors);
		(pr=this.wXml.$1('>tcPr:not(:empty)')) && new this.constructor.CellProperties(pr,this.wDoc,this).parse(visitors);
		(pr=this.wXml.$1('>pPr:not(:empty)')) && new Paragraph.Properties(pr,this.wDoc,this).parse(visitors);
		(pr=this.wXml.$1('>rPr:not(:empty)')) && new Inline.Properties(pr,this.wDoc,this).parse(visitors);
	}
	getTarget(){
		return this.wXml.attr('w:type')
	}

	static get type(){return 'style.table'}
}

Table.Properties=class Properties extends Style.Properties{
	tblBorders(x){
		var value={};
		for(var borders=x.childNodes,border,i=0,len=borders.length;i<len;i++){
			if(borders[i].nodeType!==1) continue
			border=value[(border=borders[i]).localName]=this.asObject(border)
			border.sz && (border.sz=border.sz/8);
			border.color && (border.color=this.asColor(border.color))
		}
		return value
	}
	tblCellMar(x){
		var value={};
		for(var borders=x.childNodes,i=0,len=borders.length,v;i<len;i++)
			borders[i].nodeType==1 && (value[borders[i].localName]=parseInt(borders[i].attr('w:w'))/20)
		return value
	}
	tblLook(x){
		return this.asObject(x,function(x){return parseInt(x)})
	}
	tblStyleRowBandSize(x){
		return parseInt(x.attr('w:val'))
	}
	tblStyleColBandSize(x){
		return parseInt(x.attr('w:val'))
	}
	tblW(x){
		switch(x.attr('w:type')){
		case 'pct':
			return parseInt(x.attr('w:w'))*2/100+'%'
		case 'auto':
			return 'auto'
		default:
			this.asPt(x.attr('w:w'))+'pt'
		}
	}
	tblInd(x){
		return this.asPt(x.attr('w:w'))
	}
	static get type(){return 'table'}
}

Table.RowProperties=class RowProperties extends Style.Properties{
	cnfStyle(x){
		return x.attr('w:val')
	}
	static get type(){return 'row'}
}

Table.CellProperties=class CellProperties extends Style.Properties{
	tcBorders(x){
		var value={};
		for(var borders=x.childNodes,border,i=0,len=borders.length;i<len;i++){
			if(borders[i].nodeType!==1) continue
			border=value[(border=borders[i]).localName]=this.asObject(border)
			border.sz && (border.sz=border.sz/8);
			border.color && (border.color=this.asColor(border.color))
		}
		return value
	}
	shd(x){
		return this.asColor(x.attr('w:fill'))
	}
	cnfStyle(x){
		return x.attr('w:val')
	}
	gridSpan(x){
		return x.attr('w:val')
	}
	static get type(){return 'cell'}
}
