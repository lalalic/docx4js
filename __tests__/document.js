//jest.unmock("sax")
jest.unmock("xml2js")
jest.unmock("../lib/document")
jest.unmock("../lib/xmlObject")

describe("document", function(){
	const Document=require("../lib/document")
	const parts={
		a:{
			asText(){
				return `<a:document a:background="black"><a:p>text</a:p></a:document>`
			}
		}
	}
	
	it("loadable, and parsable", function(){
		var doc=new Document()
		expect(Document.load).toBeDefined()
		expect(doc.parse && doc.getPart && doc.getBufferPart && doc.getObjectPart).toBeDefined()
	})
	
	it("getable object without namespace object part", function(){
		return new Document(parts).getObjectPart("a")
			.then(o=>{
				expect(o.get).toBeDefined()
				expect(o.document).toBeDefined()
				expect(o.get("document.$.background")).toBe("black")
				expect(o.get("document.p")).toBe("text")
			})
	})
	
	it("get image part with crc32", function(){
		var buffer={},
			bufferPart=new Document({
				a:{
					_data:{crc32:12345},
					asNodeBuffer(){
						return buffer
					}
				}
			}).getBufferPart("a")
		expect(bufferPart).toBe(buffer)
		expect(bufferPart.crc32).toBe(12345)
	})
})