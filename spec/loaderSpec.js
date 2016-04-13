describe("docx4js",function(){
	var docx4js=require("../lib/openxml/docx/document")
		,newDocx=require("./newDocx")
		,aDocx=`./spec/test/models.docx`
	
	function check(docx,done){
		expect(docx).toBeDefined()
		expect(docx.parts&&docx.raw&&true).toBe(true)
		done()
	}
	$.isNode && describe("loader for node", function(){
		it("can load from a string as file name", done=>{
			docx4js.load(aDocx).then(docx=>check(docx,done))
		})
		
		it("can load from buffer")
			.pend("supported by jszip directly")
	})
	
	!$.isNode && describe("loader fro browser", function(){
		it("can load from blob, including file input",done=>{
			docx4js.load(newDocx()).then(docx=>check(docx,done))
		})
		
		it("can load from base64 data")
			.pend("supported by jszip directly")
	})
})