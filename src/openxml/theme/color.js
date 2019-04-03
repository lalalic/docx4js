export default class color {
	constructor(scheme, xMapping){
		this.map=xMapping
		this.scheme=scheme
	}
	get(name){
		if(name=='phClr')//placeholder color, witch will be replaced with direct style
			return name
		name=this.map[name]||name
		return '#'+(this.scheme.get(`${name}.srgbClr`)||this.scheme.get(`${name}.sysClr.$.lastClr`)||'000000')
	}
}
