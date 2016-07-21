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
	getBorder(conditions){
		return {
			right:this._right(...arguments)||{sz:0},
			left: this._left(...arguments)||{sz:0},
			top: this._top(...arguments)||{sz:0},
			bottom: this._bottom(...arguments)||{sz:0}
		}
	}
	_get(path){
		return this.raw.get(path)
	}
	
	_1border(type){
		let value=this._get(type)
		if(value!=undefined){
			if(value.val=='nil')
				return {sz:0}
			return value
		}
	}
	
	_right(conditions){
		let v=this._1border('border.right')
		if(v!=undefined)
			return v
		let basedOn=this.getBasedOn()
		if(basedOn && basedOn._right)
			return basedOn._right(...arguments)
	}
	
	_left(conditions){
		let v=this._1border('border.left')
		if(v!=undefined)
			return v
		let basedOn=this.getBasedOn()
		if(basedOn && basedOn._left)
			return basedOn._left(...arguments)
	}
	
	_top(){
		let v=this._1border('border.top')
		if(v!=undefined)
			return v
		let basedOn=this.getBasedOn()
		if(basedOn && basedOn._top)
			return basedOn._top(...arguments)
	}
	
	_bottom(){
		let v=this._1border('border.bottom')
		if(v!=undefined)
			return v
		let basedOn=this.getBasedOn()
		if(basedOn && basedOn._bottom)
			return basedOn._bottom(...arguments)
	}
}

class RowStyle extends WithBorder{
	_right(conditions){
		let value
		if(conditions.includes('lastCol'))
			value=super._right(...arguments)
		else
			value=this._1border('border.insideV')
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._right)
				value=basedOn._right(...arguments)
		}
		
		return value
			
	}
	
	_left(conditions){
		let value
		if(conditions.includes('firstCol'))
			value=super._right(...arguments)
		else
			value=this._1border('border.insideV')
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._left)
				value=basedOn._left(...arguments)
		}
		
		return value
	}
}

class CellStyle extends WithBorder{
	
}

class ColStyle extends WithBorder{
	_top(conds){
		if(conds.includes('firstRow'))
			return super._top(...arguments)
	}
	
	_bottom(conds){
		if(conds.includes('lastRow'))
			return super._bottom(...arguments)
	}
}


class BandHStyle extends RowStyle{
	
}
class BandVStyle extends ColStyle{
	
}

export default class TableStyle extends WithBorder{
	constructor(){
		super(...arguments)
		this.conditions={}
		
		;(this.raw.get('tblStylePr')||[]).forEach(a=>{
			a=getable(a)
			let type=a.get('$.type')
			this.conditions[type]=new TableStyle[type](a)
		})
	}
	
	get(path, conditions=[]){
		let conditionStyles=this.conditions
		let value=this.priorize(conditions).reduce((found, condition)=>{
			if(found!=undefined)
				return found
			if(conditionStyles){
				let conditionStyle=conditionStyles[condition]
				if(conditionStyle)
					return conditionStyle.get(path)
			}
			return found
		},undefined)
		
		if(value==undefined)
			return super.get(...arguments)
		else
			return value
	}
	
	priorize(conditions){
		conditions.sort((a,b)=>PRIORIZED.indexOf(a)-PRIORIZED.indexOf(b))
		return conditions
	}
	
	_right(conditions){
		let value=this.priorize(conditions).reduce((found, cond)=>{
			if(found!=undefined)
				return found
			let condStyle=this.conditions[cond]
			if(condStyle && condStyle._right)
				return condStyle._right(...arguments)
		},undefined)
		
		if(value==undefined){
			if(conditions.includes('lastCol'))
				value=super._right(...arguments)
			else
				value=this._1border('border.insideV')
		}
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._right)
				value=basedOn._right(...arguments)
		}
		
		return value
	}
	
	_left(conditions){
		let value=this.priorize(conditions).reduce((found, cond)=>{
			if(found!=undefined)
				return found
			let condStyle=this.conditions[cond]
			if(condStyle && condStyle._left)
				return condStyle._left(...arguments)
		},undefined)
		
		if(value==undefined){
			if(conditions.includes('firstCol'))
				value=super._left(...arguments)
			else
				value=this._1border('border.insideV')
		}
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._left)
				value=basedOn._left(...arguments)
		}
		
		return value
	}
	
	_top(conditions){
		let value=this.priorize(conditions).reduce((found, cond)=>{
			if(found!=undefined)
				return found
			let condStyle=this.conditions[cond]
			if(condStyle && condStyle._top)
				return condStyle._top(...arguments)
		},undefined)
		
		if(value==undefined){
			if(conditions.includes('firstRow'))
				value=super._top(...arguments)
			else
				value=this._1border('border.insideH')
		}
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._top)
				value=basedOn._top(...arguments)
		}
		
		return value
	}
	
	_bottom(conditions){
		let value=this.priorize(conditions).reduce((found, cond)=>{
			if(found!=undefined)
				return found
			let condStyle=this.conditions[cond]
			if(condStyle && condStyle._bottom)
				return condStyle._bottom(...arguments)
		},undefined)
		
		
		if(value==undefined){
			if(conditions.includes('lastRow'))
				value=super._bottom(...arguments)
			else
				value=this._1border('border.insideH')
		}
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._bottom)
				value=basedOn._bottom(...arguments)
		}
		
		return value
	}
	
	static seCell=CellStyle
	static swCell=CellStyle
	static neCell=CellStyle
	static nwCell=CellStyle
	static lastCol=ColStyle
	static firstCol=ColStyle
	static lastRow=RowStyle
	static firstRow=RowStyle
	static band2Horz=BandHStyle
	static band1Horz=BandHStyle
	static band2Vert=BandVStyle
	static band1Vert=BandVStyle
}

