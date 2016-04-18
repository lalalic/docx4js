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
		docx4js.load(newDocx()).then(docx=>check(docx,"paragraph",done))
	)

	it("inline",done=>
		docx4js.load(newDocx()).then(docx=>check(docx,"inline",done))
	)

	it("text",done=>
		docx4js.load(newDocx()).then(docx=>check(docx,"text",done))
	)

	describe("table", function(){
		it("table",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>")).then(docx=>check(docx,"table",done))
		)

		it("row",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>")).then(docx=>check(docx,"row",done))
		)

		it("cell",done=>
			docx4js.load(newDocx("<w:tbl><w:tr><w:tc>hello</w:tc></w:tr></w:tbl>"))
			.then(docx=>check(docx,"cell",done))
		)
	})

	it("br", done=>
		docx4js.load(newDocx(`<w:p><w:r><w:br/></w:r><w:p>`))
		.then(docx=>check(docx,"br", done))
	)

	it("hyperlink", done=>
		docx4js.load(newDocx(`
			<w:p>
				<w:hyperlink r:id="rId8" w:history="1">
		          <w:r w:rsidRPr="00A40242">
		            <w:rPr>
		              <w:rStyle w:val="Hyperlink"/>
		            </w:rPr>
		            <w:t>lazy dog.</w:t>
		          </w:r>
		          <w:proofErr w:type="gramEnd"/>
		        </w:hyperlink>
			</w:p>`))
		.then(docx=>check(docx,"hyperlink",done))
	)

	it("tab",done=>
		docx4js.load(newDocx(`<w:p><w:r><w:tab/></w:r><w:p>`))
		.then(docx=>check(docx, "tab", done))
	)

	it("symbol")

	it("softHyphen")

	it("noBreakHyphen", done=>
		docx4js.load(newDocx(`
			<w:p>
				<w:r>
		  			<w:noBreakHyphen/>
				  	<w:t xml:space="preserve"> over the </w:t>
				</w:r>
			</w:p>`)).then(docx=>check(docx,"noBreakHyphen",done))
	)

	it("bookmark range: bookmarkEnd", done=>{
		docx4js.load(newDocx(`
			<w:p>
		      <w:bookmarkStart w:id="0" w:name="_GoBack"/>
		      <w:r>
		        <w:t>The quick brown fox jumps over the lazy dog.</w:t>
		      </w:r>
		    </w:p>
		    <w:bookmarkEnd w:id="0"/>
			`)).then(docx=>check(docx,"bookmarkEnd",done))
	})

	it("equation", done=>{
		docx4js.load(newDocx(`
			<w:p w:rsidR="00A40242" w:rsidRDefault="00A40242">
		      <w:r>
		        <w:t>Equation</w:t>
		      </w:r>
		      <w:proofErr w:type="gramStart"/>
		      <w:r>
		        <w:t>:</w:t>
		      </w:r>
		      <m:oMath>
		        <m:r>
		          <w:rPr>
		            <w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math"/>
		          </w:rPr>
		          <m:t>A</m:t>
		        </m:r>
		        <w:proofErr w:type="gramEnd"/>
		        <m:r>
		          <w:rPr>
		            <w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math"/>
		          </w:rPr>
		          <m:t>=π</m:t>
		        </m:r>
		        <m:sSup>
		          <m:sSupPr>
		            <m:ctrlPr>
		              <w:rPr>
		                <w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math"/>
		              </w:rPr>
		            </m:ctrlPr>
		          </m:sSupPr>
		          <m:e>
		            <m:r>
		              <w:rPr>
		                <w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math"/>
		              </w:rPr>
		              <m:t>r</m:t>
		            </m:r>
		          </m:e>
		          <m:sup>
		            <m:r>
		              <w:rPr>
		                <w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math"/>
		              </w:rPr>
		              <m:t>2</m:t>
		            </m:r>
		          </m:sup>
		        </m:sSup>
		      </m:oMath>
		    </w:p>`)).then(docx=>check(docx,"equation",done))
	})

	it("heading", done=>{
		docx4js.load(newDocx(`
			<w:p>
		      <w:pPr>
		        <w:outlineLvl w:val="0"/>
		      </w:pPr>
		      <w:r>
		        <w:t xml:space="preserve">The quick </w:t>
		      </w:r>
		      <w:r>
		        <w:t xml:space="preserve">brown fox jumps </w:t>
		      </w:r>
		      <w:r>
		        <w:t>over the lazy dog.</w:t>
		      </w:r>
		    </w:p>`)).then(docx=>check(docx,"heading",done))
	})

	it("headingChar", done=>{
		docx4js.load(newDocx(`
			<w:p>
		      <w:r>
				 <w:rPr>
				  <w:outlineLvl w:val="0"/>
				</w:rPr>
				<w:t xml:space="preserve">The quick </w:t>
		      </w:r>
		      <w:r>
		        <w:t xml:space="preserve">brown fox jumps </w:t>
		      </w:r>
		      <w:r>
		        <w:t>over the lazy dog.</w:t>
		      </w:r>
		    </w:p>`)).then(docx=>check(docx,"headingChar",done))
	})

	describe("list", function(){

	})
})
