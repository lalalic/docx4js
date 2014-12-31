/**
 *  the following does NOT work, don't know why
 *  global.Docx4JS=module.exports=require("./index")
 */
global.$=require("./parser/tool")
global.Docx4JS=module.exports=require("./parser/openxml/docx/document")