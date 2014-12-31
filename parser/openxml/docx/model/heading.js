define(['./paragraph'],function(Paragraph){
	return Paragraph.extend({
		type:'heading',
		getOutlineLevel: function(){
			return this.getNamedStyle().getOutlineLevel()
		}
	})
})