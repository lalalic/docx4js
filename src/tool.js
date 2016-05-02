var isNode=false
try {
	isNode = Object.prototype.toString.call(global.process) === '[object process]'
} catch(e) {

}


function makeTool(xmlParser, Document, Node, NodeList, scopable){
	var $={
		isNode,
		parseXML: xmlParser,
		extend: Object.assign,
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
		}
	})

	var directChildSelector=/((^|,)\s*>)/, id="sxxx"
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
		},
		forEach: Array.prototype.forEach,
		map: Array.prototype.map
	})

	return $
}


if(!isNode){
	window.$=makeTool(...(function(){
	    function parser(x){
	        x=x.trim()
	        if(typeof(DOMParser)!='undefined')
	            return ( new DOMParser() ).parseFromString(x, "text/xml");

	        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	        xmlDoc.async = "false";
	        xmlDoc.loadXML(x);
	        return xmlDoc;
	    }

	    function supportScopeSelector(){
	        try{
	            return document.body.querySelector(':scope>*').length!=0
	        }catch(e){
	            return false
	        }
	    }
	    document.$1=document.querySelector
	    document.$=document.querySelectorAll
	    return [parser, Document, Element, NodeList, supportScopeSelector()]
	})())
}else{
	global.$=makeTool(...(function(xmldom){
		var DOMParser=xmldom.DOMParser,
			DOMImplementation=xmldom.DOMImplementation;

		var nwmatcher = require("nwmatcher");

		function parse(x){
			return new DOMParser().parseFromString(x, "text/xml")
		}

		function addNwmatcher(document) {
			if (!document._nwmatcher) {
				document._nwmatcher = nwmatcher({ document: document });
				document._nwmatcher.configure({ UNIQUE_ID: false });
			}
			return document._nwmatcher;
		}

		var a=parse('<a></a>'),
			Document=a.constructor,
			Element=a.documentElement.constructor,
			NodeList=a.childNodes.constructor

		Document.prototype.querySelector=Element.prototype.querySelector=function(selector){
			return addNwmatcher(this.ownerDocument||this).first(selector, this);
		}

		Document.prototype.querySelectorAll=Element.prototype.querySelectorAll=function(selector){
			return addNwmatcher(this.ownerDocument||this).select(selector, this);
		}

		/**
		 * nwwatcher has unexpected result with namespace on nodeName
		 */
		var _createElementNS=Document.prototype.createElementNS
		Document.prototype.createElementNS=function(){
			var el=_createElementNS.apply(this,arguments)
			el.tagName=el.nodeName=el.localName
			return el
		}

		Object.defineProperty(Element.prototype,"outerHTML", {
			get: function(){
				return new xmldom.XMLSerializer().serializeToString(this)
			}
		})


		return [parse, Document, Element, NodeList, false]
	})(require('xmldom')))
}
