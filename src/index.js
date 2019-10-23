import docx from "./openxml/docx/document"
import pptx from "./openxml/pptx/document"
import xlsx from "./openxml/xlsx/document"
import drawml from "./openxml/drawml"

import Document from "./openxml/document"
import Part from "./openxml/part"
import OfficeDocument from "./openxml/officeDocument"

export default docx

export {
    docx,pptx,xlsx,drawml,
    Part, Document, OfficeDocument
}
