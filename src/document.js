import "./tool"
import JSZip from 'jszip'

/**
 *  document parser
 *
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse([visitors]))
 */
export default class Document{
	constructor(parts,raw,props){
		this.parts=parts
		this.raw=raw
		this.props=props
	}
	getPart(name){
		return this.parts[name]
	}
	getImagePart(name){
		var part=this.parts[name]
		var crc32=part._data.crc32
		var buffer=part[JSZip.support.nodebuffer ? 'asNodeBuffer' : 'asArrayBuffer']()
		buffer.crc32=part._data.crc32=crc32
		return buffer
	}

	/**
	 *  parse docx with visitors created from visitor factories one by one
	 */
	parse(visitorFactories){

	}

	/**
	 * release resources after parse
	 */
	release(){

	}

	/**
	 *  create parser for a word model
	 */
	factory(wordXml, docParser, parentParser){
		if(!this._factory){
			let a=new this.constructor.Factory
			this._factory=function(){
				return a.create(...arguments)
			}
		}
		return this._factory(...arguments)
	}

	static clone(doc){
		let {parts,raw,props}=doc
		return new Document(parts,raw,props)
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
				raw.filter(function(path,file){
					parts[path]=file
				})
				resolve(new DocumentSelf(parts,raw,props))
			}


			if($.isNode){//node
				if(typeof inputFile=='string'){//file name
					require('fs').readFile(inputFile,function(error, data){
						if(error)
							reject(error);
						else if(data){
							parse(data, {name:inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i,'')})
						}
					})
				}else {
					parse(inputFile)
				}
			}else{//browser
				if(inputFile instanceof Blob){
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
			}

		})
	}

	static Factory=class {
		create(wordXml, docParser, parentParser){

		}
	}
}
