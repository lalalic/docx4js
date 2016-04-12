export default class Field extends require('../../model'){
	constructor(instruct,doc, parent,type){
		super(...arguments)
		this.command=new this.constructor.FieldCode(instruct)
		this.command.parse()
		if(type)
			this.type=`field.${type}`
	}

	getCommand(){
		return this.command
	}

	static get type(){return 'field'}

	static get Command(){return Command}

	static get Switch(){return Switch}

	static get FieldCode(){return FieldCode}
}

class Command{
	constructor(instruct){
		this.data=instruct
	}

	nextUntil(seperators){
		if(this.data.length==0)
			return "";
		var i=-1, len=this.data.length;
		//find any one of seperator chars
		while((++i)<len && seperators.indexOf(this.data.charAt(i))==-1);

		var node=this.data.substring(0, i).trim();

		//ignore all seperator chars
		if(i<len)
			while(++i<len && seperators.indexOf(this.data.charAt(i))!=-1);

		//left this.data
		this.data=this.data.substring(i).trim();
		return node;
	}
	nextNode(){
		return this.nextUntil(" \\")
	}
	asInt(s, defaultValue){
		try{
			return parseInt(s)
		}catch(error){
			return defaultValue||0
		}
	}
}
class Switch extends Command{
	constructor(cmd){
		super(...arguments)
		this.withQuote=false
		this.type=cmd.charAt(0).toLowerCase
		if(cmd.length>1 && this.type!='*' && cmd.charAt(1)!=' '){
			if(type.match(/\w/)){//word case: \s1=\s 1
				 try {
					parseInt(cmd.substring(1).trim());
					this.data=cmd.substring(1).trim();
					return;
				} catch (e) {

				}
			}
			this.type='!';
		}else{
			if(this.data.length>1)
				this.data=this.data.substring(1).trim();
			else
				this.data="";
		}
		this.__removeQuote();
	}
	__removeQuote(){
		if(this.data.length==0)
			return;
		var a=this.data.charAt(0);
		if(a=='"' || a=='\''){
			this.data=this.data.substring(1);
			this.withQuote=true;
		}
		if(this.data.length==0)
			return;
		a=this.data.charAt(this.data.length-1);
		if(a=='"' || a=='\''){
			this.data=this.data.substring(0,this.data.length-1);
			this.withQuote=true;
		}
	}
	_split2Int(){
		if(this.data==null || this.data.length==0)
			return null;
		var a=data.split("-");
		if(a.length==0)
			return null;
		var b=[]
		for(var i=0, len=a.length; i<len; i++){
			try {
				b[i]=parseInt(a[i]);
			} catch (e) {
				b[i]=0;
			}
		}
		return b;
	}
}
class FieldCode extends Command{
	constructor(instruct){
		super(...arguments)
		this.mergeFormat=this.parseKeyWord("MERGEFORMAT")
		this.type=this.nextNode()
	}
	parseKeyWord(key){
		if(this.data.length==0)
			return false;
		var len=this.data.length;
		this.data=this.data.replace(new RegExp("\\*\\s*"+key+"\\s*", "ig"),"");
		return this.data.length!=len;
	}
	nextSwitch(){
		var option=this.nextUntil("\\");
		if(option==null || option.length==0)
			return null;

		return new Switch(option);
	}
	parse(){}
}
