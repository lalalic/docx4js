export default class pageref extends require('./field'){
	constructor(instruct){
		super(...arguments)
	}

	static get type(){return 'field.pageref'}
}
