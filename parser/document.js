/**
 *  a type of document parser
 *  @class Document
 *  @requires module:JSZip
 */
define(['jszip'],function(JSZip){
	return $.newClass(function(parts,raw,name){
		this.parts=parts
		this.raw=raw
		this.name=name
	},{
		getPart:function(name){
			return this.parts[name]
		},
		parse: function(){},
		release: function(){}
	},{
		load: function(inputFile){
			var reader=new FileReader(),
				p=new $.Deferred(),
				DocumentSelf=this
			reader.onload=function(e){
				var raw=new JSZip(e.target.result),parts={}
				raw.filter(function(path,file){
					parts[path]=file
				})
				p.resolve(new DocumentSelf(parts,raw,inputFile.name))
			}
			reader.readAsArrayBuffer(inputFile);
			return p
		}
	})
})