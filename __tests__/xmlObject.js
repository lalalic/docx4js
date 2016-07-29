jest.unmock("../lib/xmlObject")
var getable=require("../lib/xmlObject").getable

describe("getable object", function(){
	var data={
		a:{
			b:{
				$:{name:"test"},
				name:{$:{val:""}}
			},
			c:[
			{name:"1"},
			{name:"2"}
			],
			d:[{name:"d"}]
		}
	}
	
	it("getable object", function(){
		var _data=getable(data)
		expect(_data).toBe(data)
		
		expect(_data.get).toBeDefined()
		expect(_data.get("a").get).toBeDefined()
		
		expect(_data.get("a")).toBe(data.a)
		expect(_data.get("a.b")).toBe(data.a.b)
		expect(_data.get("a.c")).toBe(data.a.c)
		
		expect(_data.get("a.d")).toBe(data.a.d[0])
		expect(_data.get("a.d",true)).toBe(data.a.d[0])
		expect(_data.get("a.d",false)).toBe(data.a.d)
		
		expect(_data.get("a.b.name")).toBe(data.a.b.name.$.val)
		expect(_data.get("a.b.name",true)).toBe(data.a.b.name.$.val)
		expect(_data.get("a.b.name",false)).toBe(data.a.b.name)
	})
})