describe("node tool",function(){
	require('../lib/tool')

	Function.prototype.extractComment=function(input){
		var content=this.toString()
		return content.substring(content.indexOf('/*')+2, content.lastIndexOf('*/'));
	}

	describe("basic functions",function(){
		xit("Deferred", function(){
			expect($.Deferred).toBeTruthy()
		}).pend("please use ES6 Promise")

		it("extend", function(){
			expect($.extend).toBeTruthy()
		})

		describe("helper",function(){
			it("isFunction", function(){
				expect($.isFunction(function(){})).toBe(true)
			})

			describe("isArray", function(){
				it("support new Array", function(){
					expect($.isArray(new Array())).toBe(true)
				})

				it("support []", function(){
					expect($.isArray([])).toBe(true)
				})
			})

			it("support each", function(){
				expect($.each).toBeTruthy()
			})

			it("support map", function(){
				expect($.map).toBeTruthy()
			})
		})
	})

	describe("xml", function(){
		it("support parser",function(){
			expect($.parseXML).toBeTruthy()
		})

		describe("parser", function(){
			it("support xml without namespace", function(){
				var doc=$.parseXML(`
					<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
					<a>hello</a>
				`)
				expect(doc.documentElement.tagName).toEqual('a')
			})

			it("support self close tag", function(){
				var doc=$.parseXML(`
					<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
					<a><b/></a>
				`)
				expect(doc.documentElement.tagName).toEqual('a')
			})

			it("support node extension: Node.prototype.attr", function(){
				var doc=$.parseXML(`
					<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
					<a name="raymond"></a>
				`)
				expect(doc.documentElement.attr('name')).toEqual('raymond')
			})

			it("support node extension: Node.prototype.remove", function(){
				var doc=$.parseXML(`
					<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
					<a><b/></a>
				`),
				root=doc.documentElement;
				expect(root.firstChild).toBeTruthy()
				root.firstChild.remove()
				expect(root.firstChild).toBeFalsy()
			})

			it("support node extension: Node.prototype.uptrim", function(){
				var doc=$.parseXML(`
					<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
					<a><b><d/></b><c/></a>
				`),
					root=doc.documentElement,
					b=root.firstChild,
					d=b.firstChild;
				d.uptrim();
				expect(root.firstChild.tagName).toEqual('c')
			})

			it("support xml with namespaces,  attr should have namespace", function(){
				var doc=$.parseXML(`
					<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
					<w:styles xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
						xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
						xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
						xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" mc:Ignorable="w14">
						<w:docDefaults>
							<w:rPrDefault>
								<w:rPr>
									<w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorHAnsi" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi"/>
									<w:sz w:val="22"/>
									<w:szCs w:val="22"/>
									<w:lang w:val="en-US" w:eastAsia="en-US" w:bidi="ar-SA"/>
								</w:rPr>
							</w:rPrDefault>
							<w:pPrDefault>
								<w:pPr>
									<w:spacing w:after="200" w:line="276" w:lineRule="auto"/>
								</w:pPr>
							</w:pPrDefault>
						</w:docDefaults>
					<w:styles>
				`);
				expect(doc.documentElement.attr('mc:Ignorable')).toEqual('w14')
			})

			it("xml with namespeces")
				.pend("****use node localName to test and query, attribute use nodename with namespace. nodeName and tagName are different in nodejs (without namespace) and browser(with namespace)")


			describe("query", function(){
				describe("tag", function(){
					it("a",function(){
						var doc=$.parseXML(`
							<a><b/><b/></a>
							`),
							root=doc.documentElement;
						expect(root.$('b').length).toEqual(2)
						expect(root.$('a').length).toEqual(0)
						expect(root.$1('b').tagName).toEqual('b')
					})

					it("simple tag",function(){
						var doc=$.parseXML(`
							<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
							<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
								<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
								<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
								<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
							</Relationships>
							`),
							root=doc.documentElement;
						expect(root.$('Relationship').length).toEqual(3)
					})

					it("a with namespace",function(){
						var doc=$.parseXML(`
							<r:a><r:b/></r:a>
							`),
							root=doc.documentElement;
						expect(root.$('a').length).toEqual(0)
					})

					it(">a",function(){
						var doc=$.parseXML(`
							<a><b><c/><c/></b></a>
							`),
							root=doc.documentElement;
						expect(root.$('>b').length).toEqual(1)
						expect(root.$1('>b').$('>c').length).toEqual(2)
					})

					it("a>b",function(){
						var doc=$.parseXML(`
							<a><b><c/><c/></b></a>
							`),
							root=doc.documentElement;
						expect(root.$('a>b').length).toEqual(1)
						expect(root.$('c>b').length).toEqual(0)
						expect(root.$('b>c').length).toEqual(2)
						expect(root.$('a>b>c').length).toEqual(2)
					})

					it("a>*",function(){
						var doc=$.parseXML(`
							<a><b><c/><c/></b></a>
							`),
							root=doc.documentElement;
						expect(root.$('a>*').length).toEqual(1)
						expect(root.$('c>*').length).toEqual(0)
						expect(root.$('b>*').length).toEqual(2)
						expect(root.$('a>*>c').length).toEqual(2)
					})

					it("*>b",function(){
						var doc=$.parseXML(`
							<a><b><c/><c/></b></a>
							`);
						try{
							doc.documentElement.$('*>c');
						}catch(error){
							expect(error).toBeUndefined()
						}
					})
				})

				describe("attribute", function(){
					it('b[br="1"]', function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/></b></a>
							`),
							root=doc.documentElement;
						expect(root.$('b[br="1"]').length).toEqual(1)
						expect(root.$('b[br="2"]').length).toEqual(0)
						expect(root.$('c[cr="1"]').length).toEqual(2)
						expect(root.$('c[cr="2"]').length).toEqual(1)
					})

					it('a>b[br="1"]', function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/></b></a>
							`),
							root=doc.documentElement;
						expect(root.$('a>b[br="1"]>c[cr="2"]').length).toEqual(1)
						expect(root.$('c>b[br="1"]').length).toEqual(0)
					})
				})

				describe("function on tag",function(){
					it("a:empty",function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/></b></a>
							`),
							root=doc.documentElement;
						expect(root.$('c:empty').length).toEqual(3)
						expect(root.$('b:empty').length).toEqual(0)
					})

					it("a:not(:empty)", function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/><c>good</c></b></a>
							`),
							root=doc.documentElement;
						expect(root.$('c:not(:empty)').length).toEqual(1)
						expect(root.$('b:not(:empty)').length).toEqual(1)
					})

					it("a:first-child",function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/><c>good</c></b></a>
							`),
							root=doc.documentElement;
						expect(root.$('b:first-child').length).toEqual(1)
						expect(root.$('a:first-child').length).toEqual(0)
					})

					it("a:last-child",function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/><c>good</c></b></a>
							`),
							root=doc.documentElement;
						expect(root.$('b:last-child').length).toEqual(1)
						expect(root.$('a:last-child').length).toEqual(0)
					})

					it("a:nth-child",function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/><c>good</c></b></a>
							`),
							root=doc.documentElement;
						expect(root.$('b:nth-child(1)').length).toEqual(1)
						expect(root.$('b:nth-child(2)').length).toEqual(0)
						expect(root.$('c:nth-child(3)').length).toEqual(1)
					})
				})

				describe("naked function",function(){
					it(":empty",function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/></b></a>
							`),
							root=doc.documentElement;
						expect(root.$(':empty').length).toEqual(3)
					})

					it(":not(:empty)", function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/><c>good</c></b></a>
							`),
							root=doc.documentElement;
						expect(root.$(':not(:empty)').length).toEqual(2)
					})

					it(":first-child",function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/><c>good</c></b></a>
							`),
							root=doc.documentElement;
						expect(root.$(':first-child').length).toEqual(2)
						expect(root.$('b>:first-child').length).toEqual(1)
					})

					it("b>:first-child with namespace",function(){
						var doc=$.parseXML(`
							<a xmlns:w="http://a" xmlns:x="http://b">
								<w:b br="1">
									<x:c cr="1"/>
									<c cr="1"/>
									<c cr="2"/>
									<c>good</c>
								</w:b>
							</a>
							`),
							root=doc.documentElement;
						expect(root.$(':first-child').length).toEqual(2)
						expect(root.$('b>:first-child').length).toEqual(1)
					})

					it(":last-child",function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/><c>good</c></b></a>
							`),
							root=doc.documentElement;
						expect(root.$(':last-child').length).toEqual(2)
					})

					it(":nth-child",function(){
						var doc=$.parseXML(`
							<a><b br="1"><c cr="1"/><c cr="1"/><c cr="2"/><c>good</c></b></a>
							`),
							root=doc.documentElement;
						expect(root.$(':nth-child(1)').length).toEqual(2)
					})
				})
			})
		})
	})
})
