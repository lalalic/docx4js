![](https://api.travis-ci.org/lalalic/docx4js.svg?branch=master)

# docx4js
**docx4js** is a javascript docx parser.

The original goal is to support docx, pptx, and xlsx, but it's a huge work, so I limited to docx so far.

In sake of performance, the implementation doesn't keep parsed structure. It only traverse docx content, and identify docx model, then call passed visitors one by one. No matter content, and styles, are all with the same stratigy. This method makes it do more with less memory.  

There are lots of information in docx, but the client application usually only cares about part of them, such as content only, structure only, some styles, or some attributes. The client application is able to handle special word model by TYPE.

Attributes of word model usually affects styles, but I don't understand all of them, so I'm lazy just to iterate every attribute, and some unknown child elements, so client application is possible to catch all information you know.

# Features


## environment


* nodejs
* browser
	* IE9+
	* firefox
	* chrome


**identified models**

* section
* header
* footer
* paragraph
* inline
* numbering
* heading
* shape
	* group
	* line
	* roundRect
	* rect
* image
* hyperlink
* table
	* row
	* cell
* control
	* checkbox
	* combobox
	* date
	* dropdown
	* gallery
	* picture
	* richtext
	* text
* text
	* softHyphen
	* noBreakHyphen
	* tab
	* symbol
* field
	* date
	* hyperlink
	* ref
* OLE
* diagram
* equation
* bookmark
* range
* br
* chart

**style**

* document default style
* named style
* style inheritance
* paragraph
* character
* numbering
* section
* table

## API
`require("docx4js")` return a docx converter, which has following two functions.

### load(file): return Promise resolved by parsed document
**file** is a file path string in nodejs, as for browser, it is a file from input[type=file].

**Parsed Document interface**

* parse(visitorFactory1, visitorFactory2, ...)

### createVisitorFactory(factory, option)
It's to create a factory function that to create a visitor specific to word model types

* factory: it could be following type
	* function(wordModel, targetParent) : return **Visitor** class
		* wordModel: identified word model
		* targetParent: the result created by visitor of srcModel's parent model
	* object: {'word model type name': Visitor Class}
	* undefined: a default factory just to info type of word model in console
* option: a global option to all visitor instances created by the factory, refered by visitor.options

### Visitor
* constructor(wordModel, parentVisitor)
* visit() : calls when a specific word model found

**example**

	var docx4js=require("docx4js")
	docx4js.load(fileInput.files[0]) // a file path in nodejs
		.then(function(doc){
			var nothingFactory=DOCX.createVisitorFactory()

			var textFactory=(function(){
				var visitor=[]
				visitor.visit=(function(){
					switch(this.model.type){
					case 'paragraph':
						return this.push("\n\r")
					case 'text':
						return this.push(this.model.getText())
					}
				})

				return DOCX.createVisitorFactory(function(wordModel){
					visitor.model=wordModel
				})
			})();

			var complexFactory=(function(){
				class Visitor{}
				class P extends Visitor{
					visit(){}
				}
				class Image extends Visitor{
					visit(){}
				}
				class Shape extends Visitor{
					visit(){}
				}
				class Text extends Visitor{
					visit(){}
				}

				return DOCX.createVisitorFactory({
						'paragraph': P,
						'image': Image,
						'text': Text,
						'shape': Shape
					})
			})();

			doc.parse(nothingFactory, textFactory, complexFactory)
		})
# License
GPL
