import JSZip, {ZipObject} from 'jszip'
import cheer from "cheerio"
import {Parser, DomHandler} from "htmlparser2"
let uuid=0
/**
 *  document parser
 *
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse())
 */
export default class ZipDocument{
	constructor(parts,raw,props){
		this.parts=parts
		this.raw=raw
		this.props=props
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

	save(){

	}

	clone(){
		return this
		let zip=new JSZip()
		let props= props ? JSON.parse(JSON.stringify(this.props)) : props
		let parts=Object.keys(this.parts).reduce((state, k)=>{
			let v=this.parts[k]
			if(v.cheerio)
				state[k]=v.root().clone()
			else{

				state[k]=new v.constructor(v.name, v._data, v.options)
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
		var DocumentSelf=this
		return new Promise((resolve, reject)=>{
			function parse(data, props={}){
				var raw=new JSZip(data),parts={}
				raw.filter((path,file)=>parts[path]=file)
				resolve(new DocumentSelf(parts,raw,props))
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
					parse(e.target.result, {
							name:inputFile.name.replace(/\.docx$/i,''),
							lastModified:inputFile.lastModified,
							size:inputFile.size
						})
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
			let opt={xmlMode:true}
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
		if(typeof(el.id)=="undefined" && el.type=='tag'){
			el.attribs.id=`a${uuid++}`
		}

		if(el.type=="text" && (el.data[0]=='\r' || el.data[0]=='\n'))
			;//remove format whitespaces
		else
			return super._addDomElement(el)
	}
}
