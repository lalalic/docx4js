
/**
*  some utils extended on jquery
*/
var DOMParser=require('xmldom').DOMParser;
var $={
	Deferred:require('apromise'),
	parseXML: function(x){
		return new DOMParser().parseFromString(x, "text/xml");
	},
	extend: require('extend'),
	isFunction: function(a){
		return typeof a ==='function'
	},
	isArray: function(a){
		return Array.isArray(a)
	},
	each: function(a,f,ctx){
		if(Array.isArray(a)){
			a.forEach(f,ctx)
		}else if(typeof a ==='object'){
			Object.keys(a).forEach(function(k){
				f.call(ctx,k,a[k])
			})
		}
	},
	map: function(a,f,ctx){
		return a.map(f,ctx)
	}
};
	
$.extend($,{
	toArray: function(args){
		var a=[];
		for(var i=0,len=args.length;i<len;i++)
			a.push(args[i])
		return a
	},
	newClass: function (constructor, properties, classProperties) {
		if(!$.isFunction(constructor)){
			classProperties=properties
			properties=constructor
			constructor=function(){}
		}
		$.extend(constructor.prototype, properties||{})
		classProperties && $.extend(constructor, classProperties)
		constructor.extend=extend
		return constructor;
	}
});

function extend(constructor, properties, classProperties){
	var me=this
	if(!$.isFunction(constructor)){
		classProperties=properties
		properties=constructor
		constructor=function(){
			me.apply(this,arguments)
		}
	}
	$.extend(constructor.prototype, me.prototype, properties||{})
	$.extend(constructor, me, classProperties||{})
	return constructor
}

var a=new DOMParser().parseFromString('<a></a>','text/xml'),
	Document=a.constructor,
	Node=a.documentElement.constructor,
	NodeList=a.childNodes.constructor;

$.extend(Node.prototype,{
	attr: function(name, value){
		if(arguments.length==1){
			var attr=this.attributes.getNamedItem(name)
			return attr ? attr.value : undefined
		}else if(value==null)
			this.removeAttribute(name)
		else
			this.setAttribute(name,value)
	},
	remove: Node.prototype.remove || function(){
		this.parentNode.removeChild(this)
	},
	uptrim: function(){
		var parent=this.parentNode
		this.remove()
		if(parent.childNodes.length==0)
			parent.uptrim()
	}
});

$.extend(NodeList.prototype,{
	asArray: function(o){
		o=o||[]
		for(var i=0,len=this.length;i<len;i++)
			o.push(this[i])
		return o
	}
});
		
(function(){
	var rnode=/(\w)?(\[.*\])*(\:.*)*/g, //[tagName][attributes][function]
		rattr=/\[(\w+=\w+)\]/g,
		rnth=/nth-child\((\d+)\)/;
	
	function findEl(node, sel, first) {
		return Array.prototype.concat.apply([],$.map(sel.split(','),function(selector){
			var finds, 
				selectors=selector.split('>'), 
				selector0=selectors.shift(),
				last=selectors.length-1,
				context=selector0.length ? queryEl(node,selector0,false) : [node];

			context.length && $.each(selectors,function(selector, index){
				$.map(context,function(ctx, i){
					if(first && index==last && i>0 && context.length)
						finds=context;
					else
						finds=queryEl(ctx, selector, true)
				})
				context=finds
			})
			finds=finds || context
			return first ? finds[0] : finds
		}));
	}
	
	function queryEl(node,sel,direct){
		var r=rnode.exec(sel), finds;
		rnode.lastIndex=0;
		if(r[1]){
			if(direct){
				finds=node.childNodes.asArray();
				if(r[1]!='*')
					finds=finds.filter(function(a){return a.localName==r[1]})
			}else if(r[1]=='*'){
				throw new Error("Not support: a *")
			}else{
				finds=node.getElementsByTagName(r[1]).asArray()
			}
		}else{
			if(direct)
				finds=node.childNodes.asArray()
			else
				throw new Error("Not support *[a=b]")
		}
			
		if(finds.length && r[2]){
			r[2].replace(rattr,function(a,b){
				var as=b.split('=')
				finds=finds.filter(function(a){
					return a.attr(as[0])==as[1] 
				})
			})
		}
		
		if(finds.length && r[3]){
			switch(r[3]){
			case ':empty':
				finds=finds.filter(function(a){return a.childNodes.length==0})
			break
			case ':not(:empty)':
				finds=finds.filter(function(a){return a.childNodes.length!=0})
			break
			case ':first-child':
				finds=finds.filter(function(a){
					return a.parentNode.firstChild==a
				})
			break
			case ':last-child':
				finds=finds.filter(function(a){
					return a.parentNode.lastChild==a
				})
			default:
				var t;
				if(t=r[3].match(rnth)){
					t=parseInt(t[1]);
					finds=finds.filter(function(a){
						return a.parentNode.childNodes[t]==a
					})
				}
			}
		}
		return finds
	}

	Document.prototype.querySelectorAll=Document.prototype.$=Node.prototype.querySelectorAll=Node.prototype.$=function(selector){
		return findEl(this,selector)
	}
	
	Document.prototype.querySelector=Document.prototype.$1=Node.prototype.querySelector=Node.prototype.$1=function(selector){
		return findEl(this,selector,true)
	}
})();

module.exports=$
