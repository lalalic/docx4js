import Part from "./part"

export default class extends Part{
    static identify(wXml, officeDocument){
        const identities=this.identities
        const tag=wXml.name.split(":").pop()
        if(identities[tag])
            return identities[tag](...arguments)

        return tag
    }

    static identities={
        
    }
}
