export default class Document extends require("./paragraph"){
	constructor(wXml,wDoc,mParent){
		super(wXml,wDoc,mParent)
		wDoc.style.setDefault(this)
	}

	isDefault(){
		return true
	}

	static get type(){return 'style.document'}
}
