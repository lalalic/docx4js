define(['./paragraph','./style/list'], function(Super, Style){
	return Super.extend({
		type:'list',
		getLevel: function(numPr,t){
			return (t=this.wXml.$1('>pPr>numPr>ilvl')) ? t.attr('w:val') : '0'
		},
		getNumberingStyle: function(t){
			var numId=(t=this.wXml.$1('>pPr>numPr')) && (t=t.$1('numId')) && (t=t.attr('w:val'))
			!numId && (t=this.getNamedStyle()) && (numId=t.getNumId())
			return this.wDoc.style.get(Style.asStyleId(numId))
		}
	})
})