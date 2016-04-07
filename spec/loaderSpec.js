describe("docx4js",function(){
	var docx4js=require("../dist/openxml/docx/document")
		,newDocx=require("./newDocx")
	
	function check(docx,done){
		expect(docx).toBeDefined()
		expect(docx.parts&&docx.raw&&true).toBe(true)
		done()
	}
	$.isNode && describe("loader for node", function(){
		it("can load from file name")
		
		it("can load from buffer")
	})
	
	!$.isNode && describe("loader fro browser", function(){
		it("can load from file input")
		
		it("can load from blob",done=>{
			docx4js.load(newDocx()).then(docx=>check(docx,done))
		})
		
		it("can load from base64 data")
	})
})