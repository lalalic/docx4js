export default class heading extends require('./paragraph'){
	constructor(){
		super(...arguments)
		this.outlineLvl=arguments[arguments.length-1]
	}
	getOutlineLevel(){
		return this.outlineLvl
	}
	static get type(){return 'heading'}
}
