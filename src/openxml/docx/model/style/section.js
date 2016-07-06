import Style from '../style'

var naming=Object.assign({},Style.Properties.naming,{
		pgSz:'size',
		pgMar:'margin'
	})
	
export default class section extends Style.Properties{
	static get naming(){return naming}
	
	pgSz(x){
		return {width:parseInt(x.attr('w:w'))/20, height:parseInt(x.attr('w:h')/20)}
	}
	pgMar(x){
		var value=this.asObject(x, function(v){return parseFloat(v)/20})
		if(value.gutter && this.wDoc.getPart('settings').documentElement.$1('gutterAtTop'))
			value.gutterAtRight=1;
		return value;
	}
	cols(x){
		var o=this.asObject(x, parseInt)
		o.space && (o.space=o.space/20.0)
		let data=Array.from(x.$('col')).map(a=>{
			return {
				width:parseInt(a.attr('w:w'))/20,
				space:parseInt(a.attr('w:space'))/20
			}
		})
		
		if(data && data.length)
			o.data=data
		
		return o
	}
	static get type(){return 'section'}
}
