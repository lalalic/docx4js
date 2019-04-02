import Document from "../../src/openxml/pptx/document"

describe("model identifier", ()=>{
    function identify(content,expected, officeDocument={}){
		let $=Document.parseXml(content)
		let node=$.root().contents().get(0)
		expect(!!node).toBe(true)
		let identified=Document.OfficeDocument.identify(node,Object.assign({content:$},officeDocument))

		if(expected)
			expect(identified.type).toBe(expected)

		return identified
	}

    it("document", ()=>{
        identify(`<p:presentation></p:presentation>`,"document")
    })

    describe("parse",()=>{
        const load=()=>{
            return Document.load(`${__dirname}/../files/loader.pptx`)
        }

        it("get slide content",()=>{
            return load().then(doc=>{
                const slides=doc.officeDocument.content("p\\:sldId")
                expect(slides.length).toBe(1)
                expect(slides.eq(0).slide().is(":has(p\\:cSld)")).toBe(true)
            })
        })
    })
})
