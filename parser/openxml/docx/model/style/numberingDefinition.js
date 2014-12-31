define(['../style','./inline','require'],function(Style, Inline, require){
	function asStyleId(absNumId){return '_numberingDefinition'+absNumId}
	return Style.extend(function(wXml){
		Style.apply(this,arguments)
		this.levels=[]

		this.name=this.id=asStyleId(wXml.attr('w:abstractNumId'))
		this.wDoc.style.set(this)
		var link=wXml.$1('numStyleLink')
		if(link)
			this.link=link.attr('w:val')
	},{
		type:'style.numbering.definition',
		_iterate: function(f, factories, visitors){
			for(var i=0,children=this.wXml.$('lvl'),l=children.length, t; i<l; i++){
				this.levels.push(t=new this.constructor.Level(children[i],this.wDoc, this))
				t.parse(visitors)
			}
		},
		getDefinitionId: function(){
			return this.wXml.attr('w:abstractNumId')
		}
	},{
		asStyleId: asStyleId,
		Level: Style.Properties.extend(function(wXml){
			Style.Properties.apply(this,arguments)
			this.type=wXml.attr('w:ilvl')
		},{
			parse: function(visitors){
				Style.Properties.prototype.parse.apply(this,arguments)
				var t,pr;
				if(t=this.wXml.$1('>pPr')){
					pr=new (require('./paragraph').Properties)(t,this.wDoc,this)
					pr.type=this.type+' '+pr.type
					pr.parse(visitors)
				}
				
				if(t=this.wXml.$1('>rPr')){
					pr=new Inline.Properties(t,this.wDoc,this)
					pr.type=this.type+' '+pr.type
					pr.parse(visitors)	
				}
			},
			start: function(x){
				return parseInt(x.attr('w:val'))
			},
			numFmt: function(x){
				return x.attr('w:val')
			},
			lvlText: function(x){
				return x.attr('w:val')
			},
			lvlJc: function(x){
				return x.attr('w:val')
			},
			lvlPicBulletId: function(x){
				return x.attr('w:val')
			}
		})
	})
})