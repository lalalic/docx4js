define(['../document','./part'],function(BaseDocument,Part){
	return BaseDocument.extend(function(){
			BaseDocument.apply(this,arguments)
			var rels=this.rels={}
			$.each(new Part("",this).rels,function(id,rel){
				rels[rel.type]=rel.target
			})
			this.partMain=new Part(this.rels['officeDocument'],this)
		},{
		vender:"Microsoft",
		product:'Office 2010',
		getPart:function(name){
			var part=this.parts[name] || ((name=this.rels[name])&&this.parts[name])
			if(!part)
				return null
				
			if(Part.is(part)) 
				return part
				
			return this.parts[name]=new Part(name,this)
		},
		getImageURL:function(name){
			return URL.createObjectURL(new Blob([this.parts[name].asArrayBuffer()],{type:"image/*"}))
		}
	})
})