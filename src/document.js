import JSZip, {ZipObject} from 'jszip'
import cheer from "cheerio"
import {Parser, DomHandler} from "htmlparser2"

/**
 *  document parser
 *
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse())
 */
export default class ZipDocument{
	static ext="unknown"
	static mime="application/zip"

	constructor(parts,raw,props){
		this.parts=parts
		this.raw=raw
		this.props=props
		this._shouldReleased=new Map()
	}

	getPart(name){
		return this.parts[name]
	}

	getDataPart(name){
		let part=this.parts[name]
		let crc32=part._data.crc32
		let data=part.asUint8Array()//unsafe call, part._data is changed
		data.crc32=part._data.crc32=crc32//so keep crc32 on part._data for future
		return data
	}

	getDataPartAsUrl(name,type="*/*"){
		let part=this.parts[name]
		let crc32=part._data.crc32
		if(!this._shouldReleased.has(crc32)){
			this._shouldReleased.set(crc32,URL.createObjectURL(new Blob([this.getDataPart(name)],{type})))
		}
		return this._shouldReleased.get(crc32)
	}

	getPartCrc32(name){
		let part=this.parts[name]
		let crc32=part._data.crc32
		return crc32
	}

	release(){
		for(let [, url] of this._shouldReleased){
			window.URL.revokeObjectURL(url)
		}
	}

	getObjectPart(name){
		const part=this.parts[name]
		if(!part)
			return null
		else if(part.cheerio)
			return part
		else
			return this.parts[name]=this.constructor.parseXml(part.asText())
	}
	
	parse(domHandler){

	}

	render(){

	}
	
	serialize(){
		let newDoc=new JSZip()
		Object.keys(this.parts).forEach(path=>{
			let part=this.parts[path]
			if(part.cheerio){
				newDoc.file(path,part.xml())
			}else{
				newDoc.file(path,part._data, part.options)
			}
		})
		return newDoc
	}

	save(file,options){
		file=file||this.props.name||`${Date.now()}.docx`
		
		let newDoc=this.serialize()
		
		if(typeof(document)!="undefined" && window.URL && window.URL.createObjectURL){
			let data=newDoc.generate({...options,type:"blob",mimeType:this.constructor.mime})
			let url = window.URL.createObjectURL(data)
			let link = document.createElement("a");
			document.body.appendChild(link)
			link.download = file
			link.href = url;
			link.click()
			document.body.removeChild(link)
			window.URL.revokeObjectURL(url)
		}else{
			let data=newDoc.generate({...options,type:"nodebuffer"})
			return new Promise((resolve,reject)=>
				require("f"+"s").writeFile(file,data,error=>{
					error ? reject(error) : resolve(data)
				})
			)
		}
	}

	clone(){
		let zip=new JSZip()
		let props= props ? JSON.parse(JSON.stringify(this.props)) : props
		let parts=Object.keys(this.parts).reduce((state, k)=>{
			let v=this.parts[k]
			if(v.cheerio){
				state[k]=this.constructor.parseXml(v.xml())
			}else{
				zip.file(v.name,v._data,v.options)
				state[k]=zip.file(v.name)
			}
			return state
		},{})
		return new this.constructor(parts,zip, props)
	}

	/**
	 *  a helper to load document file

	 *  @param inputFile {File} - a html input file, or nodejs file
	 *  @return {Promise}
	 */

	static load(inputFile){
		const DocumentSelf=this

		if(inputFile instanceof ZipDocument)
			return Promise.resolve(inputFile)

		return new Promise((resolve, reject)=>{
			function parse(data, props={}){
				try{
					let raw=new JSZip(data),parts={}
					raw.filter((path,file)=>parts[path]=file)
					resolve(new DocumentSelf(parts,raw,props))
				}catch(error){
					reject(error)
				}
			}

			if(typeof inputFile=='string'){//file name
				require('fs').readFile(inputFile,function(error, data){
					if(error)
						reject(error);
					else if(data){
						parse(data, {name:inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i,'')})
					}
				})
			}else if(inputFile instanceof Blob){
				var reader=new FileReader();
				reader.onload=function(e){
					parse(e.target.result, (inputFile.name ? {
							name:inputFile.name.replace(/\.docx$/i,''),
							lastModified:inputFile.lastModified,
							size:inputFile.size
						} : {size:inputFile.size}))
				}
				reader.readAsArrayBuffer(inputFile);
			}else {
				parse(inputFile)
			}
		})
	}

	static create(){
		return this.load(`${__dirname}/../templates/blank.${this.ext}`)
	}

	static parseXml(data){
		try{
			let opt={xmlMode:true,decodeEntities: false}
			let handler=new ContentDomHandler(opt)
			new Parser(handler,opt).end(data)
			let parsed=cheer.load(handler.dom,opt)
			if(typeof(parsed.cheerio)=="undefined")
				parsed.cheerio="customized"
			return parsed
		}catch(error){
			console.error(error)
			return null
		}
	}
}

class ContentDomHandler extends DomHandler{
	_addDomElement(el){
		if(el.type=="text" && (el.data[0]=='\r' || el.data[0]=='\n'))
			;//remove format whitespaces
		else
			return super._addDomElement(el)
	}
}
