import Drawing from './drawing'

export default class drawingAnchor extends Drawing{
	constructor(wXml){
		super(...arguments)
		this.wDrawing=wXml.$1('drawing>:first-child')
	}

	_getValidChildren(){
		return this.wDrawing.$('wsp')
	}

	static get type(){return 'drawing.anchor'}

	static get Properties(){return Properties}
}

var naming=Object.assign({},Drawing.Properties.naming,{
	wrapNone:'wrap',
	wrapSquare:'wrap',
	wrapTopAndBottom:'wrap',
	wrapTight:'wrap',
	wrapThrough:'wrap'
})
class Properties extends  Drawing.Properties{
	static get type(){return 'shape'}

	static get naming(){return naming}

	_getValidChildren(){
		var t, children=super._getValidChildren(...arguments);
		'positionH,positionV,wrapNone,wrapSquare,wrapTopAndBottom,wrapTight,wrapThrough'
			.split(',').forEach((a)=>{(t=this.wXml.$1(a)) && children.push(t)})
		return children
	}

	positionH(x){
		var o={relativeFrom:x.attr('relativeFrom')}
		o[x.firstChild.localName]= x.firstChild.localName=='posOffset' ? this.pt2Px(this.asPt(x.firstChild.textContent.trim(),'cm')) : x.firstChild.textContent.trim()
		return o
	}
	positionV(x){
		var o={relativeFrom:x.attr('relativeFrom')}
		o[x.firstChild.localName]= x.firstChild.localName=='posOffset' ? this.pt2Px(this.asPt(x.firstChild.textContent.trim(),'cm')) : x.firstChild.textContent.trim()
		return o
	}
	wrapNone(){
		return 'none'
	}
	wrapSquare(){
		return 'square'
	}
	wrapTopAndBottom(){
		return 'topAndBottom'
	}
	wrapTight(){
		return 'tight'
	}
	wrapThrough(){
		return 'through'
	}
	behindDoc(x){
		return x.value=='0' ? this.EMPTY : true
	}
}
