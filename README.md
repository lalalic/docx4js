![](https://api.travis-ci.org/lalalic/docx4js.svg?branch=master)

# docx4js

***please note 2.x is totally different from 1.x**, everything is breaking change.

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

## 2.x API
`require("docx4js")` return a base docx converter, which has following two functions.

## static load(file): return Promise resolved by a parsed document
**file** is a file path string in nodejs, as for browser, it is a file from input[type=file].

## parse ()
to parse docx document

### onCreateElement(node, type)
handle identified content model from inner/children to outer/parent

**example**
plese check dist/index.html
<pre>
	function test(input){
		var text=document.querySelector("#text")
		class MyDocx extends Docx{
			onCreateElement(node, type){
				switch(type){
					case 'text':
						text.value+=node.children
					break
					case 'paragraph':
						text.value+="\n\r"
					break
				}
			}
		}

		MyDocx.load(input.files[0]).then(function(docx){
			docx.parse()
		})
	}
</pre>
# License
GPL
