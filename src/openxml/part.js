export default class part{
	constructor(name,doc){
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
		this.relName=relName
		//console.log("part:"+name+",relName:"+relName+",folder:"+folder+", text:"+doc.parts[relName].asText())
		$.parseXML(doc.parts[relName].asText())
			.documentElement
			.$("Relationship")
			.asArray()
			.forEach(function(a, i){
				this.rels[a.getAttribute('Id')]={
					type:a.getAttribute('Type').split('/').pop(),
					targetMode: a.getAttribute('TargetMode'),
					target:(a.getAttribute('TargetMode')!="External" ? (folder ? (folder+"/") : '') : '')+a.getAttribute('Target')}
			},this)
	}
	getRel(id){
		var rel=this.rels[id]
		if(rel.targetMode=='External')
			return rel.target
		switch(rel.type){
		case 'image':
			return this.doc.getImagePart(rel.target)
		default:
			return this.doc.getPart(rel.target)
		}
	}

	static is(o){
		return o && o.getRel
	}
}
