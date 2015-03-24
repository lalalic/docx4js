describe("server side parse posibility",function(){
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
	
	it("load docx4js from server side", function(){
		var Docx4js=require('../main.js')
		expect(Docx4js.load).toBeDefined()
	})
	
	it("load docx", function(done){
		var Docx4js=require('../main.js')
		Docx4js.load(__dirname+"/../test/fs.docx").then(function(doc){
			expect(doc).toBeDefined()
			expect(doc.partMain).toBeDefined()
			done()
		},function(error){
			expect(error).toBeFalsy()
			done()
		})
	})
	
	it("", function(){
		
	})
	
})