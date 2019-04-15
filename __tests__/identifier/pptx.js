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

    describe("render",()=>{
        const load=(content)=>{
            return Document.load(`${__dirname}/../files/loader.pptx`).then(doc=>{
                const $slide1=doc.officeDocument.getRelObject("slides/slide1.xml")
                const OfficeDocument=doc.officeDocument.constructor
                const identify=OfficeDocument.identify.bind(OfficeDocument)
                if(content)
                    content=$slide1(content).insertAfter("p\\:spTree>p\\:grpSpPr").toArray().find(a=>a.name)
                const createElementx=jest.fn((type,{node, type:_, key, ...props},children)=>({type,props,children}))
                return {
                    doc,
                    $slide1,
                    content,
                    renderNode:(node,createElement=createElementx)=>doc.officeDocument.renderNode(node,createElement, identify)
                }
            })
        }

        it("document, master, layout, and slides",()=>{
            return load().then(({doc})=>{
                const createElement=jest.fn()
                const found={}
                doc.render((type,props,children)=>{
                    found[type]=props
                })
                expect(found.document).toBeDefined()
                expect(found.document.sldSz).toBeDefined()
                expect(found.slideMaster).toBeDefined()
                expect(found.slideLayout).toBeDefined()
                expect(doc.getPart(found.slideLayout.master)).toBeDefined()
                expect(found.slide).toBeDefined()
                expect(doc.getPart(found.slide.layout)).toBeDefined()
            })
        })

        xit("shape",()=>{
            return load(`
            <p:sp>
              <p:nvSpPr>
                <p:cNvPr id="2" name="Title">
                  <a:extLst>
                    <a:ext uri="{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}">
                      <a16:creationId xmlns:a16="http://schemas.microsoft.com/office/drawing/2014/main" id="{F766C7A4-FAD7-704D-9C71-D17787E65F57}"/>
                    </a:ext>
                  </a:extLst>
                </p:cNvPr>
                <p:cNvSpPr>
                  <a:spLocks noGrp="1"/>
                </p:cNvSpPr>
                <p:nvPr>
                  <p:ph type="ctrTitle"/>
                </p:nvPr>
              </p:nvSpPr>
              <p:spPr>
                <xfrm/>
                <prstGeom/>
                <solidFill/>
                <effectLst/>
                <ln/>
                <sp3d/>
                <scene3d/>
              </p:spPr>
              <p:txBody>
                <a:bodyPr vert="horz" rtlCol="0" anchor="ctr" anchorCtr="0"/>
                <a:lstStyle>
                    <a:lvl2pPr algn="r">
                        <a:buClr>
                            <a:srgbClr val="00B0F0"/>
                        </a:buClr>
                        <a:buFont typeface="Wingdings"/>
                        <a:buChar char="q"/>
                        <a:buAutoNum type="alphaUcPeriod" startAt="2"/>
                    </a:lvl2pPr>
                </a:lstStyle>
                <a:p>
                  <a:r>
                    <a:rPr lang="en-US" dirty="0"/>
                    <a:t>test</a:t>
                  </a:r>
                </a:p>
                <a:p>
                  <a:r>
                    <a:rPr lang="en-US" dirty="0"/>
                    <a:t>test</a:t>
                  </a:r>
                </a:p>
              </p:txBody>
            </p:sp>`).then(({doc,$slide1:$, content, renderNode})=>{
                expect(renderNode(content)).toMatchObject({type:"shape",
                    props:{
                        id:"2", locks:{noGrp:"1"},placeholder:{type:"ctrTitle"},
                        fill:{},transform:{x:0},geometry:{},effects:{},outline:{},shape3d:{},scene3d:{},
                    },
                    children:[{
                        type:"textBox",
                        props:{vert:"horz",anchorCtr:"0",
                            list:{
                                "2":{
                                    fonts:{},
                                    char:"q",
                                    autoNum:{
                                        type:"alphaUcPeriod",
                                        startAt:"2",
                                    }
                                }
                            }
                        },
                        children:[{type:"p"},{type:"p"}]
                    }]
                })
            })
        })

        xit("paragraph style",()=>{
            return load(`<a:p>
                <a:pPr marL="457200" indent="274320">
                    <a:spcAft>
                        <a:spcPts val="1200"/>
                    </a:spcAft>
                    <a:spcBef>
                        <a:spcPts val="1200"/>
                    </a:spcAft>
                    <a:lnSpc>
                        <a:spcPct val="200000"/>
                    </a:lnSpc>
                </a:pPr>
                </a:p>`).then(({content, renderNode})=>{
                    expect(renderNode(content)).toMatchObject({type:"p", props:{"after": 16, "before": 16, "indent": 18288, "marginLeft": 2}})
                })
        })

        xit("run style",()=>{
            return load(`
                <a:r>
                  <a:rPr lan="en-US" sz="2400" b="1" i="1" u="sng" strike="dblStrike" dirty="0" smtClean="0">
                    <a:uFill>
                      <a:solidFill>
                        <a:srgbClr val="FF00FF"/>
                      </a:solidFill>
                    </a:uFill>
                    <a:solidFill>
                      <a:srgbClr val="FF00FF"/>
                    </a:solidFill>
                    <a:ln w="50800" cap="rnd" cmpd="dbl">
                        <a:solidFill>
                            <a:srgbClr val="FFFF00"/>
                        </a:solidFill>
                        <a:prstDash val="dash"/>
                    </a:ln>
                    <a:latin typeface="+mn-lt"/>
                    <a:hlinkClick/>
                </a:rPr>
                  <a:t>DANGEROUS</a:t>
              </a:r>
              `).then(({content, renderNode})=>{
                expect(renderNode(content)).toMatchObject({type:"r",
                    props:{dirty:"0",size:24,fonts:{}, underlineFill:{},outline:{},fill:{}, href:""},
                    children:[{type:"t"}]
                })
            })
        })

        it("pic",()=>{

        })

        it("chart",()=>{

        })
    })
})
