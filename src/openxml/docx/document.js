import Base from "../document"
import OfficeDocument from "./officeDocument"

export default class extends Base{
	static ext="docx"
	
	static mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document"

	static OfficeDocument=OfficeDocument
}
