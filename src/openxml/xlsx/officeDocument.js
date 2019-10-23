import Base from "../officeDocument"
import Part from "../part"
import drawml from "../drawml"

export default class OfficeDocument extends Base{
    _init(){
        super._init()
        this._assignRel("tableStyles,viewProps,presProps".split(","))
    }

    render(createElement, identify=this.constructor.identify.bind(this.constructor)){
        return this.renderNode(this.content("p\\:presentation").get(0), createElement, identify)
    }

    static identities={
    }
}
