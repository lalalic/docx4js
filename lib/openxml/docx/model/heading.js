export default class heading extends require('./paragraph'){
	getOutlineLevel(){
		return this.getNamedStyle().getOutlineLevel()
	}
	static get type(){return 'heading'}
}
