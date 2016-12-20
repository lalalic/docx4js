export default class{
	constructor(name,doc){
		this.name=name
		this.doc=doc
		this.rels={}

		var folder="",
			relName="_rels/"+name+".rels",
			i=name.lastIndexOf('/');
		if(i!==-1){
			folder=name.substring(0,i+1)
			relName=folder+"_rels/"+name.substring(i+1)+".rels";
		}

		if(doc.parts[relName]){
			this.folder=folder
			this.relName=relName
			this.rels=doc.getObjectPart(relName)
		}
		this._init()
	}

	_init(){
		this.content=this.doc.getObjectPart(this.name)
	}

	getRelTarget(type){
		return this.rels(`[Type$="${type}"]`).attr("Target")
	}

	getRelObject(target){
		return this.doc.getObjectPart(this.folder+target)
	}

	getRel(id){
		var rel=this.rels(`Relationship[Id="${id}"]`)
		var target=rel.attr("Target")
		if(rel.attr("TargetMode")==='External')
			return target
		
		switch(rel.attr("Type").split("/").pop()){
		case 'image':
			return URL.createObjectURL(new Blob([this.doc.getBufferPart(this.folder+target)],{type:"image/*"}))
		default:
			return this.getRelObject(target)
		}
	}
}
