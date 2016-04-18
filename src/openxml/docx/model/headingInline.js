export default class headingChar extends require('./inline'){
	static get type(){return 'headingChar'}

	constructor(){
		super(...arguments)
		this.outlineLvl=arguments[arguments.length-1]
	}
	getOutlineLevel(){
		return this.outlineLvl
	}

}
