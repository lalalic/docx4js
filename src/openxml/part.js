import {parseString as parse} from "xml2js"

export default class{
	constructor(name,doc){
		this.name=name
		this.doc=doc
		this.data=doc.parts[name]
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
		
		parse(doc.parts[relName].asText(),{mergeAttrs:true,explicitArray:false}, (error, doc)=>{
			doc.Relationships.Relationship.forEach((a, i)=>{
				this.rels[a.Id]={
					type:a.Type.split('/').pop(),
					targetMode: a.TargetMode,
					target:(a.TargetMode!="External" ? (folder ? (folder+"/") : '') : '')+a.Target}
			})
		})
			
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
