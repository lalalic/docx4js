jest.unmock("cheerio")
jest.unmock("jszip")
jest.unmock("../src/document")
jest.unmock("../src/openxml/document")

const zipDoc=require("../src/document")
const openxml=require("../src/openxml/document")

describe("loader", function(){
    var loader=`${__dirname}/files/loader`
    describe("zip", function(){
        it("can load any zip", function(){
            return zipDoc.load(`${loader}.zip`).then(doc=>{
                expect(!!doc.render).toBe(true)
            })
        })
    })

    describe("openxml", function(){
        const check=doc=>{
            expect(!!doc.main).toBe(true)
            expect(!!doc.officeDocument).toBe(true)
        }
        fit("can load docx", function(){
            return openxml.load(`${loader}.docx`).then(check)
        })

        itx("can load xslx", function(){
            return openxml.load(`${loader}.xlsx`).then(check)
        })

        itx("can load pptx", function(){
            return openxml.load(`${loader}.pptx`).then(check)
        })
    })
})
