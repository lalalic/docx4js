describe("style visit", function(){
    var load, NULL=()=>1, Ignore={visit:NULL}
    var Docx4js=require('../dist/openxml/docx/document');

    function check(name, done, selector, visit){
        load(NULL,name).then((docx)=>{
            try{
                var found=false
                docx.parse(Docx4js.createVisitorFactory(function(srcModel){
                        if(found)
                            return null
                        switch(typeof(selector)){
                        case 'string':
                            if(srcModel.type!==selector)
                                return Ignore
                        break
                        default:
                            if(!selector(srcModel))
                                return Ignore
                        }
                        return found={visit:()=>visit(srcModel)}
                    })
                )
                if(!found)
                    fail("not found")
            }catch(e){
                fail(e.message)
                console.trace(e.trace)
            }
            done()
        },done)
    }

    function checkStyle(style, expects){
        style.parse([Docx4js.createVisitorFactory(()=>({
            visit(value, name, type){
                if(arguments.length==0) return
                expects && expects(value, name, type)
            }
        }))])
    }
    it("load docx", load=(done, docx)=>{
        return Docx4js.load(__dirname+"/../test/"+(docx||"fs")+".docx").then(function(doc){
            expect(doc).toBeDefined()
            expect(doc.partMain).toBeDefined()
            done()

            return doc
        },(e)=>{
            fail(e.message())
            done()
        })
    })

    describe("basic", function(){
        it("default paragraph style", function(done){
            check("word/styles",done,(a)=>(a.type=="paragraph" && !a.getStyleId()) , (model)=>{
                var style=model.getNamedStyle()
                expect(style).toBeTruthy()
                expect(style.id).toBe("Normal")
                expect(style.name).toBe("Normal")
                expect(style.type).toBe("style.paragraph")
                var styles={inline:{b:{}, i:{}}}
                checkStyle(style, (value, name, type)=>{
                    expect(JSON.stringify(styles[type][name])).toBe(JSON.stringify(value))
                    delete styles[type][name]
                })
                expect(Object.keys(styles.inline).length).toBe(0)
            })
        })

        it("inline direct style", function(done){
            check("word/style.inline", done, (a)=>(a.type=='inline' && a.getDirectStyle()),(model)=>{
                var style=model.getDirectStyle();
                expect(style).toBeDefined()
                var values={color:'#FF0000',sz:20, highlight:'darkMagenta',b:{},i:{},u:{val:'single'}}
                style.parse([{
                    visit(value, name, type){
                        expect(type).toBe('inline')
                        expect(values[name]).toBeDefined()
                        expect(JSON.stringify(values[name])).toBe(JSON.stringify(value))
                        delete values[name]
                    }
                }])
                expect(Object.keys(values).length).toBe(0)
            })
        })

        it("named inline style", function(done){
            check("word/styles",done, (a)=>(a.type=='inline' && a.getStyleId()), (model)=>{
                var style=model.getNamedStyle()
                expect(style).toBeDefined()

                checkStyle(style, (value, name, type)=>{

                })
            })
        })

        it("named paragraph style", function(done){
            check("word/styles", done, (a)=>(a.type=='paragraph' && a.getStyleId()), (model)=>{
                var style=model.getNamedStyle()
                expect(style).toBeDefined()

                checkStyle(style, (value, name, type)=>{

                })
            })
        })

        it("named table style", function(done){
            check("word/styles", done, (a)=>(a.type=='table' && a.getStyleId()), (model)=>{

            })
        })

        it("named list style", function(done){
            check("word/styles", done, (a)=>(a.type=='list'), (model)=>{

            })
        })

        it("section style", function(done){
            check("word/styles", done, 'section', (model)=>{

            })
        })


        it("named style inheritance", function(done){
            check("word/styles", done, (a)=>(a.type=='paragraph' && a.getStyleId() && a.getNamedStyle().getParentStyle()), (model)=>{
                var style=model.getNamedStyle(),
                    basedOn=style.getParentStyle()
                expect(style).toBeDefined()
                expect(basedOn).toBeDefined()

                checkStyle(style, (value, name, type)=>{

                })
            })
        })
    })

    describe("drawing", function(){
        it("image", function(done){
            check("word/image", done, "image", (model)=>{
                expect(model.getImage()).toBeTruthy()
                var style=model.getDirectStyle()
                expect(style).toBeDefined()
                style.parse([{
                    visit(value, name, type){
                        expect(type).toBe(null)
                        console.log(`${name}=${JSON.stringify(value)}`)
                    }
                }])
                fail("need check")
            })
        })

        it("line", function(done){
            check("word/models", done, "shape", (model)=>{
                var style=model.getDirectStyle()
                expect(style).toBeDefined()
                style.parse([{
                    visit(value, name, type){
                        console.log(`${name}=${JSON.stringify(value)}`)
                    }
                }])
                fail("need check")
            })
        })
    })
})
