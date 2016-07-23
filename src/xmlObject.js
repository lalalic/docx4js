export default class XmlObject{
	constructor(objectFromXml2Js){
		this.raw=objectFromXml2Js
	}

	get(path){
		return XmlObject.get(path,this.raw)
	}

	static get(path, xmlobj){
		let value=path.split(".").reduce((p,key)=>{
			if(!p)
				return p

			if(Array.isArray(p) && p.length==1)
				p=p[0]

			p=p[key]

			return p
		},xmlobj)

		return value
	}

	static getable(xmlobj){
		xmlobj.get=function(path,trim=true){
			let value=XmlObject.get(path,xmlobj)

			if(trim){
				if(Array.isArray(value) && value.length==1)
					value=value[0]

				if(value && value.$ && value.$.val!=undefined)
					value=value.$.val
			}

			if(value && typeof(value)=='object')
				return XmlObject.getable(value)
			return value
		}

		return xmlobj
	}
}
