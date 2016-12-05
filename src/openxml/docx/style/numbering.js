import Style from "./base"

export default class Numberings{
	constructor(numbering, styles){
		this.num={}
		this.abstractNum={}
		if(numbering){
			;(numbering.get('numbering.num',false)||[]).forEach(num=>{
				let id=num.$.numId
				this.num[id]=new NumStyle(num,styles,this)
			})
			;(numbering.get("numbering.abstractNum",false)||[]).forEach(def=>{
				let id=def.$.abstractNumId
				def.lvl.forEach(level=>{
					this.abstractNum[`${id}.${level.$.ilvl}`]=new LevelStyle(level,styles,null, this.numberings)
				})
			})

		}
		this.numPicBullet={}

	}

	get(path,numId, level){
		return this.num[numId].get(path,level)
	}
}

class NumStyle extends Style{
	constructor(style, styles, numberings){
		super(style,styles, null)
		this.numberings=numberings
		this.abstractNumId=style.get("abstractNumId")

		;(style.get('lvlOverride')||[]).forEach(a=>{
			let level=a.$.ilvl
			let lvl=a.get('lvl')||{$:{ilvl:level}}, startOverride=a.get('startOverride')
			if(startOverride)
				lvl.start={$:{val:startOverride}}

			this[level]=new NumLevelStyle(lvl,this.styles,null, this.numberings)
		})
	}

	get(path,level){
		return this.level(level).get(path)
	}

	level(level){
		return this[level] || (this[level]=new NumLevelStyle({$:{ilvl:level}},this.styles,`${this.abstractNumId}.${level}`, this.numberings))
	}
}

class LevelStyle extends Style{
	constructor(style,styles,basedOn, numberings){
		super(...arguments)
		this.numberings=numberings
	}
}

class NumLevelStyle extends LevelStyle{
	current=0

	getBasedOn(){
		return this.numberings.abstractNum[this.basedOn]
	}

	get(path){
		if(path=="label")
			return this.getLabel()
		else
			return super.get(path)
	}

	getLabel(){
		let value=undefined
		let lvlPicBulletId=this.get("lvlPicBulletId")
		if(lvlPicBulletId!=undefined){
			throw new Error("pic bullet not supported yet!")
		}else{
			let lvlText=this.get("lvlText")

			value=lvlText.replace(/%(\d+)/g, (a,level)=>{
				level=parseInt(level)-1
				if(level==parseInt(this.raw.$.ilvl)){
					let start=parseInt(this.get("start"))
					let numFmt=this.get("numFmt")
					return (NUMFMT[numFmt]||NUMFMT['decimal'])(start+this.current)
				}else
					return this.basedOn.level(level).getLabel(this.current)
			})
		}

		this.current++
		return value
	}
}

const NUMFMT={
	decimal(n){
		return n
	},

	lowerLetter(n){
		return String.fromCharCode("a".charCodeAt(0)+n-1)
	}
}
