export function getable(xmlobj){
	typeof(xmlobj)=='object' && (xmlobj.get=function(path,trim=true){
		let value=path.split(".").reduce((p,key)=>{
			if(!p)
				return p

			if(Array.isArray(p) && p.length==1)
				p=p[0]

			p=p[key]

			return p
		},this)

		if(trim){
			if(Array.isArray(value) && value.length==1)
				value=value[0]

			if(value && value.$ && value.$.val!=undefined)
				value=value.$.val
		}

		if(value && typeof(value)=='object')
			return getable(value)
		return value
	})

	return xmlobj
}