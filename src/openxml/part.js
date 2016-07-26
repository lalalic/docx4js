import {parseString as parse} from "xml2js"
import {PassThrough} from "stream"
import sax from "sax"

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
			return this.doc.getBufferPart(rel.target)
		default:
			return this.doc.getPart(rel.target)
		}
	}
	
	asXmlObject(node){
		let $=node.$=node.attributes
		delete node.attributes
		delete node.parent
		delete node.name
		Object.keys($).forEach(a=>{
			let as=a.split(':')
			if(as.length==2){
				$[as[1]]=$[a]
				delete $[a]
			}
		})
		return node
	}
	
	getContentStream(){
		let stream=new PassThrough()
		stream.end(new Buffer(this.data.asUint8Array()))
		return stream.pipe(sax.createStream(true,{xmlns:false}))
	}
	
	parse(){
		return Promise.resolve()
	}
}
