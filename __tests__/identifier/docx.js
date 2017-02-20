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

        it("paragraph", ()=>{
			identify(`<w:p/>`,"p")
        })

        it("run",()=>{
			identify(`<w:r/>`,"r")
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
		
		describe("inline", function(){
			const inline=(type='picture',data='')=>`
				<wp:inline>
					<a:graphic>
						<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/${type}">
							${data}
						<a:/graphicData>
					</a:graphic>
				</wp:inline>
			`
			it("picture",function(){ 
				identify(inline('picture','<a:blip r:embed="unknown"/>'),"inline.picture",{getRel(){}})
			})
			
			it("shape",function(){
				identify(inline('shape'),"inline.shape")
			})
		})
    })

    describe("style", function(){
        it("default P: *p", ()=>{
			expect(identify('<w:pPrDefault/>', "style").id).toBe('*p')
        })

        it("default run: *r", ()=>{
			expect(identify('<w:rPrDefault/>', "style").id).toBe('*r')
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
				</w:abstractNum>`, "numbering")
			expect(model.children.length).toBe(1)
			expect(model.id).toBe("0")
        })
		
		it("list[numbering=1]=2",function(){
			let model=identify(`<w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>`, "style")
			expect(model.numbering).toBe("1")
			expect(model.id).toBe("2")
		})
    })
})
