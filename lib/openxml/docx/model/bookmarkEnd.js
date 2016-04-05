export default class bookmarkEnd extends require('./rangeBase'){
	getName(){
		this.wDoc.parseContext.bookmark[this.wXml.attr('w:id')]
	}
	static get type(){return 'bookmarkEnd'}
}
