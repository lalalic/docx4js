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

    it("render to document, master, layout, and slides",()=>{
        return Document.load(`${__dirname}/../files/loader.pptx`).then(doc=>{
            const createElement=jest.fn()
            const found={}
            doc.render((type,props,children)=>{
                found[type]=props
            })
            expect(found.document).toBeDefined()
            expect(found.document.size).toBeDefined()
            expect(found.slideMaster).toBeDefined()
            expect(found.slideLayout).toBeDefined()
            expect(doc.getPart(found.slideLayout.master)).toBeDefined()
            expect(found.slide).toBeDefined()
            expect(doc.getPart(found.slide.layout)).toBeDefined()
        })
    })
})
