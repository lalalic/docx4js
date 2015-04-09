
/**
 *  some utils
 */
define(['apromise','extend'], function(Deferred,Extend){
	function makeTool(xmlParser, Document, Node, NodeList, scopable){
		var $={
			Deferred:Deferred,
			parseXML: xmlParser,
			extend: Extend,
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
		})
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
		
		if(typeof(Document.prototype.$)=='undefined'){
			Document.prototype.$=Node.prototype.$
			Document.prototype.$1=Node.prototype.$1
		}
		
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
	
	if(typeof(window)!=='undefined'){
		function parser(x){
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
		return window.$=makeTool(parser, Document, Node, NodeList, supportScopeSelector())
	}else
		return makeTool
});
