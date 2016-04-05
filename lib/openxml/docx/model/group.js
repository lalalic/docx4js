export default class group extends require('./shape'){
	_getValidChildren(){
		return this.wXml.$('wsp')
	}

	static get type(){return 'group'}
}
