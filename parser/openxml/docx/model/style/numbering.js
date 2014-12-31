define(['../style','./list'],function(Super, List){
	return Super.extend(function(){
		Super.apply(this,arguments)
	},{
		type:'style.numbering',
		getNumId: function(){
			return this.wXml.$1('numId').attr('w:val')
		},
		asNumberingStyle: function(){
			return this.wDoc.style.get(List.asStyleId(this.getNumId()))
		}
	})
})