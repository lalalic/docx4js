define(['require','./model',
'./model/document','./model/section','./model/body',
'./model/table','./model/row','./model/cell','./model/paragraph','./model/list','./model/heading','./model/inline','./model/headingInline','./model/text',
'./model/fieldBegin','./model/fieldInstruct','./model/fieldSeparate','./model/fieldEnd','./model/fieldSimple','./model/bookmarkStart','./model/bookmarkEnd',
'./model/tab','./model/softHyphen','./model/noBreakHyphen','./model/symbol','./model/br','./model/hyperlink',
'./model/drawingAnchor','./model/shape','./model/image','./model/chart','./model/diagram',
'./model/documentStyles','./model/style/document','./model/style/paragraph','./model/style/table','./model/style/inline','./model/style/numbering','./model/style/numberingDefinition','./model/style/list',
'./model/control/richtext','./model/control/text','./model/control/picture','./model/control/gallery','./model/control/combobox','./model/control/dropdown','./model/control/date','./model/control/checkbox',
'./model/equation','./model/OLE'], function(require, Model){
	return function factory(wXml, doc, parent, more){
		var tag=wXml.localName, swap;
		function attr(node,name){return node?node.attr(name):undefined}
		
		if('document'==tag)
			return new (require('./model/document'))(wXml,doc, parent)
		else if('styles'==tag)
			return new (require('./model/documentStyles'))(wXml,doc)
		else if('abstractNum'==tag)
			return new (require('./model/style/numberingDefinition'))(wXml,doc)
		else if('num'==tag)
			return new (require('./model/style/list'))(wXml,doc)
		else if('style'==tag){
			switch(wXml.attr('w:type')){
			case 'paragraph':
				return new (require('./model/style/paragraph'))(wXml,doc)
			case 'character':
				return new (require('./model/style/inline'))(wXml,doc)
			case 'table':
				return new (require('./model/style/table'))(wXml,doc)
			case 'numbering':
				return new (require('./model/style/numbering'))(wXml,doc)
			}
		}else if('docDefaults'==tag)
			return new (require('./model/style/document'))(wXml,doc)
		else if('body'==tag)
			return new (require('./model/body'))(wXml,doc, parent)
		else if('p'==tag){
			var styleId=attr(wXml.$1('>pPr>pStyle'),'w:val'), style=doc.style.get(styleId)
			if(wXml.$1('>pPr>numPr') || (style && style.getNumId()!=-1))
				return new (require('./model/list'))(wXml,doc,parent)
			
			if(style && style.getOutlineLevel()!=-1)
				return new (require('./model/heading'))(wXml,doc, parent)
				
			
				
			return new (require('./model/paragraph'))(wXml,doc,parent)
		}else if('r'==tag){
			var style=doc.style.get(attr(wXml.$1('>rPr>rStyle'),'w:val'))
			if(style && style.getOutlineLevel()!=-1)
				return new (require('./model/headingInline'))(wXml,doc,parent)
			else if(wXml.childNodes.length==1 || (wXml.childNodes==2 && wXml.firstChild.localName=='rPr')){
				switch(wXml.lastChild.localName){
				case 'fldChar':
				case 'instrText':
					return factory(wXml.lastChild,doc,parent)
				}
			}
				
			return new (require('./model/inline'))(wXml,doc,parent)
		}else if('instrText'==tag)
				return new (require('./model/fieldInstruct'))(wXml, doc,parent)
		else if('t'==tag)
			return new (require('./model/text'))(wXml,doc,parent)
		else if('sym'==tag && wXml.parentNode.localName=='r')
			return new (require('./model/symbol'))(wXml,doc,parent)
		else if('softHyphen'==tag && wXml.parentNode.localName=='r')
			return new (require('./model/softHyphen'))(wXml,doc,parent)
		else if('noBreakHyphen'==tag && wXml.parentNode.localName=='r')
			return new (require('./model/noBreakHyphen'))(wXml,doc,parent)
		else if('tab'==tag && wXml.parentNode.localName=='r')
			return new (require('./model/tab'))(wXml,doc,parent)
		else if('fldSimple'==tag)
			return new (require('./model/fieldSimple'))(wXml,doc,parent)
		else if('fldChar'==tag){
			switch(wXml.attr('w:fldCharType')){
			case 'begin':
				return new (require('./model/fieldBegin'))(wXml,doc,parent)
			break
			case 'end':
				return new (require('./model/fieldEnd'))(wXml,doc,parent)
			break
			case 'separate':
				return new (require('./model/fieldSeparate'))(wXml,doc,parent)
			break
			}
		}else if('tbl'==tag)
			return new (require('./model/table'))(wXml,doc,parent)
		else if('tr'==tag)
			return new (require('./model/row'))(wXml,doc,parent)
		else if('tc'==tag)
			return new (require('./model/cell'))(wXml,doc,parent)
		else if('br'==tag)
			return new (require('./model/br'))(wXml,doc,parent)
		else if('hyperlink'==tag && 'p'==wXml.parentNode.localName)
			return new (require('./model/hyperlink'))(wXml,doc,parent)
		else if('AlternateContent'==tag)
			return new (require('./model/drawingAnchor'))(wXml,doc,parent)
		else if('wsp'==tag)
			return new (require('./model/shape'))(wXml,doc,parent)
		else if('inline'==tag){
			var type=wXml.$1('>graphic>graphicData').attr('uri').split('/').pop()
			switch(type){
			case 'picture':
				return new (require('./model/image'))(wXml,doc,parent)
			case 'diagram':
				return new (require('./model/diagram'))(wXml,doc,parent)
			case 'chart':
				return new (require('./model/chart'))(wXml,doc,parent)
			default:
				console.error('inline '+type +' is not suppored yet.')
			}
		}else if('sdt'==tag){
			//by experience, @todo: by query
			tag=wXml.firstChild.lastChild.localName
			if('text'==tag)
				return new (require('./model/control/text'))(wXml,doc,parent)
			else if('picture'==tag)
				return new (require('./model/control/picture'))(wXml,doc,parent)
			else if('docPartList'==tag)
				return new (require('./model/control/gallery'))(wXml,doc,parent)
			else if('comboBox'==tag)
				return new (require('./model/control/combobox'))(wXml,doc,parent)
			else if('dropDownList'==tag)
				return new (require('./model/control/dropdown'))(wXml,doc,parent)
			else if('date'==tag)
				return new (require('./model/control/date'))(wXml,doc,parent)
			else if('checkbox'==tag)
				return new (require('./model/control/checkbox'))(wXml,doc,parent)
			else 
				return new (require('./model/control/richtext'))(wXml,doc,parent)
		}else if('bookmarkStart'==tag)
			return new (require('./model/bookmarkStart'))(wXml,doc,parent)
		else if('bookmarkEnd'==tag)
			return new (require('./model/bookmarkEnd'))(wXml,doc,parent)
		else if('oMathPara'==tag)
			return new (require('./model/equation'))(wXml,doc,parent)
		else if('object'==tag)
			return new (require('./model/OLE'))(wXml,doc,parent)
		else if('sectPr'==tag)
			return new (require('./model/section'))(wXml,doc,parent)

		return new Model(wXml,doc,parent)
	}
})
