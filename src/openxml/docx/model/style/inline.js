import Style from '../style'

export default class Inline extends Style{
	static get type(){return 'style.inline'}

	_iterate(f,factories,visitors){
		var pr=this.wXml.$1('>rPr')
		pr && new this.constructor.Properties(pr,this.wDoc,this).parse(visitors)
	}

	static Properties=class extends Style.Properties{
		static get type(){return 'inline'}

		rFonts(x){
			var t, ascii, asia
			if(t=x.attr('w:ascii'))
				ascii=t
			else if(t=x.attr('w:asciiTheme'))
				ascii=this.wDoc.getFontTheme().get(t)

			if(t=x.attr('w:eastAsia'))
				asia=t
			else if(t=x.attr('w:eastAsiaTheme'))
				asia=this.wDoc.getFontTheme().get(t)
			if(ascii || asia)
				return {ascii, asia}
		}
		b(x){
			return this.asToggle(x)
		}
		sz(x){
			return this.pt2Px(parseFloat(x.attr('w:val'))/2)
		}
		color(x){
			return this.asColor((x.attr('w:val') || this.wDoc.getColorTheme().get(x.attr('w:themeColor'))))
		}
		i(x){
			return this.asToggle(x)
		}
		vanish(x){
			return this.asToggle(x)
		}
		u(x){
			return this.asObject(x)
		}
		bdr(x){
			var border=this.asObject(x)
			border.sz && (border.sz=border.sz/8);
			border.color && (border.color=this.asColor(border.color))
			return border
		}
		lang(x){
			return x.attr('w:val')
		}
		vertAlign(x){
			return x.attr('w:val')
		}
		highlight(x){
			return this.asColor(x.attr('w:val'))
		}
		
		kern(x){//word spacing
			return parseInt(x.attr('w:val'))/2
		}
		
		w(x){//char scale
			return parseInt(x.attr('w:val'))/100.0
		}
		
		spacing(x){//char spacing
			return this.pt2Px(this.asPt(x.attr("w:val")))
		}
		
		position(x){//baseline shift
			return this.pt2Px(this.asPt(x.attr("w:val")))
		}
		
		smallCaps(){
			return true
		}
		
		asToggle(x){
			let val=x.attr('w:val')
			if(!val){
				return -1
			}else{
				return parseInt(val)
			}
		}
	}
}
