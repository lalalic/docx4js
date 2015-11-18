define(['../model','./style'],function(Super, Style){

	return Super.extend(function(wXml){
		Super.apply(this,arguments)
		this.wDrawing=null
	},{
		getDirectStyle: function(){
			return new this.constructor.Properties(this.wDrawing,this.wDoc, this)
		},
		_getValidChildren: function(){
			return []
		}
	},{
		Properties:Style.Properties.extend({
			_getValidChildren: function(t){
				return [this.wXml.$1('extent'), this.wXml.$1('effectExtent')]
			},
			extent: function(x){//inline and anchor
				return {width:this.asPt(x.attr('cx'),'cm'),height:this.asPt(x.attr('cy'),'cm')}
			},
			effectExtent: function(x){
				return this.asObject(x,function(x){return this.asPt(x,'cm')}.bind(this))
			},
			distT: function(x){
				if(x=parseInt(x.value))
					return this.asPt(x,'cm')
				return this.EMPTY
			},
			distB: function(x){
				return this.distT(x)
			},
			distR: function(x){
				return this.distT(x)
			},
			distL: function(x){
				return this.distT(x)
			}
		}),
		SpProperties: Style.Properties.extend({
			naming: {
				custGeom:'path',
				prstGeom:'path'
			},		
			xfrm: function(x){
				var ext=x.$1('ext'), offset=x.$1('off')
				return this.world={
					width:this.asPt(ext.attr('cx'),'cm'),
					height:this.asPt(ext.attr('cy'),'cm'),
					x:this.asPt(offset.attr('x'),'cm'), 
					y:this.asPt(offset.attr('y'),'cm'),
					rotation: parseInt(x.attr('rot')||0)/60000
				}
			},
			solidFill: function(x){
				var elColor=x.firstChild,
					color=this.asColor(elColor.attr('val')), t;
					
				if(color=='phClr')
					return 'phClr'
					
				switch(elColor.localName){
				case 'schemeClr':
					color=this.wDoc.getColorTheme().get(color)
					break
				}
				
				if(t=elColor.$1('shade'))
					color=this.shadeColor(color,-1*parseInt(t.attr('val'))/1000)
				
				if(t=elColor.$1('lumOff'))
					color=this.shadeColor(color,-1*parseInt(t.attr('val'))/1000)
					
				return color
			},
			noFill: function(x){
				return 1
			},
			gradFill: function(x){
				var type=x.$1('lin,path'), o=this.asObject(type), stops=[]
				for(var gs=x.$('gs'),a,i=0,len=gs.length;i<len;i++)
					stops.push({position:parseInt(gs[i].attr('pos'))/1000, color:this.solidFill(gs[i])})
				o.ang && (o.angel=parseInt(o.ang)/60000, delete o.ang);
				o.path && (o.rect=this.asObject(type.firstChild, function(x){return parseInt(x)/1000}));
				o.path=type.localName=='lin' ? 'linear' : o.path;
				o.stops=stops
				return o
			},
			ln: function(x){
				if(x.$1('noFill'))
					return {width:0}
				
				var o=this.asObject(x), t;
				
				(t=x.$1('solidFill')) && (o.color=this.solidFill(t));
				
				(t=o.w) && (o.width=this.asPt(t,'cm')) && (delete o.w);
				(t=x.$1('prstDash')) && (o.dash=t.attr('val'));
				return o
			},
			effectLst: function(x){
				
			},
			blipFill: function(x){
				return this.wDoc.getRel(x.$1('blip').attr('r:embed'))
			},
			prstGeom: function(x){
				var px=this.pt2Px, w=px(this.world.width), h=px(this.world.height);
				switch(x.attr('prst')){
				case 'leftBrace':
					return {shape:'path', path:'M '+w+' 0 L 0 '+h/2+' L '+w+' '+h+' Z'}
				default:
					return {shape:x.attr('prst')}
				}
			},
			custGeom: function(x){
				var path=[], px=function(x){return this.pt2Px(this.asPt(x,'cm'))}.bind(this);
				for(var a, children=x.$1('path').childNodes, len=children.length,i=0;i<len;i++){
					a=children[i]
					switch(a.localName){
					case 'moveTo':
						path.push('M '+px(a.firstChild.attr('x'))+' '+px(a.firstChild.attr('y')))
						break
					case 'lnTo':
						path.push('L '+px(a.firstChild.attr('x'))+' '+px(a.firstChild.attr('y')))
						break
					break
					case 'cubicBezTo':
						path.push('L '+px(a.childNodes[0].attr('x'))+' '+px(a.childNodes[0].attr('y')))
						path.push('Q '+px(a.childNodes[1].attr('x'))+' '+px(a.childNodes[1].attr('y'))
							+' '+px(a.childNodes[2].attr('x'))+' '+px(a.childNodes[2].attr('y')))
					break
					}
				}
				return {shape:'path', path:path.join(' ')}
			}
		})
	})
})