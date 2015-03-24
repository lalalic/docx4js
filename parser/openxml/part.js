define([],function(){
	return $.newClass(function(name,doc){
			this.name=name
			this.doc=doc
			this.documentElement=doc.parts[name] && $.parseXML(doc.parts[name].asText()).documentElement
			this.rels={}
			
			var folder="", 
				relName="_rels/"+name+".rels",
				i=name.lastIndexOf('/');
			if(i!==-1){
				folder=name.substring(0,i)
				relName=folder+"/_rels/"+name.substring(i+1)+".rels";
			}
			
			if(!doc.parts[relName]) return;
			//console.log("part:"+name+",relName:"+relName+",folder:"+folder+", text:"+doc.parts[relName].asText())
			$.parseXML(doc.parts[relName].asText())
				.documentElement.childNodes
				.asArray()
				.forEach(function(a, i){
					this.rels[a.getAttribute('Id')]={
						type:a.getAttribute('Type').split('/').pop(),
						target:(folder ? (folder+"/") : '')+a.getAttribute('Target')}
				},this)
		},{
		getRel:function(id){
			var rel=this.rels[id]
			switch(rel.type){
			case 'image':
				return this.doc.getImagePart(rel.target)
			default:
				return this.doc.getPart(rel.target)	
			}		
		},
		
	},{
		is:function(o){
			return o && o.getRel
		}
	})
})