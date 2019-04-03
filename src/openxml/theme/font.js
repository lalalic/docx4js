export default class font{
	constructor(scheme,xLang){
		this.majorFont=scheme.get('majorFont.font')
			.reduce((p,{$:{script,typeface}})=>(p[script]=typeface,p),{})

		this.minorFont=scheme.get('minorFont.font')
			.reduce((p,{$:{script,typeface}})=>(p[script]=typeface,p),{})

		let typeface
		if(typeface=scheme.get('minorFont.latin.$.typeface'))
			this.minorFont.ascii=typeface

		if(typeface=scheme.get('majorFont.latin.$.typeface'))
			this.majorFont.ascii=typeface

		let ea=xLang['eastAsia']
		if(typeface=scheme.get('minorFont.ea.$.typeface'))
			this.minorFont.ea=typeface
		else if(ea && (typeface=this.minorFont[ea]))
			this.minorFont.ea=typeface

		if(typeface=scheme.get('majorFont.ea.$.typeface'))
			this.majorFont.ea=typeface
		else if(ea && (typeface=this.majorFont[ea]))
			this.majorFont.ea=typeface

		let bidi=xLang['bidi']
		if(typeface=scheme.get('minorFont.cs.$.typeface'))
			this.minorFont.bidi=typeface
		else if(bidi && (typeface=this.minorFont[bidi]))
			this.minorFont.bidi=typeface

		if(typeface=scheme.get('majorFont.cs.$.typeface'))
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
