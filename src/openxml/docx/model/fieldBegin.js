import hyperlink from './field/hyperlink'
import date from './field/date'
import ref from './field/ref'

var fields={hyperlink, date, ref}
export default class fieldBegin extends require('../model'){
	constructor(){
		super(...arguments)
		this.commands=[]
	}

	parse(){
		this.wDoc.parseContext.field.push(this)
		super.parse(...arguments)
	}
	instruct(t){
		this.commands.push(t)
	}
	seperate(seperator){

	}
	end(endVisitors){

	}
	_iterate(f, factories, visitors){
		this.end=function(endVisitors){
			var model=this.constructor.factory(this.commands.join('').trim(),this.wDoc, this)
			if(model)
				model.parse(visitors, endVisitors)
		}
	}

	static get type(){return 'fieldBegin'}

	static factory(instruct, wDoc, mParent){
		var index=instruct.indexOf(' '),
			type=index!=-1 ?  instruct.substring(0,index) : instruct
		type=type.toLowerCase()
		try{
			return new (fields[type])(instruct.trim(), wDoc, mParent)
		}catch(e){
			console.warn(`field of type ${type} not supported`)
		}
	}
}
