export default class XmlObject{
	constructor(objectFromXml2Js){
		this.raw=objectFromXml2Js
		this.ns=XmlObject.getNS(this.raw)
	}
	
	get(path){
		return XmlObject.get(path,this.raw, this.ns)
	}
	
	static getNS(xmlobj){
		let withNS=Object.keys(xmlobj).find(a=>a!='$'&&a!='get')
		if(withNS){
			const [n, tag]=withNS.split(':')
			return tag==undefined ? '' : n+':'
		}
		return ''
	}
	
	static get(path, xmlobj, ns){
		if(ns==undefined)
			ns=XmlObject.getNS(xmlObj)
		
		let value=path.split(".").reduce((p,key)=>{
			if(!p)
				return p
			
			if(Array.isArray(p) && p.length==1)
				p=p[0]
	
			if(key!='$' && key.split(':').length==1)
				p=p[`${ns}${key}`]||p[key]
			else
				p=p[key]

			return p
		},xmlobj)
		
		return value
	}
	
	static getable(xmlobj){
		xmlobj.get=function(path,trim=true,ns){
			if(typeof(trim)=='string'){
				ns=trim
				trim=true
			}
			
			let value=XmlObject.get(path,xmlobj, ns||XmlObject.getNS(xmlobj))
			
			if(trim){
				if(Array.isArray(value) && value.length==1)
					value=value[0]
			
				if(value && value.$ && value.$[`${ns}val`]!=undefined)
					value=value.$[`${ns}val`]
			}
			
			if(value && typeof(value)=='object')
				return XmlObject.getable(value)
			return value
		}
		
		return xmlobj
	}
}