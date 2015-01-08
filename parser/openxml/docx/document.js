define(['../document','./factory','./theme/font', './theme/color','./theme/format'],function(Super,factory, FontTheme, ColorTheme, FormatTheme){
	function ParseContext(current){
		this.current=current
	}

	return Super.extend(function(){
			Super.apply(this,arguments)
			var rels=this.rels,
				builtIn='settings,webSettings,theme,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',')
			$.each(this.partMain.rels,function(id,rel){
				builtIn.indexOf(rel.type)!=-1 && (rels[rel.type]=rel.target)
			})
			this.style=new this.constructor.Style()
			this.parseContext={
				section: new ParseContext(),
				part:new ParseContext(this.partMain),
				bookmark: new ParseContext(),
				field: (function(ctx){
					ctx.instruct=function(t){
						this[this.length-1].instruct(t)
					}
					ctx.seperate=function(model){
						this[this.length-1].seperate(model)
					}
					ctx.end=function(model){
						this.pop().end(model)
					}
					return ctx
				})([])
			};
		},{
		type:"Word",
		ext:'docx',
		parse: function(visitFactories){
			this.content=factory(this.partMain.documentElement, this)
			var roots=this.content.parse($.isArray(visitFactories) ? visitFactories : $.toArray(arguments))
			this.release()
			return roots.length==1 ? roots[0] : roots
		},
		getRel: function(id){
			return this.parseContext.part.current.getRel(id)
		},
		getColorTheme: function(){
			if(this.colorTheme)
				return this.colorTheme
			return this.colorTheme=new ColorTheme(this.getPart('theme').documentElement.$1('clrScheme'), this.getPart('settings').documentElement.$1('clrSchemeMapping'))
		},
		getFontTheme: function(){
			if(this.fontTheme)
				return this.fontTheme
			return this.fontTheme=new FontTheme(this.getPart('theme').documentElement.$1('fontScheme'), this.getPart('settings').documentElement.$1('themeFontLang'))
		},
		getFormatTheme: function(){
			if(this.formatTheme)
				return this.formatTheme
			return this.formatTheme=new FormatTheme(this.getPart('theme').documentElement.$1('fmtScheme'), this)
		},
		release: function(){
			with(this.parseContext){
				delete section
				delete part
				delete bookmark
			}
			delete this.parseContext
			Super.prototype.release.call(this)
		}
	},{
		Style: function(){
			var ids={},defaults={}
			$.extend(this,{
				setDefault: function(style){
					defaults[style.type]=style
				},
				getDefault: function(type){
					return defaults[type]
				},
				get: function(id){
					return ids[id]
				},
				set: function(style, id){
					ids[id||style.id]=style
				}
			})
		}
	})
});