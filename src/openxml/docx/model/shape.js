import Style from './style'
import Drawing from './drawing'

export default class Shape extends require('../model'){
	getDirectStyle(){
		return new this.constructor.Properties(this.wXml,this.wDoc,this)
	}
	_getValidChildren(){
		return this.wXml.$('txbxContent')
	}

	static get type(){return 'shape'}
}

function phClr(o, clr, a){
	for(var i in o){
		switch(typeof(a=o[i])){
		case 'string':
			if(a=='phClr')
				o[i]=clr
			break
		case 'object':
			phClr(a, clr)
		}
	}
	return o
}

var naming=null
Shape.Properties=class Properties extends Style.Properties{
	static get naming(){
		if(!naming)
			naming=Object.assign({},Drawing.Properties.naming,Drawing.SpProperties.naming)
		return naming
	}
	
	_getValidChildren(t){
		var children=((t=this.wXml.$('>style>*')) && t.asArray() ||[])
			.concat(this.wXml.$('>spPr>*, >bodyPr>*').asArray());
		var bodyPr=this.wXml.$1('bodyPr')
		if(bodyPr){
			for(var i=0, attrs=bodyPr.attributes, len=attrs.length;i<len;i++)
				children.push(attrs[i])
		}
		return children
	}
	lnRef(x){
		return phClr(this.wDoc.getFormatTheme().line(x.attr('idx')),this.solidFill(x))
	}
	fillRef(x){
		return phClr(this.wDoc.getFormatTheme().fill(x.attr('idx')),this.solidFill(x))
	}
	fontRef(x){
		return {color:this.solidFill(x), family: this.wDoc.getFormatTheme().font(x.attr('idx'))}
	}
	effectRef(){

	}
	spAutoFit(){
		return true
	}
	lIns(x){
		if(x=parseInt(x.value))
			return this.pt2Px(this.asPt(x,'cm'))
		return this.EMPTY
	}
	tIns(x){
		return this.lIns(x)
	}
	rIns(x){
		return this.lIns(x)
	}
	bIns(x){
		return this.lIns(x)
	}
	anchor(x){
		switch(x.value){
		case 'b':
			return 'bottom'
		case 't':
			return 'top'
		default:
			return 'middle'
		}
	}
	vert(x){
		switch(x.value){
		case 'horz':
			return this.EMPTY
		case 'eaVert':
			return 90
		case 'vert270':
			return 270
		default:
			console.warn('not support')
			return this.EMPTY
		}
	}
	
	static mixinSpProperties(){
		Object.assign(this.naming,{
			custGeom:'path',
			prstGeom:'path'
		})
		
		Object.assign(this.prototype,Drawing.SpProperties)
		
		delete this.mixinSpProperties
	}
}

Shape.Properties.mixinSpProperties()





	
