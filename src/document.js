import JSZip from 'jszip'
import {parseString as xml2js} from "xml2js"

import {getable} from "./xmlObject"

function stripPrefix(name){
	return name.split(':').pop()
}
/**
 *  document parser
 *
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse([visitors]))
 */
export default class{
	constructor(parts,raw,props){
		this.parts=parts
		this.raw=raw
		this.props=props
	}

	getPart(name){
		return this.parts[name]
	}

	getBufferPart(name){
		var part=this.parts[name]
		var crc32=part._data.crc32
		var buffer=part.asNodeBuffer()
		buffer.crc32=part._data.crc32=crc32
		return buffer
	}

	getObjectPart(name, option){
		return new Promise((resolve,reject)=>{
			if(this.parts[name])
				xml2js(this.parts[name].asText(),
					Object.assign({tagNameProcessors:[stripPrefix],attrNameProcessors:[stripPrefix]},option||{}),
					(error, result)=>{
						error && console.log(`parsing ${name} with error: ${error.message}`)

						resolve(getable(result))
					})
			else
				resolve()
		})
	}

	parse(){

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
}
