import Base from "../document"
import OfficeDocument from "./officeDocument"

export default class extends Base{
	static get ext(){return 'docx'}

	static OfficeDocument=OfficeDocument
}
