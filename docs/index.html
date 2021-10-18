<!DOCTYPE html>
<html>
	<title>use docx4js to parse docx/pptx/xlsx</title>
<head>
	<script src="index.js"></script>
	<script>
		function toggle(el){
			const dd=el.parentNode.parentNode.lastChild
			if(dd){
				dd.style.display= el.innerText=="+" ? "inherit" : "none"
				el.innerText=el.innerText=="+" ? "-" : "+"
			}
		}
		function test(input){
			const file=input.files[0]
			const type=({
				"application/vnd.openxmlformats-officedocument.presentationml.presentation":"pptx",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document":"docx",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"xlsx"
			})[file.type];
			const module=require("docx4js")[type]
			module.load(file)
				.then(function(doc){
					input.value=""
					const element=doc.render((type, props, children)=>{
						const hasChild=children && children.length
						const el=document.createElement("dl")
						el.innerHTML=`<dt><i onclick="toggle(this)">+</i><span>${type}</span></dt>`
						if(hasChild){
							el.append(document.createElement("dd"))
							children.forEach(child => {
								el.querySelector('dd').append(child)
							});
						}
						return el
					})
					
					const container=document.querySelector('#container')
					container.lastChild && container.removeChild(container.lastChild)
					container.appendChild(element)
				})
		}
	</script>
	<style>
		i{cursor:default;display: inline-block; width: 10px;}
		dd{margin-left:20px;display: none;}
		dl{margin: auto 5px;}
	</style>
</head>
<body>
	<center>
		<h2>Select a file(docx/pptx/xlsx) to parse with docx4js</h2>
		<input type="file" onchange="test(this)" accept=".docx,.pptx,.xlsx">
		<div id="container" style="margin:10px;padding:10px;border:1px solid; text-align:left; min-height:500px;">

		</div>
	</center>
</body>
</html>
