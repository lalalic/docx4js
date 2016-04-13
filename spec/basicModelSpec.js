"use strict"

describe("docx4js model factory can identify", function(){
	let newDocx=require("./newDocx"),
		docx4js=require("../lib/openxml/docx/document"),
		going={visit:a=>1}
	
	function check(docx,model,done){
		docx.parse(docx4js.createVisitorFactory(function(wordModel){
			if(wordModel.type==model){
				done()
			}else
				return going
		}))
	}
	
	it("document",done=>
		docx4js.load(newDocx()).then(docx=>check(docx,"document",done))
	)
	
	it("body",done=>
		docx4js.load(newDocx()).then(docx=>check(docx,"body",done))
	)
	
	it("sections",done=>
		docx4js.load(newDocx()).then(docx=>check(docx,"section",done))
	)
	
	it("paragraph",done=>
		docx4js.load(newDocx("<w:p></w:p>")).then(docx=>check(docx,"paragraph",done))
	)
	
	it("inline",done=>
		docx4js.load(newDocx("<w:p><w:r></w:r></w:p>")).then(docx=>check(docx,"inline",done))
	)
	
	it("text",done=>
		docx4js.load(newDocx("<w:p><w:r><w:t>hello</w:t></w:r></w:p>")).then(docx=>check(docx,"text",done))
	)
	
	describe("table", function(){
		it("table",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>")).then(docx=>check(docx,"table",done))
		)
		
		it("row",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>")).then(docx=>check(docx,"row",done))
		)
		
		it("cell",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>")).then(docx=>check(docx,"cell",done))
		)
	})
	
	it("br")
	
	it("hyperlink")
	
	it("tab")
	
	it("symbol")
	
	it("softHyphen")
	
	it("noBreakHyphen")
	
	it("range")
	
	it("equation")
	
	it("heading")
	
	it("headingInline")
	
	describe("list", function(){
		
	})
})