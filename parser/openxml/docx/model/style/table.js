define(['../style','./paragraph','./inline'],function(Style, Paragraph, Inline){
	return Style.extend({
		type:'style.table',
		parse: function(factories){
			Style.prototype.parse.apply(this,arguments)
			
			var TableStyle=this.constructor
			for(var styles=this.wXml.$('tblStylePr'), len=styles.length, i=0;i<len;i++){
				var model=new TableStyle(styles[i],this.wDoc,this)
				model.id=this.id
				model.parse(factories)
			}
		},
		_iterate: function(f, factories, visitors){
			var pr=null;
			(pr=this.wXml.$1('>tblPr:not(:empty)')) && new this.constructor.Properties(pr,this.wDoc,this).parse(visitors);
			(pr=this.wXml.$1('>trPr:not(:empty)')) && new this.constructor.RowProperties(pr,this.wDoc,this).parse(visitors);
			(pr=this.wXml.$1('>tcPr:not(:empty)')) && new this.constructor.CellProperties(pr,this.wDoc,this).parse(visitors);
			(pr=this.wXml.$1('>pPr:not(:empty)')) && new Paragraph.Properties(pr,this.wDoc,this).parse(visitors);
			(pr=this.wXml.$1('>rPr:not(:empty)')) && new Inline.Properties(pr,this.wDoc,this).parse(visitors);
		},
		getTarget: function(){
			return this.wXml.attr('w:type')
		}
	},{
		Properties: Style.Properties.extend({
			type:'table',
			tblBorders: function(x){
				var value={};
				for(var borders=x.childNodes,border,i=0,len=borders.length;i<len;i++){
					border=value[(border=borders[i]).localName]=this.asObject(border)
					border.sz && (border.sz=border.sz/8);
					border.color && (border.color=this.asColor(border.color))
				}
				return value
			},
			tblCellMar: function(x){
				var value={};
				for(var borders=x.childNodes,i=0,len=borders.length,v;i<len;i++)
					value[borders[i].localName]=parseInt(borders[i].attr('w:w'))/20
				return value
			},
			tblLook: function(x){
				return this.asObject(x,function(x){return parseInt(x)})
			},
			tblStyleRowBandSize: function(x){
				return parseInt(x.attr('w:val'))
			},
			tblStyleColBandSize: function(x){
				return parseInt(x.attr('w:val'))
			}
		}),
		RowProperties: Style.Properties.extend({
			type:'row',
			cnfStyle: function(x){
				return x.attr('w:val')
			}
		}),
		CellProperties: Style.Properties.extend({
			type:'cell',
			tcBorders: function(x){
				var value={};
				for(var borders=x.childNodes,border,i=0,len=borders.length;i<len;i++){
					border=value[(border=borders[i]).localName]=this.asObject(border)
					border.sz && (border.sz=border.sz/8);
					border.color && (border.color=this.asColor(border.color))
				}
				return value
			},
			shd: function(x){
				return this.asColor(x.attr('w:fill'))
			},
			cnfStyle: function(x){
				return x.attr('w:val')
			},
			gridSpan: function(x){
				return x.attr('w:val')
			}
		})
	})
})