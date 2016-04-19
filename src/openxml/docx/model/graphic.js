import Drawing from './drawing'

export default class Graphic extends Drawing{
	constructor(wXml){
		super(...arguments)
		this.wDrawing=wXml
	}
}

var naming=null;

Graphic.Properties=class Properties extends Drawing.Properties{
	static get naming(){
		if(!naming)
			naming=Object.assign({},Drawing.Properties.naming,Drawing.SpProperties.naming)
		return naming
	}
	
	_getValidChildren(t){
		return super._getValidChildren(...arguments)
			.concat(this.wXml.$1('spPr').childNodes.asArray())
	}
}


Graphic.Properties.mixinSpProperties()