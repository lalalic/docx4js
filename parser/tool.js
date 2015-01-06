
/**
*  some utils extended on jquery
*/
var $={
	Deferred:require('deferred'),
	parseXML: (DOMParser ? function(x){
			return ( new DOMParser() ).parseFromString(x, "text/xml");
		} : function(x) {
			var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(x);
			return xmlDoc;
		}),
	extend: (function(){//port from extend 
		var hasOwn = Object.prototype.hasOwnProperty;
		var toString = Object.prototype.toString;
		var undefined;

		var isPlainObject = function isPlainObject(obj) {
			'use strict';
			if (!obj || toString.call(obj) !== '[object Object]') {
				return false;
			}

			var has_own_constructor = hasOwn.call(obj, 'constructor');
			var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
			// Not own constructor property must be Object
			if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.
			var key;
			for (key in obj) {}

			return key === undefined || hasOwn.call(obj, key);
		};

		return function extend() {
			'use strict';
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0],
				i = 1,
				length = arguments.length,
				deep = false;

			// Handle a deep copy situation
			if (typeof target === 'boolean') {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
				target = {};
			}

			for (; i < length; ++i) {
				options = arguments[i];
				// Only deal with non-null/undefined values
				if (options != null) {
					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && Array.isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

						// Don't bring in undefined values
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		}		
	})(),
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
