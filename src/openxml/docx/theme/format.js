export default class format{
	constructor(wXml, wDoc){
		return
		this.wXml=wXml
		this.wDoc=wDoc
		this._converter=new Shape.Properties(null,wDoc,null)
		this._line={}
		this._fill={0:{},1000:{}}
		this._bgFill={}
		this._effect={}
		this._font={}

	}
	line(idx,t){
		if(t=this._line[idx])
			return t
		return (t=this.wXml.$1('ln:nth-child('+(parseInt(idx)+1)+')')) && (this._line[idx]=this._converter.ln(t))
	}
	fill(idx, t){
		idx=parseInt(idx)
		if(idx>1000)
			return this.bgFill(idx-1000)

		if(t=this._fill[idx])
			return t
		return (t=this.wXml.$1('bgFillStyleLst>:nth-child('+(parseInt(idx)+1)+')')) && (this._fill[idx]=this._converter[t.localName](t))
	}
	bgFill(idx, t){
		if(t=this._bgFill[idx])
			return t
		return (t=this.wXml.$1('bgFillStyleLst>:nth-child('+(parseInt(idx)+1)+')')) && (this._bgFill[idx]=this._converter[t.localName](t))
	}
	effect(idx, t){
		if(t=this._effect[idx])
			return t
		return (t=this.wXml.$1('effectStyle:nth-child('+(parseInt(idx)+1)+')>effectLst')) && (this._effect[idx]=this._converter.effectLst(t))
	}
	font(idx, t){
		if(t=this._font[idx])
			return t
		return (t=this.wXml.$1('fontScheme>'+idx+'Font>latin')) && (this._effect[idx]=t.attr('typeface'))
	}
}
