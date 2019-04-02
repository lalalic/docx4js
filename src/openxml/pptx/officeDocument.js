import Base from "../officeDocument"

export default class extends Base{
    _init(){
		super._init()
        const self=this
        this.content.prototype.slide=function(){
            return self.getRel(this.attr('r:id'))("p\\:sld")
        }
	}

    static identities={
        presentation(wXml,officeDocument){
			const $=officeDocument.content
			return {type:"document", children:$("p\\:presentation").children("p\\:sldIdLst")}
		},

        sldId(wXml,officeDocument){
            return {type:"slide", children:officeDocument.content(wXml).slide().children()}
        }
    }
}
