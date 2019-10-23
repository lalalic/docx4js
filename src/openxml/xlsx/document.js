import Base from "../document"
import OfficeDocument from "./officeDocument"

export default class extends Base{
	static ext="xlsx"

	static mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

	static OfficeDocument=OfficeDocument
}
