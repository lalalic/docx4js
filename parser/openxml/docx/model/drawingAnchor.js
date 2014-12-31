define(['./drawing'],function(Super){
	function refine(name){
		return name.replace(/-(\w)/, function(a,b){return b.toUpperCase()})			
	}
	return Super.extend(function(wXml,wDoc,mParent){
		Super.apply(this,arguments)
		this.wDrawing=wXml.$1('drawing>:first-child')
	},{
		type:'drawing.anchor',
		_getValidChildren: function(){
			return this.wDrawing.$('wsp')
		}
	},{
		Properties: Super.Properties.extend({
			type:'shape',
			naming: $.extend(Super.Properties.prototype.naming,{
				wrapNone:'wrap',
				wrapSquare:'wrap',
				wrapTopAndBottom:'wrap',
				wrapTight:'wrap',
				wrapThrough:'wrap'
			}),
			_getValidChildren: function(){
				var t, children=Super.Properties.prototype._getValidChildren.apply(this,arguments);
				'positionH,positionV,wrapNone,wrapSquare,wrapTopAndBottom,wrapTight,wrapThrough'.split(',').forEach(function(a){
					(t=this.wXml.$1(a)) && children.push(t);
				},this)
				return children
			},
			positionH: function(x){
				var o={relativeFrom:x.attr('relativeFrom')}
				o[x.firstChild.localName]= x.firstChild.localName=='posOffset' ? this.asPt(x.firstChild.textContent,'cm') : x.firstChild.textContent
				return o
			},
			positionV: function(x){
				var o={relativeFrom:x.attr('relativeFrom')}
				o[x.firstChild.localName]= x.firstChild.localName=='posOffset' ? this.asPt(x.firstChild.textContent,'cm') : x.firstChild.textContent
				return o
			},
			wrapNone: function(){
				return 'none'
			},
			wrapSquare: function(){
				return 'square'
			},
			wrapTopAndBottom: function(){
				return 'topAndBottom'
			},
			wrapTight: function(){
				return 'tight'
			},
			wrapThrough: function(){
				return 'through'
			},
			behindDoc: function(x){
				return x.value=='0' ? this.EMPTY : true
			}
		})
	})
})