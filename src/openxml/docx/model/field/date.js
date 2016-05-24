import Field, {FieldCode as Code} from "./field"

export default class Date extends Field{
	static get type(){return 'field.date'}
	static get FieldCode(){return FieldCode}
}

class FieldCode extends Code{
	parse(){
		var option=null;
		while(option=this.nextSwitch()){
			switch(option.type){
			case '@':
				var i=option.data.indexOf('"');
				if(i!=-1)
					this.format=option.data.substring(0,i);
				else
					this.format=option.data;
				break;
			}
		}
	}
}
