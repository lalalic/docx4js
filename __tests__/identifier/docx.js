import docx4js from "../../src"

describe("model identifier", function(){
	function identify(content,expected, officeDocument={}){
		let $=docx4js.parseXml(content)
		let node=$.root().contents().get(0)
		expect(!!node).toBe(true)
		let identified=docx4js.OfficeDocument.identify(node,Object.assign({content:$},officeDocument))
		
		expect(identified.type).toBe(expected)
		
		return identified
	}
    describe("content", function(){
        it("document", ()=>{
			identify(`<w:document><w:body/></w:document>`,"document")
        })
		
		
		
		describe("section", function(){
			const xml=a=>`
				<w:document>
					<w:body>
						${a||""}
						<w:sectPr/>
					</w:body>
				</w:document>				
			`
			it("section",()=>{
				identify(`<w:sectPr/>`,"section")
			})
			
			it("<w:sectPr/>", ()=>{
				let {children:sections}=identify(xml(),"document")
				expect(sections.length).toBe(1)
				let [first]=sections
				expect(first.content.length).toBe(0)
			})
			
			it('<w:p id="1"/><w:p id="2"/><w:sectPr/>', ()=>{
				let {children:sections}=identify(xml('<w:p id="1"/><w:p id="2"/>'),"document")
				expect(sections.length).toBe(1)
				let [first]=sections
				expect(first.content.length).toBe(2)
				let [p1,p2]=first.content
				expect(p1.attribs.id).toBe("1")
				expect(p2.attribs.id).toBe("2")
			})
			
			it('<w:p id="1"/><w:p id="2"/><w:p id="3"><w:sectPr/></w:p><w:p/><w:p/><w:sectPr/>', ()=>{
				let {children:sections}=identify(xml('<w:p id="1"/><w:p id="2"/><w:p id="3"><w:sectPr/></w:p><w:p id="4"/><w:p id="5"/>'),"document")
				expect(sections.length).toBe(2)
				let [first,second]=sections
				expect(first.content.length).toBe(3)
				expect(second.content.length).toBe(2)
				
				let [p1,p2,p3]=first.content
				expect(p1.attribs.id).toBe("1")
				expect(p2.attribs.id).toBe("2")
				expect(p3.attribs.id).toBe("3")
				
				let[p4,p5]=second.content
				expect(p4.attribs.id).toBe("4")
				expect(p5.attribs.id).toBe("5")
			})
		
		})

        it("paragraph", ()=>{
			identify(`<w:p/>`,"p")
        })

        it("run",()=>{
			identify(`<w:r/>`,"r")
        })
		
		it("object",()=>{
			let found=identify('<w:object/>',"object")
			expect(found.children.length).toBe(0)
		})

        describe("sdt",function(){
			const sdt=(pr,content)=>`
						<w:sdt>
							<w:sdtPr>
								${pr||"<w:unknown/>"}
							</w:sdtPr>
							<w:sdtContent>
								${content||'<w:t>hello</w:t>'}
							</w:sdtContent>
						</w:sdt>
						`
			it("property", function(){
				let {name,value}=identify(sdt('<w:dataBinding w:xpath="a/name/b"/>','<w:t>good</w:t>'),"property")
				expect(name).toBe("name")
				expect(value).toBe("good")
			})
			
			it("controls[text,picture,docPartList,comboBox,dropDownList,date,checkbox]",function(){
				"text,picture,docPartList,comboBox,dropDownList,date,checkbox".split(",")
					.forEach(a=>identify(sdt(`<w:${a}>`),`control.${a}`))
			})
			
			it("block container", function(){
				"p,tbl,tr,tc".split(",")
					.forEach(a=>identify(sdt(null,`<w:${a}/>`),"block"))
			})
			
			it("inline container",function(){
				"r,t".split(",")
					.forEach(a=>identify(sdt(null,`<w:${a}/>`),"inline"))
			})
        })

        it("table",()=>{
			identify(`<w:tbl/>`,"tbl")
        })
		
		it("tr",()=>{
			identify(`<w:tr/>`,"tr")
			let model=identify(`<w:tr><w:trPr><w:tblHeader/></w:trPr></w:tr>`,"tr")
			expect(model.isHeader).toBe(true)
        })
		
		
		it.skip("fldChar", function(){
			identify(`<w:unknown w:fldCharType="begin"/>`,"fldChar")
		})
		
		it("drawing.inline", ()=>{
			let model=identify(`
			<wp:inline>
				<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
					<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
						<pic:pic/>
						<pic:pic/>
					</a:graphicData>
				</a:graphic>
			</wp:inline>`,"drawing.inline")
			expect(model.children.length).toBe(2)
		})
		
		it("drawing.anchor", ()=>{
			let model=identify(`
			<wp:anchor>
				<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
					<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
						<pic:pic/>
						<pic:pic/>
					</a:graphicData>
				</a:graphic>
			</wp:anchor>
			`,"drawing.anchor")
			expect(model.children.length).toBe(2)
		})
		
		it("drawing.anchor.group", ()=>{
			let model=identify(`
			<wp:anchor>
				<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
					<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingGroup">
						<wp:gpg>
							<pic:pic/>
							<pic:pic/>
						</wp:pgp>
					</a:graphicData>
				</a:graphic>
			</wp:anchor>
			`,"drawing.anchor")
			expect(model.children.length).toBe(2)
		})
		
		
    })

    describe("style", function(){
        it("document default", ()=>{
			expect(identify('<w:docDefaults/>', "style").id).not.toBeDefined()
        })

        it("normal paragraph: Normal",()=>{
			expect(identify('<w:style w:styleId="Normal"></w:style>', "style").id).toBe('Normal')
        })
    })

    describe("numbering", function(){
        it("numbering with levels", ()=>{
			let model=identify(`
				<w:abstractNum w:abstractNumId="0">
					<w:lvl w:ilvl="0" w:tplc="04090001"/>
				</w:abstractNum>`, "abstractNum")
			expect(model.id).toBe("0")
        })
		
		it("list[numbering=1]=2",function(){
			let model=identify(`<w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>`, "num")
			expect(model.abstractNum).toBe("1")
			expect(model.id).toBe("2")
		})
    })
})
