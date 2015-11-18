export default class image extends require('./graphic'){
	getImage(){
		var blip=this.wXml.$1('blip'), rid=blip.attr('r:embed')
		return this.wDoc.getRel(rid)
	}
	static get type(){return 'image'}
}
