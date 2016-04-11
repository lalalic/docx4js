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
	describe("controls", function(){
		it("checkbox",done=>
			docx4js.load(newDocx(`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="533008048"/>
						<w14:checkbox>
							<w14:checked w14:val="0"/>
							<w14:checkedState w14:val="2612" w14:font="MS Gothic"/>
							<w14:uncheckedState w14:val="2610" w14:font="MS Gothic"/>
						</w14:checkbox>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						<w:p w:rsidR="00FB57CB" w:rsidRPr="00FB57CB" w:rsidRDefault="007834E2" w:rsidP="00FB57CB">
							<w:r>
								<w:rPr>
									<w:rFonts w:ascii="MS Gothic" w:eastAsia="MS Gothic" w:hAnsi="MS Gothic" w:hint="eastAsia"/>
								</w:rPr>
								<w:t>?</w:t>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`)).then(docx=>check(docx,"control.checkbox",done))
		)
		
		it("combobox",done=>
			docx4js.load(newDocx(`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="1530071921"/>
						<w:comboBox>
							<w:listItem w:value="Choose an item."/>
						</w:comboBox>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						<w:p w:rsidR="007834E2" w:rsidRDefault="007834E2" w:rsidP="007834E2">
							<w:pPr>
								<w:pStyle w:val="Heading3"/>
							</w:pPr>
							<w:r>
								<w:t>Combo box</w:t>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`)).then(docx=>check(docx,"control.combobox",done))
		)
		
		it("date",done=>
			docx4js.load(newDocx(`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="404113128"/>
						<w:date>
							<w:dateFormat w:val="yyyy/M/d"/>
							<w:lid w:val="zh-CN"/>
							<w:storeMappedDataAs w:val="dateTime"/>
							<w:calendar w:val="gregorian"/>
						</w:date>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						<w:p w:rsidR="007834E2" w:rsidRDefault="007834E2" w:rsidP="007834E2">
							<w:pPr>
								<w:pStyle w:val="Heading3"/>
							</w:pPr>
							<w:r>
								<w:t>Date</w:t>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`)).then(docx=>check(docx,"control.date",done))
		)
		
		it("dropdown",done=>
			docx4js.load(newDocx(`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="-1769989727"/>
						<w:dropDownList>
							<w:listItem w:value="Choose an item."/>
						</w:dropDownList>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						<w:p w:rsidR="007834E2" w:rsidRDefault="007834E2" w:rsidP="007834E2">
							<w:pPr>
								<w:pStyle w:val="Heading3"/>
							</w:pPr>
							<w:r>
								<w:t xml:space="preserve">Dropdown </w:t>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`)).then(docx=>check(docx,"control.dropdown",done))
		)
		
		it("gallery",done=>
			docx4js.load(newDocx(`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="-407071892"/>
						<w:showingPlcHdr/>
						<w:docPartList>
							<w:docPartGallery w:val="Quick Parts"/>
						</w:docPartList>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						<w:p w:rsidR="007834E2" w:rsidRPr="007834E2" w:rsidRDefault="007834E2" w:rsidP="007834E2">
							<w:r w:rsidRPr="008E47B2">
								<w:rPr>
									<w:rStyle w:val="PlaceholderText"/>
								</w:rPr>
								<w:t>Choose a building block.</w:t>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`)).then(docx=>check(docx,"control.gallery",done))
		)
		
		it("picture",done=>
			docx4js.load(newDocx(`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="1149792908"/>
						<w:showingPlcHdr/>
						<w:picture/>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						<w:p w:rsidR="007834E2" w:rsidRPr="007834E2" w:rsidRDefault="007834E2" w:rsidP="007834E2">
							<w:r>
								<w:rPr>
									<w:noProof/>
								</w:rPr>
								<w:drawing>
									<wp:inline distT="0" distB="0" distL="0" distR="0">
										<wp:extent cx="1905000" cy="1905000"/>
										<wp:effectExtent l="0" t="0" r="0" b="0"/>
										<wp:docPr id="11" name="Picture 2"/>
										<wp:cNvGraphicFramePr>
											<a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
										</wp:cNvGraphicFramePr>
										<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
											<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
												<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
													<pic:nvPicPr>
														<pic:cNvPr id="0" name="Picture 2"/>
														<pic:cNvPicPr>
															<a:picLocks noChangeAspect="1" noChangeArrowheads="1"/>
														</pic:cNvPicPr>
													</pic:nvPicPr>
													<pic:blipFill>
														<a:blip r:embed="rId20">
															<a:extLst>
																<a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}">
																	<a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0"/>
																</a:ext>
															</a:extLst>
														</a:blip>
														<a:srcRect/>
														<a:stretch>
															<a:fillRect/>
														</a:stretch>
													</pic:blipFill>
													<pic:spPr bwMode="auto">
														<a:xfrm>
															<a:off x="0" y="0"/>
															<a:ext cx="1905000" cy="1905000"/>
														</a:xfrm>
														<a:prstGeom prst="rect">
															<a:avLst/>
														</a:prstGeom>
														<a:noFill/>
														<a:ln>
															<a:noFill/>
														</a:ln>
													</pic:spPr>
												</pic:pic>
											</a:graphicData>
										</a:graphic>
									</wp:inline>
								</w:drawing>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`)).then(docx=>check(docx,"control.picture",done))
		)
		
		it("richtext",done=>
			docx4js.load(newDocx(`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="1253709356"/>
						<w:placeholder>
							<w:docPart w:val="DefaultPlaceholder_1082065158"/>
						</w:placeholder>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						<w:p w:rsidR="007834E2" w:rsidRPr="007834E2" w:rsidRDefault="007834E2" w:rsidP="007834E2">
							<w:pPr>
								<w:pStyle w:val="Heading3"/>
							</w:pPr>
							<w:r>
								<w:t>Rich text</w:t>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`)).then(docx=>check(docx,"control.richtext",done))
		)
		
		it("text",done=>
			docx4js.load(newDocx(`
				<w:sdt>
					<w:sdtPr>
						<w:id w:val="1711603401"/>
						<w:placeholder>
							<w:docPart w:val="DefaultPlaceholder_1082065158"/>
						</w:placeholder>
						<w:text/>
					</w:sdtPr>
					<w:sdtEndPr/>
					<w:sdtContent>
						<w:p w:rsidR="007834E2" w:rsidRDefault="007834E2" w:rsidP="007834E2">
							<w:pPr>
								<w:pStyle w:val="Heading3"/>
							</w:pPr>
							<w:r>
								<w:t>Text</w:t>
							</w:r>
						</w:p>
					</w:sdtContent>
				</w:sdt>`)).then(docx=>check(docx,"control.text",done))
		)
	})
})
	