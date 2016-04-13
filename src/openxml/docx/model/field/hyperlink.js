export default class hyperlink extends require('./field'){
	constructor(instruct){
		super(...arguments)
		this.link=instruct.split('"')[1]
	}
	getLink(){
		return this.link
	}

	static get type(){return 'field.hyperlink'}
}
