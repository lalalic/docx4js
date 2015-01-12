
/**
*  some utils extended on jquery
*/
var $={
	Deferred:require('apromise'),
	parseXML: (DOMParser ? function(x){
			return ( new DOMParser() ).parseFromString(x, "text/xml");
		} : function(x) {
			var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(x);
			return xmlDoc;
		}),
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

var DOMParser=require('xmldom').DOMParser;
var a=new DOMParser().parseFromString('<a></a>','text/xml'),
	Node=a.documentElement.constructor,
	NodeList=a.documentElement.getElementsByTagName('a').constructor;

	
var elRe = /([.#:[])([-\w]+)(?:=([-\w]+)])?]?/g
function findEl(node, sel, first) {
	var el
	, i = 0
	, out = []
	, rules = ["_"]
	, tag = sel.replace(elRe, function(_, o, s, v) {
		rules.push(
			o == "." ? "(' '+_.className+' ').indexOf(' "+s+" ')>-1" :
			o == "#" ? "_.id=='"+s+"'" :
			"_.getAttribute('"+s+"')"+(v?"=='"+v+"'":"")
		)
		return ""
	}) || "*"
	, els = node.getElementsByTagName(tag)
	, fn = Function("_", "return " + rules.join("&&"))

	for (; el = els[i++]; ) if (fn(el)) {
		if (first) return el
		out.push(el)
	}
	return first ? null : out
}



$.extend(Node.prototype,{
	$: function(selector){
		if(!directChildSelector.test(selector))
			return this.querySelectorAll(selector)
		else if(scopable)
			return this.querySelectorAll(selector.split(',').map(function(a){
					return a.trim().charAt(0)=='>' ? ':scope'+a : a
				}).join(','))
		else if(this.id){
			return this.querySelectorAll(selector.split(',').map(function(a){
					//return  '#'+this.id+((a=a.trim()).charAt(0)=='>' ? '' : ' ')+a
					return (a=a.trim()).charAt(0)=='>' ? a.substring(1) : a
				},this).join(',')) 
		}else{
			this.id=id
			var nodes=this.querySelectorAll(selector.split(',').map(function(a){
					//IE can't find '#xx', @todo: fix it later
					//return  '#'+this.id+((a=a.trim()).charAt(0)=='>' ? '' : ' ')+a
					return (a=a.trim()).charAt(0)=='>' ? a.substring(1) : a
				},this).join(','))
			delete this.id
			return nodes
		}
	},
	$1:function(selector){
		if(!directChildSelector.test(selector))
			return this.querySelector(selector)
		else if(scopable)
			return this.querySelector(selector.split(',').map(function(a){
					return (a=a.trim()).charAt(0)=='>' ? ':scope'+a : a
				}).join(','))
		else if(this.id){
			return this.querySelector(selector.split(',').map(function(a){
					//return  '#'+this.id+((a=a.trim()).charAt(0)=='>' ? '' : ' ')+a
					return (a=a.trim()).charAt(0)=='>' ? a.substring(1) : a
				},this).join(',')) 
		}else{
			this.id=id
			var nodes=this.querySelector(selector.split(',').map(function(a){
					//return  '#'+this.id+((a=a.trim()).charAt(0)=='>' ? '' : ' ')+a
					return (a=a.trim()).charAt(0)=='>' ? a.substring(1) : a
				},this).join(','))
			delete this.id
			return nodes
		}
	},
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
})

$.extend(NodeList.prototype,{
	asArray: function(o){
		o=o||[]
		for(var i=0,len=this.length;i<len;i++)
			o.push(this[i])
		return o
	}
})
module.exports=$
