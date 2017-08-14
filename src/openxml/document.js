import Base from "../document"
import Part from './part'

export default class extends Base{
	constructor(){
		super(...arguments)
		this.main=new Part("",this)
		this.officeDocument=new this.constructor.OfficeDocument(this.main.getRelTarget("officeDocument"), this)
	}
	get vender(){"Microsoft"}

	get product(){return 'Office 2010'}

	get contentTypes(){
		return this.getObjectPart("[Content_Types].xml")("Types")
	}

	render(){
		return this.officeDocument.render(...arguments)
	}

	parse(){
		return this.officeDocument.parse(...arguments)
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
	
	toPx(length) {
		var value = parseFloat(length),
			units = String(length).match(RE_LENGTH_UNIT)[1];

		switch (units) {
			case 'em' : return value * 16;
			case 'rem': return value * 16;
			case 'cm' : return value * 96 / 2.54;
			case 'mm' : return value * 96 / 2.54 / 10;
			case 'in' : return value * 96;
			case 'pt' : return value * 72;
			case 'pc' : return value * 72 / 12;
			default   : return value;
		}
	}

	static OfficeDocument=Part
}
let RGB=/([a-fA-F0-9]{2}?){3}?/;
