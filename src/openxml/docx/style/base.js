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
		if(!this.basedOn)
			return undefined
		if(typeof(this.basedOn)!=='string')
		 	return this.basedOn
		if(this.styles)
			return this.styles[this.raw.get(this.basedOn)]
		return undefined
	}

	getFromBasedOn(path){
		let basedOn=this.getBasedOn()
		if(basedOn)
			return basedOn.get(...arguments)
		return undefined
	}
}
