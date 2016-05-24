import "./tool"
import JSZip from 'jszip'

/**
 *  a type of document parser
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
	parse(){

	}
	release(){

	}
	factory(){
		return this.constructor.factory.apply(this,arguments)
	}

	static load(inputFile){
		var DocumentSelf=this
		return new Promise((resolve, reject)=>{
			function parse(data, name){
				var raw=new JSZip(data),parts={}
				raw.filter(function(path,file){
					parts[path]=file
				})
				resolve(new DocumentSelf(parts,raw,{
					name:name,
					lastModified:inputFile.lastModified,
					size:inputFile.size
				}))
			}


			if($.isNode){//node
				if(typeof inputFile=='string'){//file name
					require('fs').readFile(inputFile,function(error, data){
						if(error)
							reject(error);
						else if(data){
							parse(data, inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i,''))
						}
					})
				}else {
					parse(inputFile)
				}
			}else{//browser
				if(inputFile instanceof Blob){
					var reader=new FileReader();
					reader.onload=function(e){parse(e.target.result, inputFile.name.replace(/\.docx$/i,''))}
					reader.readAsArrayBuffer(inputFile);
				}else {
					parse(inputFile)
				}
			}

		})
	}

	static get factory(){return null}
}
