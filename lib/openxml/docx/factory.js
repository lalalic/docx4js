"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getComponent = undefined;
exports.identify = identify;

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identify(wXml, officeDocument) {
	var tag = wXml.name.split(":").pop();
	if (identities[tag]) return identities[tag].apply(identities, arguments) || tag;

	return tag;
}

var identities = {
	p: function p(wXml, officeDocument) {
		var $ = _cheerio2.default.load(wXml, { xmlMode: true });
		var pPr = $("w\\:pPr");
		if (pPr.length) {
			var styleId = $("w\\:pStyle", pPr).attr("w:val");

			if ($("w\\:numPr", pPr).length || styleId && officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"] w\\:numPr").length) return "list";

			if ($("w\\:outlineLvl", pPr).length || styleId && officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"] w\\:outlineLvl").length) return "heading";
		}
	},
	fldChar: function fldChar(wXml) {
		return wXml.attribs["w:fldCharType"];
	},
	inline: function inline(wXml) {
		var $ = _cheerio2.default.load(wXml, { xmlMode: true });
		var type = "inline." + $('a\\:graphic>a\\:graphicData').attr('uri').split('/').pop();
		return { type: type, children: null };
	},
	std: function std(wXml) {
		var $ = _cheerio2.default.load(wXml, { xmlMode: true });
		var elBinding = $('w\\:sdtPr>w\\:dataBinding').get(0);
		if (elBinding) {
			//properties
			var path = elBinding.attribs['w:xpath'],
			    d = path.split(/[\/\:\[]/),
			    name = (d.pop(), d.pop());
			var value = $('w\\:sdtContent:first').text();
			return { type: "property", name: name, value: value, children: null };
		} else {
			//controls
			var elType = $('w\\:sdtPr').find("text, picture, docPartList, comboBox, dropDownList, date, checkbox").get(0);
			var type = (elType ? elType.name : 'richtext').split(":").pop();
			return { type: "control." + type, children: null };
		}
	}
};

var getComponent = exports.getComponent = function getComponent(name) {
	var existing = getComponent[name];
	if (existing) return existing;
	var Type = function Type(props) {
		return null;
	};
	Type.displayName = name;
	return getComponent[name] = Type;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJpZGVudGlmeSIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsInRhZyIsIm5hbWUiLCJzcGxpdCIsInBvcCIsImlkZW50aXRpZXMiLCJhcmd1bWVudHMiLCJwIiwiJCIsImxvYWQiLCJ4bWxNb2RlIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsImF0dHIiLCJzdHlsZXMiLCJmbGRDaGFyIiwiYXR0cmlicyIsImlubGluZSIsInR5cGUiLCJjaGlsZHJlbiIsInN0ZCIsImVsQmluZGluZyIsImdldCIsInBhdGgiLCJkIiwidmFsdWUiLCJ0ZXh0IiwiZWxUeXBlIiwiZmluZCIsImdldENvbXBvbmVudCIsImV4aXN0aW5nIiwiVHlwZSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7UUFFZ0JBLFEsR0FBQUEsUTs7QUFGaEI7Ozs7OztBQUVPLFNBQVNBLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCQyxjQUF4QixFQUF1QztBQUM3QyxLQUFNQyxNQUFJRixLQUFLRyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQVY7QUFDQSxLQUFHQyxXQUFXSixHQUFYLENBQUgsRUFDQyxPQUFPSSxXQUFXSixHQUFYLG9CQUFtQkssU0FBbkIsS0FBK0JMLEdBQXRDOztBQUVELFFBQU9BLEdBQVA7QUFDQTs7QUFFRCxJQUFNSSxhQUFXO0FBQ2hCRSxFQURnQixhQUNkUixJQURjLEVBQ1RDLGNBRFMsRUFDTTtBQUNyQixNQUFJUSxJQUFFLGtCQUFNQyxJQUFOLENBQVdWLElBQVgsRUFBZ0IsRUFBQ1csU0FBUSxJQUFULEVBQWhCLENBQU47QUFDQSxNQUFJQyxNQUFJSCxFQUFFLFNBQUYsQ0FBUjtBQUNBLE1BQUdHLElBQUlDLE1BQVAsRUFBYztBQUNiLE9BQUlDLFVBQVFMLEVBQUUsWUFBRixFQUFlRyxHQUFmLEVBQW9CRyxJQUFwQixDQUF5QixPQUF6QixDQUFaOztBQUVBLE9BQUdOLEVBQUUsV0FBRixFQUFlRyxHQUFmLEVBQW9CQyxNQUFwQixJQUNEQyxXQUFZYixlQUFlZSxNQUFmLDhCQUFnREYsT0FBaEQsb0JBQXVFRCxNQURyRixFQUVDLE9BQU8sTUFBUDs7QUFFRCxPQUFHSixFQUFFLGdCQUFGLEVBQW9CRyxHQUFwQixFQUF5QkMsTUFBekIsSUFDREMsV0FBV2IsZUFBZWUsTUFBZiw4QkFBZ0RGLE9BQWhELHlCQUE0RUQsTUFEekYsRUFFQyxPQUFPLFNBQVA7QUFDRDtBQUNELEVBZmU7QUFnQmhCSSxRQWhCZ0IsbUJBZ0JSakIsSUFoQlEsRUFnQkg7QUFDWixTQUFPQSxLQUFLa0IsT0FBTCxDQUFhLGVBQWIsQ0FBUDtBQUNBLEVBbEJlO0FBbUJoQkMsT0FuQmdCLGtCQW1CVG5CLElBbkJTLEVBbUJKO0FBQ1gsTUFBSVMsSUFBRSxrQkFBTUMsSUFBTixDQUFXVixJQUFYLEVBQWdCLEVBQUNXLFNBQVEsSUFBVCxFQUFoQixDQUFOO0FBQ0EsTUFBSVMsbUJBQWVYLEVBQUUsNkJBQUYsRUFBaUNNLElBQWpDLENBQXNDLEtBQXRDLEVBQTZDWCxLQUE3QyxDQUFtRCxHQUFuRCxFQUF3REMsR0FBeEQsRUFBbkI7QUFDQSxTQUFPLEVBQUNlLFVBQUQsRUFBTUMsVUFBUyxJQUFmLEVBQVA7QUFDQSxFQXZCZTtBQXdCaEJDLElBeEJnQixlQXdCWnRCLElBeEJZLEVBd0JQO0FBQ1IsTUFBSVMsSUFBRSxrQkFBTUMsSUFBTixDQUFXVixJQUFYLEVBQWdCLEVBQUNXLFNBQVEsSUFBVCxFQUFoQixDQUFOO0FBQ0EsTUFBSVksWUFBVWQsRUFBRSwyQkFBRixFQUErQmUsR0FBL0IsQ0FBbUMsQ0FBbkMsQ0FBZDtBQUNBLE1BQUdELFNBQUgsRUFBYTtBQUFDO0FBQ2IsT0FBSUUsT0FBS0YsVUFBVUwsT0FBVixDQUFrQixTQUFsQixDQUFUO0FBQUEsT0FDQ1EsSUFBRUQsS0FBS3JCLEtBQUwsQ0FBVyxVQUFYLENBREg7QUFBQSxPQUVDRCxRQUFNdUIsRUFBRXJCLEdBQUYsSUFBUXFCLEVBQUVyQixHQUFGLEVBQWQsQ0FGRDtBQUdBLE9BQUlzQixRQUFNbEIsRUFBRSxzQkFBRixFQUEwQm1CLElBQTFCLEVBQVY7QUFDQSxVQUFPLEVBQUNSLE1BQUssVUFBTixFQUFrQmpCLFVBQWxCLEVBQXdCd0IsWUFBeEIsRUFBK0JOLFVBQVMsSUFBeEMsRUFBUDtBQUNBLEdBTkQsTUFNTTtBQUFDO0FBQ04sT0FBSVEsU0FBT3BCLEVBQUUsV0FBRixFQUFlcUIsSUFBZixDQUFvQixvRUFBcEIsRUFBMEZOLEdBQTFGLENBQThGLENBQTlGLENBQVg7QUFDQSxPQUFJSixPQUFLLENBQUNTLFNBQVNBLE9BQU8xQixJQUFoQixHQUF1QixVQUF4QixFQUFvQ0MsS0FBcEMsQ0FBMEMsR0FBMUMsRUFBK0NDLEdBQS9DLEVBQVQ7QUFDQSxVQUFPLEVBQUNlLG1CQUFnQkEsSUFBakIsRUFBeUJDLFVBQVMsSUFBbEMsRUFBUDtBQUNBO0FBQ0Q7QUF0Q2UsQ0FBakI7O0FBMENPLElBQU1VLHNDQUFhLFNBQWJBLFlBQWEsT0FBTTtBQUMvQixLQUFJQyxXQUFTRCxhQUFhNUIsSUFBYixDQUFiO0FBQ0EsS0FBRzZCLFFBQUgsRUFDQyxPQUFPQSxRQUFQO0FBQ0QsS0FBSUMsT0FBSyxTQUFMQSxJQUFLO0FBQUEsU0FBTyxJQUFQO0FBQUEsRUFBVDtBQUNBQSxNQUFLQyxXQUFMLEdBQWlCL0IsSUFBakI7QUFDQSxRQUFPNEIsYUFBYTVCLElBQWIsSUFBbUI4QixJQUExQjtBQUNBLENBUE0iLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGVlciBmcm9tIFwiY2hlZXJpb1wiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnkod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0aWYoaWRlbnRpdGllc1t0YWddKVxyXG5cdFx0cmV0dXJuIGlkZW50aXRpZXNbdGFnXSguLi5hcmd1bWVudHMpfHx0YWdcclxuXHJcblx0cmV0dXJuIHRhZ1xyXG59XHJcblxyXG5jb25zdCBpZGVudGl0aWVzPXtcclxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9Y2hlZXIubG9hZCh3WG1sLHt4bWxNb2RlOnRydWV9KVxyXG5cdFx0bGV0IHBQcj0kKFwid1xcXFw6cFByXCIpXHJcblx0XHRpZihwUHIubGVuZ3RoKXtcclxuXHRcdFx0bGV0IHN0eWxlSWQ9JChcIndcXFxcOnBTdHlsZVwiLHBQcikuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRpZigkKFwid1xcXFw6bnVtUHJcIiwgcFByKS5sZW5ndGggfHxcclxuXHRcdFx0XHQoc3R5bGVJZCAmJiAgb2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpudW1QcmApLmxlbmd0aCkpXHJcblx0XHRcdFx0cmV0dXJuIFwibGlzdFwiXHJcblxyXG5cdFx0XHRpZigkKFwid1xcXFw6b3V0bGluZUx2bFwiLCBwUHIpLmxlbmd0aCB8fFxyXG5cdFx0XHRcdChzdHlsZUlkICYmIG9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6b3V0bGluZUx2bGApLmxlbmd0aCkpXHJcblx0XHRcdFx0cmV0dXJuIFwiaGVhZGluZ1wiXHJcblx0XHR9XHJcblx0fSxcclxuXHRmbGRDaGFyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cclxuXHR9LFxyXG5cdGlubGluZSh3WG1sKXtcclxuXHRcdGxldCAkPWNoZWVyLmxvYWQod1htbCx7eG1sTW9kZTp0cnVlfSlcclxuXHRcdGxldCB0eXBlPWBpbmxpbmUuJHskKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJykuYXR0cigndXJpJykuc3BsaXQoJy8nKS5wb3AoKX1gXHJcblx0XHRyZXR1cm4ge3R5cGUsY2hpbGRyZW46bnVsbH1cclxuXHR9LFxyXG5cdHN0ZCh3WG1sKXtcclxuXHRcdGxldCAkPWNoZWVyLmxvYWQod1htbCx7eG1sTW9kZTp0cnVlfSlcclxuXHRcdGxldCBlbEJpbmRpbmc9JCgnd1xcXFw6c2R0UHI+d1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcclxuXHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXHJcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG5cdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XHJcblx0XHRcdGxldCB2YWx1ZT0kKCd3XFxcXDpzZHRDb250ZW50OmZpcnN0JykudGV4dCgpXHJcblx0XHRcdHJldHVybiB7dHlwZTpcInByb3BlcnR5XCIsIG5hbWUsIHZhbHVlLCBjaGlsZHJlbjpudWxsfVxyXG5cdFx0fWVsc2Ugey8vY29udHJvbHNcclxuXHRcdFx0bGV0IGVsVHlwZT0kKCd3XFxcXDpzZHRQcicpLmZpbmQoXCJ0ZXh0LCBwaWN0dXJlLCBkb2NQYXJ0TGlzdCwgY29tYm9Cb3gsIGRyb3BEb3duTGlzdCwgZGF0ZSwgY2hlY2tib3hcIikuZ2V0KDApXHJcblx0XHRcdGxldCB0eXBlPShlbFR5cGUgPyBlbFR5cGUubmFtZSA6ICdyaWNodGV4dCcpLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6YGNvbnRyb2wuJHt0eXBlfWAsIGNoaWxkcmVuOm51bGx9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdldENvbXBvbmVudD1uYW1lPT57XHJcblx0bGV0IGV4aXN0aW5nPWdldENvbXBvbmVudFtuYW1lXVxyXG5cdGlmKGV4aXN0aW5nKVxyXG5cdFx0cmV0dXJuIGV4aXN0aW5nXHJcblx0bGV0IFR5cGU9cHJvcHM9Pm51bGxcclxuXHRUeXBlLmRpc3BsYXlOYW1lPW5hbWVcclxuXHRyZXR1cm4gZ2V0Q29tcG9uZW50W25hbWVdPVR5cGVcclxufSJdfQ==