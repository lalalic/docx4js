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
		
	describe("shapes", function(){
		it("image")
		
		it("line")
		
		it("rect")
		
		it("chart")
		
		it("diagram")
		
		describe("group", function(){
			
		})
	})
	
})