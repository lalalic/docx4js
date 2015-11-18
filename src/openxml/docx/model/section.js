
import Model from '../model'
import Header from './header'
import Footer from './footer'
import Style from './style/section'

export default class section extends Model{
	constructor(wXml, wDoc, mParent){
		super(...arguments)
		mParent.content.pop()
		this.wFirst=mParent.content.length ? mParent.content[mParent.content.length-1].wLast.nextSibling : mParent.wXml.firstChild

		this.wLast=wXml
		while(this.wLast.parentNode!=mParent.wXml)
			this.wLast=this.wLast.parentNode
		if(this.wLast==wXml)
			this.wLast=wXml.previousSibling

		mParent.content.push(this)

		wDoc.parseContext.section.current=this
	}

	_iterate(f, visitorFactories){
		this._iterateHeaderFooter(visitorFactories,'header')
		var current=this.wFirst
		do{
			f(current)
			current=current==this.wLast ? null : current.nextSibling
		}while(current)
		this._iterateHeaderFooter(visitorFactories,'footer')
	}

	_iterateHeaderFooter(visitorFactories,refType){
		for(var refs=this.wXml.$(refType+'Reference'),i=0,len=refs.length;i<len;i++){
			var part=this.wDoc.parseContext.part.current=this.wDoc.getRel(refs[i].attr('r:id'))
			var model=new (require('./'+refType))(part.documentElement, this.wDoc, this, refs[i].attr('w:type'))
			model.parse(visitorFactories)
			this.wDoc.parseContext.part.current=this.wDoc.partMain
		}
	}
	getDirectStyle(){
		return new Style(this.wXml,this.wDoc, this)
	}

	static get type(){return 'section'}
}
