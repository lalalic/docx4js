define(['../style','./inline', './numbering'],function(Style, Inline, Numbering){
	return Style.extend({
		getOutlineLevel: function(v){
			if((v=this._val('outlineLvl'))!=null)
				return parseInt(v)
			if((v=this.getParentStyle())!=null && v.getOutlineLevel)
				return v.getOutlineLevel()
			return -1
		},
		getNumId: function(){
			if((v=this._val('numId'))!=null)
				return v
			if((v=this.getParentStyle())!=null && v.getNumId)
				return v.getNumId()
			return -1
		},
		asNumberingStyle: Numbering.prototype.asNumberingStyle,
		_iterate: function(f, factories, visitors){
			var pr=this.wXml.$1('pPr')
			pr && new this.constructor.Properties(pr,this.wDoc,this).parse(visitors);

			(pr=this.wXml.$1('rPr')) && new Inline.Properties(pr,this.wDoc,this).parse(visitors);

			(pr=this.wXml.$1('numPr')) && new Numbering.Properties(pr,this.wDoc,this).parse(visitors);

			(pr=this.wXml.$1('framePr')) && new this.constructor.FrameProperties(pr,this.wDoc,this).parse(visitors);
		}
	},{
		type:'style.paragraph',
		Properties: Style.Properties.extend({
			jc: function(x){
				return x.attr('w:val')
			},
			ind: function(x){
				return this.asObject(x, this.asPt)
			},
			spacing: function(x){
				var r=this.asObject(x), o={}

				if(!r.beforeAutospacing && r.beforeLines)
					o.top=this.asPt(r.beforeLines)
				else (r.before)
					o.top=this.asPt(r.before)

				if(!r.afterAutospacing && r.afterLines)
					o.bottom=this.asPt(r.afterLines)
				else (r.after)
					o.bottom=this.asPt(r.after)

				if(!r.line)
					return o

				switch(x.lineRule){
				case 'atLeast':
				case 'exact':
					o.lineHeight=this.asPt(x.line)+'pt'
					break
				case 'auto':
				default:
					o.lineHeight=(parseInt(r.line)*100/240)+'%'
				}
				o.lineRule=x.lineRule
				return o
			}
		},{type:'paragraph'}),
		FrameProperties: Style.Properties.extend({},{
			type:'frame'
		})
	})
})
