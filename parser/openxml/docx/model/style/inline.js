"use strict"
var Style=require('../style')

class Inline extends Style{
	static get type(){return 'style.inline'}

	_iterate(f,factories,visitors){
		var pr=this.wXml.$1('>rPr')
		pr && new this.constructor.Properties(pr,this.wDoc,this).parse(visitors)
	}
}

class Properties extends Style.Properties{
	static get type(){return 'inline'}

	rFonts(x){
		var v={},t;
		if(t=x.attr('w:ascii'))
			v.ascii=t
		else if(t=x.attr('w:asciiTheme'))
			v.ascii=this.wDoc.getFontTheme().get(t)

		if(t=x.attr('w:eastAsia'))
			v.asia=t
		else if(t=x.attr('w:eastAsiaTheme'))
			v.asia=this.wDoc.getFontTheme().get(t)
		return v
	}
	b(x){
		return {}
	}
	sz(x){
		return parseFloat(x.attr('w:val'))/2
	}
	color(x){
		return this.asColor((x.attr('w:val') || this.wDoc.getColorTheme().get(x.attr('w:themeColor'))))
	}
	i(x){
		return {}
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
}

Object.assign(module.exports=Inline,{Properties})
