import Base from "../document"
import {getable} from "../xmlObject"
import Part from './part'

export default class extends Base{
	constructor(){
		super(...arguments)
		var rels=new Part("",this).rels
		this.rels={}
		Object.keys(rels).forEach(id=>{
			let rel=rels[id]
			this.rels[rel.type]=rel.target
		})
		this.officeDocument=new this.constructor.OfficeDocument(this.rels['officeDocument'],this)
	}
	get vender(){"Microsoft"}

	get product(){return 'Office 2010'}

	createElement(node){
		return this.onCreateElement(node)
	}
	
	onCreateElement(node,type){
		return node
	}

	isProperty(node){
		return node.name.substr(-2)=='Pr'
	}

	onToProperty(node, type){
		return node
	}

	toProperty(node,type){
		return getable(this.onToProperty(node,type))
	}

	parse(){
		const parts=this.parts
		return this.getObjectPart("[Content_Types].xml")
			.then(o=>parts["[Content_Types].xml"]=o)
			.then(a=>this.officeDocument.parse())
	}

	dxa2Px(a){
		return this.pt2Px(parseInt(a)/20.0)
	}

	pt2Px(pt){
		return Math.ceil(pt*96/72)
	}
	
	cm2Px(cm){
		return this.pt2Px(parseInt(cm)*28.3464567/360000)
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
	static OfficeDocument=Part
}
let RGB=/([a-fA-F0-9]{2}?){3}?/;
