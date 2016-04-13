import Drawing from './drawing'

export default class graphic extends Drawing{
	constructor(wXml){
		super(...arguments)
		this.wDrawing=wXml
	}

	static get Properties(){return Properties}
}

var naming=Object.assign({},Drawing.Properties.naming,Drawing.SpProperties.naming)

class Properties extends Drawing.Properties{
	static get naming(){return naming}
}

Object.assign(Properties.prototype,Drawing.SpProperties.prototype,{
	_getValidChildren(t){
		return Drawing.Properties.prototype._getValidChildren.call(this,...arguments)
			.concat(this.wXml.$1('spPr').childNodes.asArray())
	}
})
