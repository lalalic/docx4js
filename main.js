require('amd-require');

global.$=require("./parser/tool").apply(null,(function(xmldom){
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
			Node=a.documentElement.constructor,
			NodeList=a.childNodes.constructor
			
		Document.prototype.querySelector=Node.prototype.querySelector=function(selector){
			return addNwmatcher(this.ownerDocument||this).first(selector, this);
		}
		
		Document.prototype.querySelectorAll=Node.prototype.querySelectorAll=function(selector){
			return addNwmatcher(this.ownerDocument||this).select(selector, this);
		}

		return [parse, Document, Node, NodeList, false]
	})(require('xmldom')));

module.exports=require("./parser/openxml/docx/document")