import Base from "../document"
import Part from './part'
import Color from "color"

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
		return this.pt2Px(a/20.0)
	}

	emu2Px(a){
		return this.pt2Px(a/12700)
	}
	

	pt2Px(pt){
		return pt*96/72
	}

	cm2Px(cm){
		return this.pt2Px(parseInt(cm)*28.3464567)
	}

	asColor(v, transform){
		if(!v || v.length==0 || v=='auto')
			return '#000000'
		v=v.split(' ')[0]
		const rgb=v.charAt(0)=='#' ? v : (RGB.test(v) ? '#'+v : v)
		if(transform){
			const {lumMod,lumOff,tint,shade}=transform
			if(lumMod||lumOff||tint){
		        let color=Color(rgb)

		        if(tint!=undefined){
		            color=color.lighten(1-tint)
		        }

		        if(lumMod!=undefined){
		            color=color.lighten(lumMod)
		        }

		        if(lumOff!=undefined){
		            color=color.darken(lumOff)
		        }

				if(shade!=undefined){
					color=color
						.red(color.red()*(1+shade))
						.green(color.green()*(1+shade))
						.blue(color.blue()*(1+shade))
				}

		        return `${color.hex()}`.replace(/^0x/,"#")
		    }
		}
		return rgb
	}
	
	toPx(length) {
		var value = parseFloat(length),
			units = String(length).match(RE_LENGTH_UNIT)[1];

		switch (units) {
			case 'cm' : return this.cm2Px(value);
			case 'mm' : return this.cm2Px(value / 10);
			case 'in' : return this.pt2Px(value * 72);
			case 'pt' : return this.pt2Px(value);
			case 'ft' : return this.pt2Px(value*864)
			default   : return value;
		}
	}

	static OfficeDocument=Part
}
const RGB=/([a-fA-F0-9]{2}?){3}?/;
const RE_LENGTH_UNIT=/^([a-zA-Z]+)$/
