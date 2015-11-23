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


		return [parse, Document, Element, NodeList, false]
	})(require('xmldom')));

module.exports=require("./parser/openxml/docx/document")
