define(['./paragraph'],function(Style){
	return Style.extend(function(wXml,wDoc,mParent){
		Style.apply(this,arguments)
		wDoc.style.setDefault(this)
	},{
		type:'style.document',
		isDefault: function(){
			return true
		}
	})
})