define(['./sdt'], function(SDT){
	return SDT.extend({
		getTag: function(t){
			return (t=this.wXml.$1('>sdtPr>tag')) && t.attr('w:val') || ''
		},
		isInline: function(){
			return !this.wXml.$1('p,table')
		}
	})
})