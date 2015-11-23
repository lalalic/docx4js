window.$=require('./parser/tool').apply(null,(function(){
    function parser(x){
        if(typeof(DOMParser)!='undefined')
            return ( new DOMParser() ).parseFromString(x, "text/xml");

        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(x);
        return xmlDoc;
    }

    function supportScopeSelector(){
        try{
            return document.body.querySelector(':scope>*').length!=0
        }catch(e){
            return false
        }
    }
    document.$1=document.querySelector
    document.$=document.querySelectorAll
    return [parser, Document, Element, NodeList, supportScopeSelector()]
})())

module.exports=require("./parser/openxml/docx/document")
