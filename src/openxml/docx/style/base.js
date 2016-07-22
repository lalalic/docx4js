import {getable} from "../../../xmlObject"

export default class Style{
	constructor(style, styles, basedOn="basedOn"){
		this.raw=style.get ? style : getable(style)
		this.styles=styles
		this.basedOn=basedOn
	}
	
	get(path){
		let value=this.raw.get(path)
		if(value==undefined)
			value=this.getFromBasedOn(...arguments)
		return value
	}
	
	getBasedOn(){
		return typeof(this.basedOn)=='string' ? this.styles[this.raw.get(this.basedOn)] : this.basedOn
	}
	
	getFromBasedOn(path){
		let basedOn=this.getBasedOn()
		if(basedOn)
			return basedOn.get(...arguments)
		return undefined
	}
}