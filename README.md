![](https://api.travis-ci.org/lalalic/docx4js.svg?branch=master)

# docx4js

***please note 3.x is totally different from 2.x**, everything is breaking change.

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
* control.
	* checkbox
		* checked
	* comboBox
		* value
		* options: {displayText, value}
	* date
		* value
		* format
		* locale
	* dropDownList
		* value
		* options: {displayText, value}	
	* gallery
	* picture
	* richtext
	* text
		* value
* text
	* softHyphen
	* noBreakHyphen
	* tab
	* symbol
* field
	* date
	* hyperlink
	* ref
* OLE: {type:"object", embed, prog, data}
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

## 3.x API
<pre>
import docx4js from "docx4js"

docx4js.load("~/test.docx").then(docx=>{
	//you can render docx to anything (react elements, tree, dom, and etc) by giving a function
	docx.render(function createElement(type,props,children){
		return {type,props,children}
	})
	
	//or use a event handler for more flexible control
	const ModelHandler=require("docx4js/openxml/docx/model-handler").default
	class MyModelhandler extends ModelHandler{
		onp({type,children,node,...}, node, officeDocument){
		
		}
	}
	let handler=new MyModelhandler()
	handler.on("*",function({type,children,node,...}, node, officeDocument){
		console.log("found model:"+type)
	})
	handler.on("r",function({type,children,node,...}, node, officeDocument){
		console.log("found a run")
	})
	
	docx.parse(handler)
	
	//you can change content on docx.officeDocument.content, and then save
	docx.officeDocument.content("w\\:t").text("hello")
	docx.save("~/changed.docx")

})

//you can create a blank docx
docx4js.create().then(docx=>{
	//do anything you want
	docx.save("~/new.docx")
})
</pre>
# ChangeLog
	* ~~identify OLE object~~
# License
GPL
