define(['./sdt'],function(SDT){
	return SDT.extend(function(wXml,b,c, name){
		SDT.apply(this,arguments)
		this.key=name.toLowerCase()
		this.value=wXml.$1('>sdtContent').textContent
		if(!this.wDoc.props[this.key])
			this.wDoc.props[this.key]=this.value
	},{
		type:'documentProperty'
	})
})
