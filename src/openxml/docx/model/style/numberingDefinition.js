import Style from '../style'
import Inline from './inline'

//<w:numbering><w:abstractNum w:abstractNumId="0">
export default class NumberingDefinition extends Style{
	constructor(wXml){
		super(...arguments)
		this.levels=new Map()

		this.name=this.id=this.constructor.asStyleId(wXml.attr('w:abstractNumId'))
		this.wDoc.style.set(this)
		var link=wXml.$1('numStyleLink')
		if(link)
			this.link=link.attr('w:val')
	}
	
	_iterate(f, factories, visitors){
		for(var i=0,children=this.wXml.$('lvl'),l=children.length, t; i<l; i++){
			t=new this.constructor.Level(children[i],this.wDoc, this)
			this.levels.set(t.level,t)
			t.parse(visitors)
		}
	}
	
	getDefinitionId(){
		return this.wXml.attr('w:abstractNumId')
	}
	
	getLabel(...indexes){
		let [level]=indexes[indexes.length-1]
		indexes=new Map(indexes)
		let lvlText=this.levels.get(level).values.lvlText
		let label=lvlText.replace(/%(\d+)/g,(a,index)=>{
			let current=parseInt(index)-1
			return this.levels.get(current).getLabel(indexes.get(current)-1)
		})
		return label
	}
	
	getLabelStyle(level){
		
	}

	static asStyleId(absNumId){
		return '_numberingDefinition'+absNumId
	}

	static get type(){return 'style.numbering.definition'}

	static get Level(){return Level}
}

class Level extends Style.Properties{
	constructor(wXml){
		super(...arguments)
		this.level=parseInt(wXml.attr('w:ilvl'))
	}
	parse(visitors){
		super.parse(...arguments)
		var t,pr;
		if(t=this.wXml.$1('>pPr')){
			pr=new (require('./paragraph').Properties)(t,this.wDoc,this)
			pr.type=this.level+' '+pr.type
			pr.parse(...arguments)
		}

		if(t=this.wXml.$1('>rPr')){
			pr=new Inline.Properties(t,this.wDoc,this)
			pr.type=this.level+' '+pr.type
			pr.parse(...arguments)
		}
	}
	start(x){
		return parseInt(x.attr('w:val'))
	}
	numFm(x){
		return x.attr('w:val')
	}
	lvlText(x){
		return x.attr('w:val')
	}
	lvlJc(x){
		return x.attr('w:val')
	}
	lvlPicBulletId(x){
		return x.attr('w:val')
	}
	
	getLabel(index){
		switch(this.values.numFm){
		default:
			return new String(this.values.start+index)
		}
	}
/* number type:
decimal
upperRoman
lowerRoman
upperLetter
lowerLetter
ordinal
cardinalText
ordinalText
hex
chicago
ideographDigital
japaneseCounting
aiueo
iroha
decimalFullWidth
decimalHalfWidth
japaneseLegal
japaneseDigitalTenThousand
decimalEnclosedCircle
decimalFullWidth2
aiueoFullWidth
irohaFullWidth
decimalZero
bullet
ganada
chosung
decimalEnclosedFullstop
decimalEnclosedParen
decimalEnclosedCircleChinese
ideographEnclosedCircle
ideographTraditional
ideographZodiac
ideographZodiacTraditional
taiwaneseCounting
ideographLegalTraditional
taiwaneseCountingThousand
taiwaneseDigital
chineseCounting
chineseLegalSimplified
chineseCountingThousand
koreanDigital
koreanCounting
koreanLegal
koreanDigital2
vietnameseCounting
russianLower
russianUpper
none
numberInDash
hebrew1
hebrew2
arabicAlpha
arabicAbjad
hindiVowels
hindiConsonants
hindiNumbers
hindiCounting
thaiLetters
thaiNumbers
thaiCounting
*/
}
