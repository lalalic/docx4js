define(['./paragraph'],function(Paragraph){
	return Paragraph.extend({

		getOutlineLevel: function(){
			return this.getNamedStyle().getOutlineLevel()
		}
	},{type:'heading'})
})
