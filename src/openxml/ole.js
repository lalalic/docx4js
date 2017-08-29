import OLE from "cfb"

export function parse(data){
	let ole=OLE.parse(data)
	let content=ole.find("!ole10Native").content
	let start=content.slice(0,Math.min(content.length/2,512)).lastIndexOf(0)+1
	let end=content.indexOf(0,Math.min(start,content.length/2))-1
	return new TextDecoder("utf-8").decode(new Uint8Array(content.slice(start,end)))
}