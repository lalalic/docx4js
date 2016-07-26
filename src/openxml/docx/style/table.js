import Style from "./base"

import {getable} from "../../../xmlObject"


/**
 * conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 * The conditional formats are applied in the following order:
	>Whole table/table
	>Banded columns/band1Vert , even column banding/band2Vert
	>Banded rows/band1Horz , even row banding/band2Horz
	>First row/firstRow , last row/lastRow
	>First column/firstCol, last column/lastCol
	>Top left/nwCell, top right/neCell, bottom left/swCell, bottom right/seCell
 */
let PRIORIZED='seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert'.split(',')

class WithBorder extends Style{

	_1border(type){
		let value=this.raw.get(type,false)
		if(value!=undefined){
			if(value.val=='nil')
				return {sz:0}
			return value
		}

		return undefined
	}

	_right(conditions){
		return this._1border('tcPr.tcBorders.right')
	}

	_left(conditions){
		return this._1border('tcPr.tcBorders.left')
	}

	_top(){
		return this._1border('tcPr.tcBorders.top')
	}

	_bottom(){
		return this._1border('tcPr.tcBorders.bottom')
	}
}

class RowStyle extends WithBorder{
	_right(conditions,edges){
		let value
		if(conditions.includes('lastCol') || edges.includes('lastCol'))
			value=super._right(...arguments)
		else
			value=this._1border('tcPr.tcBorders.insideV')

		return value
	}

	_left(conditions,edges){
		let value
		if(conditions.includes('firstCol') || edges.includes('firstCol'))
			value=super._right(...arguments)
		else
			value=this._1border('tcPr.tcBorders.insideV')

		return value
	}
}

class CellStyle extends WithBorder{

}

class ColStyle extends WithBorder{
	_top(conditions,edges){
		if(conditions.includes('firstRow') || edges.includes('firstRow'))
			return super._top(...arguments)
	}

	_bottom(conditions,edges){
		if(conditions.includes('lastRow') || edges.includes('lastRow'))
			return super._bottom(...arguments)
	}
}


class BandHStyle extends RowStyle{

}
class BandVStyle extends ColStyle{

}


let types={}
types.seCell=CellStyle
types.swCell=CellStyle
types.neCell=CellStyle
types.nwCell=CellStyle
types.lastCol=ColStyle
types.firstCol=ColStyle
types.lastRow=RowStyle
types.firstRow=RowStyle
types.band2Horz=BandHStyle
types.band1Horz=BandHStyle
types.band2Vert=BandVStyle
types.band1Vert=BandVStyle
types.row=RowStyle
types.cell=CellStyle

export default class TableStyle extends WithBorder{
	constructor(style,styles,basedOn){
		super(...arguments)

		;(this.raw.get('tblStylePr')||[]).forEach(a=>{
			a=getable(a)
			let type=a.get('$.type')
			this[type]=new types[type](a)
		})
	}

	getBorder(conditions, edges){
		return {
			right:this._right(...arguments)||{sz:0},
			left: this._left(...arguments)||{sz:0},
			top: this._top(...arguments)||{sz:0},
			bottom: this._bottom(...arguments)||{sz:0}
		}
	}

	get(path, conditions=[]){
		let value=this.priorize(conditions).reduce((found, condition)=>{
			if(found!=undefined)
				return found
			let conditionStyle=this[condition]
			if(conditionStyle)
				return conditionStyle.get(path,conditions)
			return found
		},undefined)

		if(value==undefined)
			value=super.get(...arguments)

		return value
	}

	priorize(conditions){
		conditions.sort((a,b)=>PRIORIZED.indexOf(a)-PRIORIZED.indexOf(b))
		return conditions
	}

	/**
	 * 1. conditional formatting
	 * 2. table.tcPr
	 * 3. table.trPr=tblPrEx
	 * 4. table.tblPr
	 */
	_right(conditions, edges){
		let value=this.priorize(conditions).reduce((found, cond)=>{//1. conditional
			if(found!=undefined)
				return found
			let condStyle=this[cond]
			if(condStyle && condStyle._right)
				return condStyle._right(...arguments)
		},undefined)

		let pr=null
		if(value==undefined && (pr=this.raw.get('tcPr')))
			value=super._right(...arguments)//2. table.tcPr

		if(value==undefined && (pr=this.raw.get('tblPrEx'))){//3.table.trPr
			if(conditions.includes('lastCol') || edges.includes('lastCol'))
				value=this._1border('tblPrEx.tblBorders.right')
			else
				value=this._1border('tblPrEx.tblBorders.insideV')
		}

		if(value==undefined && (pr=this.raw.get('tblPr'))){//4.
			if(conditions.includes('lastCol') || edges.includes('lastCol'))
				value=this._1border('tblPr.tblBorders.right')
			else
				value=this._1border('tblPr.tblBorders.insideV')
		}


		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._right)
				value=basedOn._right(...arguments)
		}

		return value
	}

	_left(conditions,edges){
		let value=this.priorize(conditions).reduce((found, cond)=>{//1. conditional
			if(found!=undefined)
				return found
			let condStyle=this[cond]
			if(condStyle && condStyle._left)
				return condStyle._left(...arguments)
		},undefined)

		let pr=null
		if(value==undefined && (pr=this.raw.get('tcPr')))
			value=super._left(...arguments)//2. table.tcPr

		if(value==undefined && (pr=this.raw.get('tblPrEx'))){//3.table.trPr
			if(conditions.includes('firstCol') || edges.includes('firstCol'))
				value=this._1border('tblPrEx.tblBorders.left')
			else
				value=this._1border('tblPrEx.tblBorders.insideV')
		}

		if(value==undefined && (pr=this.raw.get('tblPr'))){//4.
			if(conditions.includes('firstCol') || edges.includes('firstCol'))
				value=this._1border('tblPr.tblBorders.left')
			else
				value=this._1border('tblPr.tblBorders.insideV')
		}


		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._left)
				value=basedOn._left(...arguments)
		}

		return value
	}

	_top(conditions,edges){
		let value=this.priorize(conditions).reduce((found, cond)=>{
			if(found!=undefined)
				return found
			let condStyle=this[cond]
			if(condStyle && condStyle._top)
				return condStyle._top(...arguments)
		},undefined)

		let pr=null
		if(value==undefined && (pr=this.raw.get('tcPr')))
			value=super._top(...arguments)//2. table.tcPr

		if(value==undefined && (pr=this.raw.get('tblPrEx'))){//3.table.trPr
			if(conditions.includes('firstRow') || edges.includes('firstRow'))
				value=this._1border('tblPrEx.tblBorders.top')
			else
				value=this._1border('tblPrEx.tblBorders.insideH')
		}

		if(value==undefined && (pr=this.raw.get('tblPr'))){//4.
			if(conditions.includes('firstRow') || edges.includes('firstRow'))
				value=this._1border('tblPr.tblBorders.top')
			else
				value=this._1border('tblPr.tblBorders.insideH')
		}

		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._top)
				value=basedOn._top(...arguments)
		}

		return value
	}

	_bottom(conditions, edges){
		let value=this.priorize(conditions).reduce((found, cond)=>{
			if(found!=undefined)
				return found
			let condStyle=this[cond]
			if(condStyle && condStyle._bottom)
				return condStyle._bottom(...arguments)
		},undefined)


		let pr=null
		if(value==undefined && (pr=this.raw.get('tcPr')))
			value=super._top(...arguments)//2. table.tcPr

		if(value==undefined && (pr=this.raw.get('tblPrEx'))){//3.table.trPr
			if(conditions.includes('lastRow') || edges.includes('lastRow'))
				value=this._1border('tblPrEx.tblBorders.bottom')
			else
				value=this._1border('tblPrEx.tblBorders.insideH')
		}

		if(value==undefined && (pr=this.raw.get('tblPr'))){//4.
			if(conditions.includes('lastRow') || edges.includes('lastRow'))
				value=this._1border('tblPr.tblBorders.bottom')
			else
				value=this._1border('tblPr.tblBorders.insideH')
		}

		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._bottom)
				value=basedOn._bottom(...arguments)
		}

		return value
	}
}
