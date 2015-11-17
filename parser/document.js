/**
 *  a type of document parser
 *  @class Document
 *  @requires module:JSZip
 */
define(['jszip'],function(JSZip){
	return $.newClass(function(parts,raw,props){
		this.parts=parts
		this.raw=raw
		this.props=props
	},{
		getPart:function(name){
			return this.parts[name]
		},
		getImagePart:function(name){
			var part=this.parts[name]
			var crc32=part._data.crc32
			var buffer=part[JSZip.support.nodebuffer ? 'asNodeBuffer' : 'asArrayBuffer']()
			buffer.crc32=part._data.crc32=crc32
			return buffer
		},
		parse: function(){},
		release: function(){},
		factory: function(){
			return this.constructor.factory.apply(this,arguments)
		}
	},{
		load: function(inputFile){
			var DocumentSelf=this;
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
				if(typeof FileReader!='undefined'){//browser
					var reader=new FileReader();
					reader.onload=function(e){parse(e.target.result, inputFile.name.replace(/\.docx$/i,''))}
					reader.readAsArrayBuffer(inputFile);
				}else{//server side
					var a=require;
					a('fs').readFile(inputFile,function(error, data){
						if(error)
							reject(error);
						else if(data){
							parse(data, inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i,''))
						}
					})
				}
			})
		},
		factory: null
	})
})
