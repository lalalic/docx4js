import zipDoc from "../src/document"
import openxml from "../src/openxml/document"
import pptx from "../src/openxml/pptx/document"
import docx4js from "../src"

describe("loader", function(){
    var loader=`${__dirname}/files/loader`

	it("can load any zip", function(){
		return zipDoc.load(`${loader}.zip`).then(doc=>{
			expect(!!doc.render).toBe(true)
		})
	})

	it("parsed without line-feed text node", function(){
		const content=`
		<a>hello</a>
		`
		let doc=new zipDoc({
				content:{
					asText(){
						return content
					}
				},
				trimed: {
					asText(){
						return content.trim()
					}
				}
			})
		expect(doc.getObjectPart("content").root().length)
			.toBe(doc.getObjectPart("trimed").root().length)

		let root=doc.getObjectPart("content").root().get(0)
		expect(root.children.length).toBe(1)
	})

    it("can be cloned", function(){
        return openxml.load(`${loader}.docx`).then(docx=>{
            let cloned=docx.clone()
            expect(cloned instanceof openxml).toBe(true)

			expect(Object.keys(docx.parts)).toEqual(Object.keys(cloned.parts))
			expect(docx.officeDocument.content==cloned.officeDocument.content).toBe(false)
			expect(docx.officeDocument.content.xml()).toBe(cloned.officeDocument.content.xml())
        })
    })
	
	it("can be saved", function(){
		const fs=require("fs")
		fs.writeFile=jest.fn((file,data, f)=>f())
		
		return openxml.load(`${loader}.docx`).then(docx=>{
			return docx.save("test.docx").then(data=>{
				expect(fs.writeFile).toBeCalled()
				return openxml.load(data) 
			})
		})
	})


    describe("openxml", function(){
        const check=doc=>{
            expect(!!doc.main).toBe(true)
            expect(!!doc.officeDocument).toBe(true)
        }
        it("can load docx", function(){
            return openxml.load(`${loader}.docx`).then(check)
        })

        it("can load xslx", function(){
            return openxml.load(`${loader}.xlsx`).then(check)
        })

        it("can load pptx", function(){
            return openxml.load(`${loader}.pptx`).then(check)
        })
		
		it("can create", function(){
			return docx4js.create().then(check)
		})

		it("can extract text from pptx",()=>{
			return pptx.load(`${loader}.pptx`)
				.then(pptx=>{
					const slides=new Proxy([[[]]], {
						get(target, key){
							if(key==="current"){
								return target[target.length-1]
							}else if(key==="p"){
								const slide=slides.current
								return slide[slide.length-1]
							}
							return target[key]
						}
					})
					pptx.render(function createElement(type,props,children){
						switch(type){
							case "slideLayout":
								slides.current.splice(0,Number.MAX_SAFE_INTEGER,[])
							break
							case "slide":
								slides.current.pop()
								slides.push([[]])
							break
							case "p":
								slides.current.push([])
							break
							case "t":
								slides.p.push(children)
							break	
						}
						return {type,props,children}
					})
					slides.pop()
					const content=slides.map((paragraphs,i)=>`slide #${i+1}:\n${paragraphs.map(a=>a.join("")).join("\n")}`).join("\n")
					return content
				}).then(parsed=>{
					expect(parsed.indexOf("slide #1")).not.toBe(-1)
					expect(parsed.indexOf("slide #2")).not.toBe(-1)
				})
		})
    })
})
