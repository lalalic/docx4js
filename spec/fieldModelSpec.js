"use strict"

describe("docx4js model factory can identify", function(){
	let newDocx=require("./newDocx"),
		docx4js=require("../dist/openxml/docx/document"),
		going={visit:a=>1}
	
	function check(docx,model,done){
		docx.parse(docx4js.createVisitorFactory(function(wordModel){
			if(wordModel.type==model){
				done()
			}else
				return going
		}))
	}

	xdescribe("fields", function(){

		var FieldBegin=require("../dist/openxml/docx/model/fieldBegin")
		var model=null
		beforeEach(function(){
			let _factory=FieldBegin.factory
			spyOn(FieldBegin,"factory").and.callFake(()=>{
				return model=_factory.apply(FieldBegin,arguments)
			})
		})
		
		function checkField(docx,type,done){
			docx.parse(docx4js.createVisitorFactory(function(wordModel){
				console.info(wordModel.type)
				return going
			}))
			expect(FieldBegin.factory).toHaveBeenCalled()
			expect(model.type).toBe(`field.${type}`)
			done()
		}
		it("date",done=>{
			docx4js.load(newDocx(`
				<w:p>
					<w:r>
						<w:fldChar w:fldCharType="begin"/>
					</w:r>
					<w:r>
						<w:instrText xml:space="preserve"> DATE   \* MERGEFORMAT </w:instrText>
					</w:r>
					<w:r>
						<w:fldChar w:fldCharType="separate"/>
					</w:r>
					<w:r w:rsidR="00DB68C3">
						<w:rPr>
							<w:noProof/>
						</w:rPr>
						<w:t>28-Apr-15</w:t>
					</w:r>
					<w:r>
						<w:rPr>
							<w:noProof/>
						</w:rPr>
						<w:fldChar w:fldCharType="end"/>
					</w:r>
				</w:p>`)).then(docx=>checkField(docx,"date",done))
		}
		)
		
		it("hyperlink",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>")).then(docx=>checkField(docx,"hyperlink",done))
		)
		
		it("page",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>")).then(docx=>checkField(docx,"page",done))
		)
		
		it("pageref",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>")).then(docx=>checkField(docx,"pageref",done))
		)
		
		it("ref",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>")).then(docx=>checkField(docx,"ref",done))
		)
		
		it("toc",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>")).then(docx=>checkField(docx,"toc",done))
		)
	})
})