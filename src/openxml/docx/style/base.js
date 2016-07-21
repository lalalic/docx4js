export default class Style{
	constructor(style, styles){
		this.raw=style
		this.styles=styles
	}
	
	get(path){
		let value=this.raw.get(path)
		if(value==undefined)
			value=this.getFromBasedOn(...arguments)
		return value
	}
	
	getBasedOn(){
		return this.styles[this.get('basedOn')]
	}
	
	getFromBasedOn(path){
		let basedOn=this.getBasedOn()
		if(basedOn)
			return basedOn.get(...arguments)
		return undefined
	}
}