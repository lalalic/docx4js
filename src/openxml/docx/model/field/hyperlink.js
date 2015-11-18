define(['./field'], function(Super){
	return Super.extend(function(instruct){
		Super.apply(this,arguments)
		this.link=instruct.split('"')[1]
	},{
		getLink: function(){
			return this.link
		}
	},{type:'field.hyperlink'})
})
