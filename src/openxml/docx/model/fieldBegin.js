import hyperlink from './field/hyperlink'
import date from './field/date'
import ref from './field/ref'
import pageref from './field/pageref'
import toc from './field/toc'
import page from './field/page'
import basic from './field/field'

var fields={hyperlink, date, ref, pageref, toc, page}
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
	end(endModel,endVisitors){

	}
	_iterate(f, factories, visitors){//delay to find real model
		this.end=function(endModel, endVisitors){
			this.endModel=endModel
			let instruct=this.commands.join('').trim(),
				index=instruct.indexOf(' '),
				type=(index!=-1 ?  instruct.substring(0,index) : instruct).toLowerCase()
		
			this.field=this.constructor.factory(instruct,this.wDoc, this, type)
			if(this.field)
				this.field=new basic(instruct,this.wDoc,this,type)
			
			this.field.parse(factories)
		}
	}
	
	_getValidChildren(){
		return []
	}

	static get type(){return 'fieldBegin'}

	static factory(instruct, wDoc, mParent, type){
		try{
			return new (fields[type])(instruct, wDoc, mParent)
		}catch(e){
			return null
		}
	}
}
