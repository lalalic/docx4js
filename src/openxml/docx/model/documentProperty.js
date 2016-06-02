export default class documentProperty extends require('./sdt'){
	constructor(wXml,b,c, name){
		super(...arguments)
		this.key=name.toLowerCase()
		this.value=wXml.$1('>sdtContent').textContent.trim()
		if(!this.wDoc.props[this.key])
			this.wDoc.props[this.key]=this.value
	}
	static get type(){return 'documentProperty'}
}
