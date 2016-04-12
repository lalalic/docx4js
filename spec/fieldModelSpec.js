"use strict"

describe("docx4js model factory can identify", function(){
	let newDocx=require("./newDocx"),
		docx4js=require("../dist/openxml/docx/document"),
		going={visit(){}}
	
	function check(docx,model,done){
		var models=model.split(",")
		docx.parse(docx4js.createVisitorFactory(function(wordModel){
			models=models.filter(a=>wordModel.type!=`field.${a}`)
			if(models.length==0){
				done()
			}else
				return going
		}))
	}

	describe("fields", function(){
		it("date",done=>
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
				</w:p>`)).then(docx=>check(docx,"date",done))
		)
		
		it("page",done=>
			docx4js.load(newDocx(`
			<w:p>
				<w:pPr>
					<w:rPr>
						<w:noProof/>
					</w:rPr>
				</w:pPr>
				<w:r>
					<w:fldChar w:fldCharType="begin"/>
				</w:r>
				<w:r>
					<w:instrText xml:space="preserve"> PAGE   \* MERGEFORMAT </w:instrText>
				</w:r>
				<w:r>
					<w:fldChar w:fldCharType="separate"/>
				</w:r>
				<w:r>
					<w:rPr>
						<w:noProof/>
					</w:rPr>
					<w:t>8</w:t>
				</w:r>
				<w:r>
					<w:rPr>
						<w:noProof/>
					</w:rPr>
					<w:fldChar w:fldCharType="end"/>
				</w:r>
			</w:p>
			`)).then(docx=>check(docx,"page",done))
		)
		
		it("ref",done=>
			docx4js.load(newDocx(`
			<w:p>
				<w:pPr>
					<w:rPr>
						<w:b/>
						<w:bCs/>
					</w:rPr>
				</w:pPr>
				<w:r>
					<w:rPr>
						<w:b/>
						<w:bCs/>
					</w:rPr>
					<w:fldChar w:fldCharType="begin"/>
				</w:r>
				<w:r>
					<w:instrText xml:space="preserve"> REF _Ref404176384 \h </w:instrText>
				</w:r>
				<w:r>
					<w:rPr>
						<w:b/>
						<w:bCs/>
					</w:rPr>
					<w:instrText xml:space="preserve"> \* MERGEFORMAT </w:instrText>
				</w:r>
				<w:r>
					<w:rPr>
						<w:b/>
						<w:bCs/>
					</w:rPr>
				</w:r>
				<w:r>
					<w:rPr>
						<w:b/>
						<w:bCs/>
					</w:rPr>
					<w:fldChar w:fldCharType="separate"/>
				</w:r>
				<w:r>
					<w:t>Cross-Reference</w:t>
				</w:r>
				<w:r>
					<w:rPr>
						<w:b/>
						<w:bCs/>
					</w:rPr>
					<w:fldChar w:fldCharType="end"/>
				</w:r>
			</w:p>`)).then(docx=>check(docx,"ref",done))
		)
		
		it("hyperlink").pend("I can't create a hyperlink field")
		
		it("toc, pageref",done=>
			docx4js.load(newDocx(`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="-65651569"/>
						<w:docPartObj>
							<w:docPartGallery w:val="Table of Contents"/>
							<w:docPartUnique/>
						</w:docPartObj>
					</w:sdtPr>
					<w:sdtEndPr>
						<w:rPr>
							<w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorEastAsia" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi"/>
							<w:noProof/>
							<w:color w:val="auto"/>
							<w:sz w:val="22"/>
							<w:szCs w:val="22"/>
							<w:lang w:eastAsia="zh-CN"/>
						</w:rPr>
					</w:sdtEndPr>
					<w:sdtContent>
						<w:p w:rsidR="00713BA9" w:rsidRDefault="00713BA9">
							<w:pPr>
								<w:pStyle w:val="TOCHeading"/>
							</w:pPr>
							<w:r>
								<w:t>Contents</w:t>
							</w:r>
						</w:p>
						<w:p w:rsidR="00713BA9" w:rsidRDefault="00713BA9">
							<w:pPr>
								<w:pStyle w:val="TOC1"/>
								<w:tabs>
									<w:tab w:val="right" w:leader="dot" w:pos="9350"/>
								</w:tabs>
								<w:rPr>
									<w:noProof/>
								</w:rPr>
							</w:pPr>
							<w:r>
								<w:fldChar w:fldCharType="begin"/>
							</w:r>
							<w:r>
								<w:instrText xml:space="preserve"> TOC \\o "1-3" \\h \\z \\u </w:instrText>
							</w:r>
							<w:r>
								<w:fldChar w:fldCharType="separate"/>
							</w:r>
							<w:hyperlink w:anchor="_Toc448232125" w:history="1">
								<w:r w:rsidRPr="00DB57E8">
									<w:rPr>
										<w:rStyle w:val="Hyperlink"/>
										<w:noProof/>
									</w:rPr>
									<w:t>Always Models</w:t>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:tab/>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:fldChar w:fldCharType="begin"/>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:instrText xml:space="preserve"> PAGEREF _Toc448232125 \h </w:instrText>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:fldChar w:fldCharType="separate"/>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:t>1</w:t>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:fldChar w:fldCharType="end"/>
								</w:r>
							</w:hyperlink>
						</w:p>
						<w:p w:rsidR="00713BA9" w:rsidRDefault="00713BA9">
							<w:pPr>
								<w:pStyle w:val="TOC1"/>
								<w:tabs>
									<w:tab w:val="right" w:leader="dot" w:pos="9350"/>
								</w:tabs>
								<w:rPr>
									<w:noProof/>
								</w:rPr>
							</w:pPr>
							<w:hyperlink w:anchor="_Toc448232126" w:history="1">
								<w:r w:rsidRPr="00DB57E8">
									<w:rPr>
										<w:rStyle w:val="Hyperlink"/>
										<w:noProof/>
									</w:rPr>
									<w:t>Inline (noBreakHyphen SoftHyphen symbol tab hyperlink)</w:t>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:tab/>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:fldChar w:fldCharType="begin"/>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:instrText xml:space="preserve"> PAGEREF _Toc448232126 \h </w:instrText>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:fldChar w:fldCharType="separate"/>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:t>1</w:t>
								</w:r>
								<w:r>
									<w:rPr>
										<w:noProof/>
										<w:webHidden/>
									</w:rPr>
									<w:fldChar w:fldCharType="end"/>
								</w:r>
							</w:hyperlink>
						</w:p>
						<w:p w:rsidR="00713BA9" w:rsidRDefault="00713BA9">
							<w:r>
								<w:rPr>
									<w:b/>
									<w:bCs/>
									<w:noProof/>
								</w:rPr>
								<w:fldChar w:fldCharType="end"/>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`)).then(docx=>check(docx,"toc,pageref",done))
		)
	})
})