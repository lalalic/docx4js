define([],function(){
	return $.newClass(function(name,doc){
			this.name=name
			this.doc=doc
			this.root=doc.parts[name] && $.parseXML(doc.parts[name].asText()).documentElement
			this.rels={}
			
			var folder="", 
				relName="_rels/"+name+".rels",
				i=name.lastIndexOf('/'),
				me=this;
			if(i!==-1){
				folder=name.substring(0,i)
				relName=folder+"/_rels/"+name.substring(i+1)+".rels";
			}
			
			if(!doc.parts[relName]) return;
			$('Relationship',$.parseXML(doc.parts[relName].asText()).documentElement)
			.each(function(){
				me.rels[this.getAttribute('Id')]={
					type:this.getAttribute('Type').split('/').pop(),
					target:(folder ? (folder+"/") : '')+this.getAttribute('Target')}
			})
		},{
		getRel:function(id){
			var rel=this.rels[id]
			switch(rel.type){
			case 'image':
				return this.doc.getImageURL(rel.target)
			default:
				return this.doc.getPart(rel.target)	
			}		
		}
	},{
		is:function(o){
			return o && o.getRel
		}
	})
})