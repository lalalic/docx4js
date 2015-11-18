define(['./hyperlink'], function(Super){
	return Super.extend(function(instruct){
		Super.apply(this,arguments)
		this.link='#'+instruct.split(/\s+/)[1]
	})
})