define(['../model','require', './field/hyperlink','./field/date','./field/ref'],function(Super, require){
	return Super.extend(function(wXml,wDoc,mParent){
		Super.apply(this,arguments)
		this.commands=[]
	},{
		type:'fieldBegin',
		parse: function(){
			this.wDoc.parseContext.field.push(this)
			Super.prototype.parse.apply(this,arguments)	
		},
		instruct: function(t){
			this.commands.push(t)
		},
		seperate: function(seperator){},
		end: function(endVisitors){},
		_iterate: function(f, factories, visitors){
			this.end=function(endVisitors){
				var model=this.constructor.factory(this.commands.join('').trim(),this.wDoc, this)
				if(model)
					model.parse(visitors, endVisitors)
			}
		}
	},{
		factory: function(instruct, wDoc, mParent){
			var index=instruct.indexOf(' '), 
				type=index!=-1 ?  instruct.substring(0,index) : instruct
			type=type.toLowerCase()		
			var Model=require.defined('./field/'+type) ? require('./field/'+type) : null
			if(Model)
				return new Model(instruct.trim(), wDoc, mParent)
		}
	})
})