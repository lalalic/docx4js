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
		return this.pt2Px(parseInt(a)/20.0)
	}

	emu2Px(a){
		return this.pt2Px(parseInt(a)/12700)
	}

	pt2Px(pt){
		return Math.ceil(pt*96/72)
	}

	cm2Px(cm){
		return this.pt2Px(parseInt(cm)*28.3464567/360000)
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
			units = String(length).match(RE_LENGTH_UNIT)[2];

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
const RGB=/([a-fA-F0-9]{2}?){3}?/;
const RE_LENGTH_UNIT=/^(\d+)(\w)+$/
