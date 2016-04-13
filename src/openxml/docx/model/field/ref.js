export default class hyperlink extends require('./hyperlink'){
	constructor(instruct){
		super(...arguments)
		this.link='#'+instruct.split(/\s+/)[1]
	}
	
	static get type(){return 'field.ref'}
}
