var JSZip=require("jszip")


function newDocx(content){
    if(typeof(content)=='string')
        content={"word/document.xml":content}
    var zip=new JSZip()

    content=content||{}

    for(var key in DOCX){
        let defaultValue=DOCX[key]
            ,defaultType=typeof(defaultValue)

        let value=content[key]
        let finalValue="<a/>"
        if(value){
            if(defaultType=='function')
                finalValue=defaultValue(value)
            else
                finalValue=value
        }else if(defaultType=='function')
            finalValue=defaultValue()
        else if(defaultType=='string')
            finalValue=defaultValue

        zip.file(key,finalValue)
    }

    if(JSZip.support.nodebuffer){
        return zip.generate({type:"nodebuffer"})
    }else{
        var blob=zip.generate({type:"blob", mimeType: "application/docx", compression: "DEFLATE"})
        blob.name="a.docx"
        return blob
    }
}

exports.newDocx=newDocx

var  DOCX={
"[Content_Types].xml":
`<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
	<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
	<Default Extension="xml" ContentType="application/xml"/>
	<Default Extension="jpg" ContentType="image/jpeg"/>
	<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
	<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
	<Override PartName="/word/stylesWithEffects.xml" ContentType="application/vnd.ms-word.stylesWithEffects+xml"/>
	<Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
	<Override PartName="/word/webSettings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml"/>
	<Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>
	<Override PartName="/word/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
	<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
	<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`,

"_rels/.rels":
`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
	<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
	<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
	<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,

"word/_rels/document.xml.rels":(a="")=>
`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
	<Relationship Id="rId8" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml"/>
	<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
	<Relationship Id="rId7" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.jpg"/>
	<Relationship Id="rId2" Type="http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects" Target="stylesWithEffects.xml"/>
	<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
	<Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="http://news.sina.com.cn/" TargetMode="External"/>
	<Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="http://jd.com/" TargetMode="External"/>
	<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings" Target="webSettings.xml"/>
	<Relationship Id="rId9" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
    ${a}
</Relationships>`,

"word/document.xml": (a)=>
`<w:document
xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
xmlns:w10="urn:schemas-microsoft-com:office:word"
xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
mc:Ignorable="w14 wp14">
<w:body>
${a||`<w:p w:rsidR="00F755B0" w:rsidRDefault="00F755B0" w:rsidP="008F2DD4">
    <w:r>
		<w:t>On the Insert tab, the galleries include items that are designed to coordinate with the overall look of your document.</w:t>
	</w:r>
</w:p>`}
<w:sectPr w:rsidR="005F49AF">
    <w:pgSz w:w="12240" w:h="15840"/>
    <w:pgMar w:top="1440" w:right="1800" w:bottom="1440" w:left="1800" w:header="708" w:footer="708" w:gutter="0"/>
    <w:cols w:space="708"/>
    <w:docGrid w:linePitch="360"/>
</w:sectPr>
</w:body></w:document>`,

"word/theme/theme1.xml":false,
"word/settings.xml":false,
"word/webSettings.xml":false,
"word/stylesWithEffects.xml":false,
"docProps/core.xml":false,
"word/styles.xml": (a)=>
`<w:styles>
    <w:docDefaults>
		<w:rPrDefault>
			<w:rPr>
				<w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorEastAsia" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi"/>
				<w:sz w:val="22"/>
				<w:szCs w:val="22"/>
				<w:lang w:val="en-US" w:eastAsia="zh-CN" w:bidi="ar-SA"/>
			</w:rPr>
		</w:rPrDefault>
		<w:pPrDefault>
			<w:pPr>
				<w:spacing w:after="200" w:line="276" w:lineRule="auto"/>
			</w:pPr>
		</w:pPrDefault>
	</w:docDefaults>

${a || `<w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
</w:style>`}

</w:styles>
`,
"word/fontTable.xml":false,
"docProps/app.xml":false
}
