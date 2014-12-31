define(['./field'], function(Super){
	return Super.extend(function(instruct){
		Super.apply(this,arguments)
		this.link=instruct.split('"')[1]
	},{
		type:'field.hyperlink',
		getLink: function(){
			return this.link
		}
	})
})