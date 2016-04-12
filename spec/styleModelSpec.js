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
	
	describe("styles", function(){
		it("documentStyles",done=>
			docx4js.load(newDocx()).then(docx=>check(docx,"documentStyles",done))
		)
		
		it("document",done=>
			docx4js.load(newDocx()).then(docx=>check(docx,"style.document",done))
		)
		
		it("paragraph",done=>
			docx4js.load(newDocx()).then(docx=>check(docx,"style.paragraph",done))
		)
		
		it("inline",done=>
			docx4js.load(newDocx({"word/styles.xml":`
				<w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont">
					<w:name w:val="Default Paragraph Font"/>
					<w:uiPriority w:val="1"/>
					<w:semiHidden/>
					<w:unhideWhenUsed/>
				</w:style>
			`})).then(docx=>check(docx,"style.inline",done))
		)
		
		it("list", done=>
			docx4js.load(newDocx({"word/numbering.xml":`
				<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" >
					<w:abstractNum w:abstractNumId="0">
						<w:nsid w:val="36965BDB"/>
						<w:multiLevelType w:val="multilevel"/>
						<w:tmpl w:val="0409001D"/>
						<w:lvl w:ilvl="0">
							<w:start w:val="1"/>
							<w:numFmt w:val="decimal"/>
							<w:lvlText w:val="%1)"/>
							<w:lvlJc w:val="left"/>
							<w:pPr>
								<w:ind w:left="360" w:hanging="360"/>
							</w:pPr>
						</w:lvl>
					</w:abstractNum>
					<w:num w:numId="3">
						<w:abstractNumId w:val="0"/>
					</w:num>
				</w:numbering>`})).then(docx=>check(docx,"style.list",done))
		)
		
		it("numbering",done=>
			docx4js.load(newDocx({"word/styles.xml":`
				<w:style w:type="numbering" w:default="1" w:styleId="NoList">
					<w:name w:val="No List"/>
					<w:uiPriority w:val="99"/>
					<w:semiHidden/>
					<w:unhideWhenUsed/>
				</w:style>`})).then(docx=>check(docx,"style.numbering",done))
		)
		
		it("section").pend("no style.section model, used by model/section directly")
		
		it("table",done=>
			docx4js.load(newDocx({"word/styles.xml":`
			<w:style w:type="table" w:default="1" w:styleId="TableNormal">
				<w:name w:val="Normal Table"/>
				<w:uiPriority w:val="99"/>
				<w:semiHidden/>
				<w:unhideWhenUsed/>
				<w:tblPr>
					<w:tblInd w:w="0" w:type="dxa"/>
					<w:tblCellMar>
						<w:top w:w="0" w:type="dxa"/>
						<w:left w:w="108" w:type="dxa"/>
						<w:bottom w:w="0" w:type="dxa"/>
						<w:right w:w="108" w:type="dxa"/>
					</w:tblCellMar>
				</w:tblPr>
			</w:style>`})).then(docx=>check(docx,"style.table",done))
		)
		
	})
})