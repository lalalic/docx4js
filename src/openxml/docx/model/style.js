var RGB=/([a-fA-F0-9]{2}?){3}?/;
export default class Style extends require('../model'){
	constructor(wXml,wDoc,mParent){
		super(...arguments)
		if(wXml.attr('w:default')=='1')
			wDoc.style.setDefault(this)
		this.name=this._val('name')
		if(this.id=this._attr('w:styleId'))
			wDoc.style.set(this)
	}
	getParentStyle(){
		return this.wDoc.style.get(this._val('basedOn'))
	}
	isDefault(){
		return this.wXml.attr('w:default')=='1'
	}
	getNumId(){
		return -1
	}
	getOutlineLevel(){
		return -1
	}
}

var naming={}
Style.Properties=class Properties extends require('../model'){
	static get type(){return null}
	static get naming(){return naming}
	constructor(){
		super(...arguments)
		this.values={}
	}

	get EMPTY(){return -999}
	//use parent visitor to visitor style nodes and attributes
	parse(visitors){
		var values=this.values, naming=this.constructor.naming, type=this.constructor.type, t
		visitors.forEach((visitor)=>{
			[this._getValidChildren(),this.wXml.attributes].forEach((children)=>{
				for(var len=children.length,i=0;i<len;i++){
					var node=children[i], name=node.localName
					if(values[name]==undefined){
						if(typeof(this[name])=='function')
							values[name]=this[name](node)
						else if(node.attr && (t=node.attr("w:val")))//lazy default
							values[name]=t
					}
					values[name]!=this.EMPTY && visitor.visit(values[name],naming[name]||name,type)
				}
			})
		})
	}
	_getValidChildren(){
		return this.wXml.childNodes
	}
	basedOn(x){
		return x.attr('w:val')
	}
	asColor(v){
		if(!v || v.length==0 || v=='auto')
			return '#000000'
		v=v.split(' ')[0]
		return v.charAt(0)=='#' ? v : (RGB.test(v) ? '#'+v : v)
	}
	shadeColor(color, percent) {
		if(!RGB.test(color))
			return color
		var R = parseInt(color.substring(1,3),16);
		var G = parseInt(color.substring(3,5),16);
		var B = parseInt(color.substring(5,7),16);

		R = parseInt(R * (100 + percent) / 100);
		G = parseInt(G * (100 + percent) / 100);
		B = parseInt(B * (100 + percent) / 100);

		R = (R<255)?R:255;
		G = (G<255)?G:255;
		B = (B<255)?B:255;

		var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
		var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
		var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

		return "#"+RR+GG+BB;
	}
	asObject(x, f){
		var o={}
		for(var i=0,attrs=x.attributes,len=attrs.length;i<len;i++)
			o[attrs[i].localName]= f ? f(attrs[i].value) : attrs[i].value
		return o
	}
	asPt(x, type){
		switch(type){
		case 'cm':
			return parseInt(x)*28.3464567/360000;
		default://dxa
			return parseInt(x)/20.0
		}
	}
	pt2Px(x){
		if(typeof(x)=='string')
			x=parseFloat(x.replace('pt',''))
		return Math.floor(x*96/72)
	}
}
