{
    pic(wXml, officeDocument){
        let blip=officeDocument.content(wXml).find("a\\:blip")
        let rid=blip.attr('r:embed')||blip.attr('r:link')
        return {type:"picture",...officeDocument.getRel(rid)}
    },
    sp(wXml, officeDocument){
        return {type:"shape", children:officeDocument.content(wXml).find(">wps\\:txbx>w\\:txbxContent").children().toArray()}
    },
    
    graphicFrame(wXml, officeDocument){
        //chart: c:chart, diagram: dgm:relIds, table:a:tbl
        return {type:"chart"}
    },

}
