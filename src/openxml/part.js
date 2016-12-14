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
		var rel=this.rels[id]
		if(rel.targetMode=='External')
			return rel.target
		switch(rel.type){
		case 'image':
			return this.doc.getBufferPart(rel.target)
		default:
			return this.doc.getPart(rel.target)
		}
	}
}
