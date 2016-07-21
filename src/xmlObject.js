export default class XmlObject{
	constructor(objectFromXml2Js){
		this.raw=objectFromXml2Js
		this.ns='w:'
	}
	
	get(path){
		return XmlObject.get(path,this.raw, this.ns)
	}
	
	static getNS(xmlobj){
		const [n, tag]=Object.keys(xmlobj)[0].split(':')
		return tag==undefined ? '' : n+':'
	}
	
	static get(path, xmlobj, ns){
		if(ns==undefined)
			ns=XmlObject.getNS(xmlObj)
		
		return path.split(".").reduce((p,key)=>{
			if(!p)
				return p
			
			if(key!='$' && key.split(':').length==1)
				key=`${ns}${key}`
			
			if(Array.isArray(p=p[key]) && p.length==1)
				p=p[0]
			
			if(p && p.$ && p.$[`${ns}val`]!=undefined)
				return p.$[`${ns}val`]
			
			return p
		},xmlobj)
	}
	
	static getable(xmlobj){
		xmlobj.get=function(path){
			let value=XmlObject.get(path,xmlobj, 'w:')
			if(value && typeof(value)=='object')
				return XmlObject.getable(value)
			return value
		}
		
		return xmlobj
	}
}