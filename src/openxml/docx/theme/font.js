export default class font{
	constructor(scheme,xLang){
		this.majorFont=scheme.get('a:majorFont.a:font')
			.reduce((p,{$:{script,typeface}})=>(p[script]=typeface,p),{})
			
		this.minorFont=scheme.get('a:minorFont.a:font')
			.reduce((p,{$:{script,typeface}})=>(p[script]=typeface,p),{})
		
		let typeface
		if(typeface=scheme.get('a:minorFont.a:latin.$.typeface'))
			this.minorFont.ascii=typeface
		
		if(typeface=scheme.get('a:majorFont.a:latin.$.typeface'))
			this.majorFont.ascii=typeface
		
		let ea=xLang['w:eastAsia']
		if(typeface=scheme.get('a:minorFont.a:ea.$.typeface'))
			this.minorFont.ea=typeface
		else if(ea && (typeface=this.minorFont[ea]))
			this.minorFont.ea=typeface
		
		if(typeface=scheme.get('a:majorFont.a:ea.$.typeface'))
			this.majorFont.ea=typeface
		else if(ea && (typeface=this.majorFont[ea]))
			this.majorFont.ea=typeface
		
		let bidi=xLang['w:bidi']
		if(typeface=scheme.get('a:minorFont.a:cs.$.typeface'))
			this.minorFont.bidi=typeface
		else if(bidi && (typeface=this.minorFont[bidi]))
			this.minorFont.bidi=typeface
		
		if(typeface=scheme.get('a:majorFont.a:cs.$.typeface'))
			this.majorFont.bidi=typeface
		else if(bidi && (typeface=this.majorFont[bidi]))
			this.majorFont.bidi=typeface
	}
	get(name){
		switch(name){
		case 'minorHAnsi':
		case 'minorAscii':
			return this.minorFont.ascii
		case 'minorEastAsia':
			return this.minorFont.ea
		case 'minorBidi':
			return this.minorFont.bidi
		
		case 'majorHAnsi':
		case 'majorAscii':
			return this.majorFont.ascii
		case 'majorEastAsia':
			return this.majorFont.ea
		case 'majorBidi':
			return this.majorFont.bidi
		}
	}
}
