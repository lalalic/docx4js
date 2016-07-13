import Style from '../style'
import Inline from './inline'
import Numbering from './numbering'
export default class Paragraph extends Style{
	getOutlineLevel(v){
		if((v=this._val('outlineLvl'))!=null)
			return parseInt(v)
		if((v=this.getParentStyle())!=null && v.getOutlineLevel)
			return v.getOutlineLevel()
		return -1
	}
	getNumId(v){
		if((v=this._val('numId'))!=null)
			return v
		if((v=this.getParentStyle())!=null && v.getNumId)
			return v.getNumId()
		return -1
	}
	asNumberingStyle(){
		return Numbering.prototype.asNumberingStyle.call(this,...arguments)
	}
	_iterate(f, factories, visitors){
		var pr=this.wXml.$1('pPr')
		pr && new this.constructor.Properties(pr,this.wDoc,this).parse(visitors);

		(pr=this.wXml.$1('rPr')) && new Inline.Properties(pr,this.wDoc,this).parse(visitors);

		(pr=this.wXml.$1('numPr')) && new Numbering.Properties(pr,this.wDoc,this).parse(visitors);

		(pr=this.wXml.$1('framePr')) && new this.constructor.FrameProperties(pr,this.wDoc,this).parse(visitors);
	}

	static get type(){return 'style.paragraph'}

	static get Properties(){return Properties}

	static get FrameProperties(){return FrameProperties}
}
class Properties extends Style.Properties{
	jc(x){
		return x.attr('w:val')
	}
	ind(x){
		return this.asObject(x, a=>this.pt2Px(this.asPt(a)))
	}
	spacing(x){
		var r=this.asObject(x), o={}

		if(!r.beforeAutospacing && r.beforeLines)
			o.top=this.pt2Px(this.asPt(r.beforeLines))
		else if(r.before)
			o.top=this.pt2Px(this.asPt(r.before))

		if(!r.afterAutospacing && r.afterLines)
			o.bottom=this.pt2Px(this.asPt(r.afterLines))
		else if(r.after)
			o.bottom=this.pt2Px(this.asPt(r.after))

		if(!r.line)
			return o

		switch(x.lineRule){
		case 'atLeast':
		case 'exact':
			o.lineHeight=this.pt2Px(this.asPt(x.line))
			break
		case 'auto':
		default:
			o.lineHeight=(parseInt(r.line)*100/240)+'%'
		}
		o.lineRule=x.lineRule
		return o
	}
	pBdr(x){
		let r={}
		let bdr=Inline.Properties.prototype.bdr.bind(this)
		Array.from(x.childNodes).forEach(a=>a.localName && (r[a.localName]=bdr(a)))
		return r
	}
	static get type(){return 'paragraph'}
}

class FrameProperties extends Style.Properties{
	static get type(){return 'frame'}
}
