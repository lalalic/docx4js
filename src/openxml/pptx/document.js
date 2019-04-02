import Base from "../document"
import OfficeDocument from "./officeDocument"

export default class extends Base{
	static ext="pptx"

	static mime="application/vnd.openxmlformats-officedocument.presentationml.presentation"

	static OfficeDocument=OfficeDocument
}
