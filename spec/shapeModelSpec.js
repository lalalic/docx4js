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
		it("image",done=>{
			docx4js.load(newDocx(`
			<w:p>
				<w:r>
					<w:rPr>
						<w:noProof/>
					</w:rPr>
					<w:drawing>
						<wp:inline distT="0" distB="0" distL="0" distR="0">
							<wp:extent cx="5486400" cy="4114800"/>
							<wp:effectExtent l="0" t="0" r="0" b="0"/>
							<wp:docPr id="1" name="Picture 1"/>
							<wp:cNvGraphicFramePr>
								<a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
							</wp:cNvGraphicFramePr>
							<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
								<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
									<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
										<pic:nvPicPr>
											<pic:cNvPr id="0" name="Chrysanthemum.jpg"/>
											<pic:cNvPicPr/>
										</pic:nvPicPr>
										<pic:blipFill>
											<a:blip r:embed="rId5">
												<a:extLst>
													<a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}">
														<a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0"/>
													</a:ext>
												</a:extLst>
											</a:blip>
											<a:stretch>
												<a:fillRect/>
											</a:stretch>
										</pic:blipFill>
										<pic:spPr>
											<a:xfrm>
												<a:off x="0" y="0"/>
												<a:ext cx="5486400" cy="4114800"/>
											</a:xfrm>
											<a:prstGeom prst="rect">
												<a:avLst/>
											</a:prstGeom>
										</pic:spPr>
									</pic:pic>
								</a:graphicData>
							</a:graphic>
						</wp:inline>
					</w:drawing>
				</w:r>
				<w:bookmarkEnd w:id="0"/>
			</w:p>`))
			.then(docx=>{
				check(docx,"image",done)
			}).catch(e=>{fail(e);done()})
		})
		
		it("shape: line, rect, ...",done=>{
			docx4js.load(newDocx(`
			<w:p w:rsidR="00990182" w:rsidRDefault="00B57533">
				<w:r>
					<mc:AlternateContent>
						<mc:Choice Requires="wps">
							<w:drawing>
								<wp:anchor distT="0" distB="0" distL="114300" distR="114300" simplePos="0" relativeHeight="251659264" behindDoc="0" locked="0" layoutInCell="1" allowOverlap="1">
									<wp:simplePos x="0" y="0"/>
									<wp:positionH relativeFrom="column">
										<wp:posOffset>371103</wp:posOffset>
									</wp:positionH>
									<wp:positionV relativeFrom="paragraph">
										<wp:posOffset>1110343</wp:posOffset>
									</wp:positionV>
									<wp:extent cx="2861953" cy="653143"/>
									<wp:effectExtent l="0" t="0" r="14605" b="33020"/>
									<wp:wrapNone/>
									<wp:docPr id="2" name="Straight Connector 2"/>
									<wp:cNvGraphicFramePr/>
									<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
										<a:graphicData uri="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">
											<wps:wsp>
												<wps:cNvCnPr/>
												<wps:spPr>
													<a:xfrm flipV="1">
														<a:off x="0" y="0"/>
														<a:ext cx="2861953" cy="653143"/>
													</a:xfrm>
													<a:prstGeom prst="line">
														<a:avLst/>
													</a:prstGeom>
												</wps:spPr>
												<wps:style>
													<a:lnRef idx="1">
														<a:schemeClr val="accent1"/>
													</a:lnRef>
													<a:fillRef idx="0">
														<a:schemeClr val="accent1"/>
													</a:fillRef>
													<a:effectRef idx="0">
														<a:schemeClr val="accent1"/>
													</a:effectRef>
													<a:fontRef idx="minor">
														<a:schemeClr val="tx1"/>
													</a:fontRef>
												</wps:style>
												<wps:bodyPr/>
											</wps:wsp>
										</a:graphicData>
									</a:graphic>
								</wp:anchor>
							</w:drawing>
						</mc:Choice>
						<mc:Fallback>
							<w:pict>
								<v:line id="Straight Connector 2" o:spid="_x0000_s1026" style="position:absolute;flip:y;z-index:251659264;visibility:visible;mso-wrap-style:square;mso-wrap-distance-left:9pt;mso-wrap-distance-top:0;mso-wrap-distance-right:9pt;mso-wrap-distance-bottom:0;mso-position-horizontal:absolute;mso-position-horizontal-relative:text;mso-position-vertical:absolute;mso-position-vertical-relative:text" from="29.2pt,87.45pt" to="254.55pt,138.9pt" o:gfxdata="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&#xA;" strokecolor="#4579b8 [3044]"/>
							</w:pict>
						</mc:Fallback>
					</mc:AlternateContent>
				</w:r>
			</w:p>
			`))
			.then(docx=>{
				check(docx,"shape",done)
			}).catch(e=>{fail(e);done()})
		})
	
		describe("group", function(){
			
		})
	})
	
})