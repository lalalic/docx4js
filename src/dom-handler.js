import {EventEmitter} from "events"

export class DomHandler extends EventEmitter{
    createElement(type,props,children){
        return {type,props,children}
    }
}

export default DomHandler
