var Module=require('module')
var deamdify=require('adeamdify')
var _compile=Module.prototype._compile
Module.prototype._compile=function(content, filename){
	var stream=deamdify(filename)
	var transformed=''
	stream.on('data',function(data){
		transformed+=data
	})
	stream.end(content)
	return _compile.apply(this,[transformed, filename])
}