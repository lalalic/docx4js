define(['../../model'], function(Super){
	var Command, FieldCode, Switch;
	return Super.extend(function(instruct,doc, parent){
		Super.apply(this,arguments)
		this.command=new this.constructor.FieldCode(instruct)
		this.command.parse()
	},{
		type:'field',
		parse: function(visitors, endVisitors){
			for(var i=0, len=visitors.length;i<len;i++)
				visitors[i].visit(this, endVisitors[i])
		},
		getCommand: function(){
			return this.command
		}
	},{
		Command: Command=$.newClass(function(instruct){
			this.data=instruct
		},{
			nextUntil: function(seperators){
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
			},
			nextNode: function(){
				return this.nextUntil(" \\")
			},
			asInt: function(s, defaultValue){
				try{
					return parseInt(s)
				}catch(error){
					return defaultValue||0
				}
			}
		}),
		Switch: Switch=Command.extend(function(cmd){
			Command.apply(this,arguments)
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
		},{
			__removeQuote: function(){
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
			},
			_split2Int: function(){
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
		}),
		FieldCode: Command.extend(function(instruct){
			Command.apply(this,arguments)
			this.mergeFormat=this.parseKeyWord("MERGEFORMAT")
			this.type=this.nextNode()
		},{
			parseKeyWord: function(key){
				if(this.data.length==0)
					return false;
				var len=this.data.length;
				this.data=this.data.replace(new RegExp("\\*\\s*"+key+"\\s*", "ig"),"");
				return this.data.length!=len;
			},
			nextSwitch: function(){
				var option=this.nextUntil("\\");
				if(option==null || option.length==0)
					return null;
				
				return new Switch(option);
			},
			parse: function(){}
		})
	})
})