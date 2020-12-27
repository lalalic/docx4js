import cheerio from "cheerio"
import "../src/cheerio-fn"

describe("convert cheer content to props",()=>{
	const $=cheerio.load(`
    <p:sp>
        <p:nvSpPr>
          <p:cNvPr id="2" name="Title 1">
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
        <p:spPr/>
        <p:txBody>
          <a:bodyPr/>
          <a:lstStyle/>
          <a:p>
	          <a:pPr marL="457200" indent="274320">
				<a:spcAft>
				<a:spcPts val="1200"/>
				</a:spcAft>
			</a:pPr>
            <a:r>
              <a:rPr lang="en-US" dirty="0">
				  <a:solidFill>
		            <a:schemeClr val="tx1"/>
		          </a:solidFill>
			</a:rPr>
              <a:t>test</a:t>
            </a:r>
             <a:r>
              <a:rPr lang="en-US" dirty="0"/>
              <a:t>test</a:t>
            </a:r>
          </a:p>
          <a:p id="1">
            <a:r>
              <a:rPr lang="en-US" dirty="0"/>
              <a:t>test</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>
	`,{xmlMode:true})

	it("attribs as fields, content as object fields",()=>{
		expect($("a\\:pPr").props()).toMatchObject({marL:"457200",spcAft:{}})
	})

	it("object field name  can be renamed in {nameFn}",()=>{
		expect($("a\\:pPr").props({nameFn:k=>k=='spcAft'?'space':k})).toMatchObject({space:{}})
	})

	it("support content filter",()=>{
		expect($("a\\:pPr").props({__filter:":not(a\\:spcAft)"})).not.toMatchObject({spcAft:{}})
	})

	it("specifc node handler by nodeName,opt{[nodeName without namespace]}",()=>{
		expect($("a\\:pPr").props({spcAft:()=>1})).toMatchObject({spcAft:1})
	})

	it("tidy props at end",()=>{
		expect($("a\\:pPr").props({tidy:props=>(props.a=1,props)})).toMatchObject({a:1})
	})

	it("nested content aslo be proped",()=>{
		expect($("p\\:sp>p\\:nvSpPr").props({
			__filter:":not(a\\:extLst)",
			nameFn:k=>k=="spLocks"?'locks':k,
			tidy:({cNvPr={},cNvSpPr={},nvPr={}})=>({...cNvPr,...cNvSpPr,...nvPr})
		})).toMatchObject({
			id: "2",
			locks:  {noGrp: "1"},
			name: "Title 1",
			ph:  {type: "ctrTitle"}
		})
	})

	it(`<a:solidFill><a:schemeClr val="tx1"/></a:solidFill> => {fill:"tx1"}`,()=>{
		expect($("a\\:rPr").props({
			schemeClr:({attribs:{val}})=>val,
			tidy_solidFill:({color})=>color,
			names:{schemeClr:"color", solidFill:"fill"},
		})).toMatchObject({
			fill:"tx1"
		})
	})

	it("attrib can be renamed, and transformed too",()=>{
		expect($("a\\:rPr").props({
			names:{lang:"xlang"},
			lang:x=>1,
		})).toMatchObject({xlang:1})
	})
})
