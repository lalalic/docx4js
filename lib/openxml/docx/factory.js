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
	document: function document(wXml) {
		return { type: "document", children: wXml.firstChildren.children };
	},
	p: function p(wXml, officeDocument) {
		var $ = _cheerio2.default.load(wXml, { xmlMode: true });
		var type = "p";

		var pPr = $("w\\:pPr");
		if (pPr.length) {
			var styleId = $("w\\:pStyle", pPr).attr("w:val");

			if ($("w\\:numPr", pPr).length || styleId && officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"] w\\:numPr").length) type = "list";else if ($("w\\:outlineLvl", pPr).length || styleId && officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"] w\\:outlineLvl").length) type = "heading";

			return { type: type, pr: pPr.get(0), children: wXml.children.filter(function (_ref) {
					var name = _ref.name;
					return name != "w:pPr";
				}) };
		}
	},
	r: function r(xml) {
		return { type: "r", pr: wXml.children.find(function (_ref2) {
				var name = _ref2.name;
				return name == "w:rPr";
			}), children: wXml.children.filter(function (_ref3) {
				var name = _ref3.name;
				return name != "w:rPr";
			}) };
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
	},
	hyperlink: function hyperlink(wXml) {
		if (wXml.parent.name == "w:p") return "hyperlink";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJpZGVudGlmeSIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsInRhZyIsIm5hbWUiLCJzcGxpdCIsInBvcCIsImlkZW50aXRpZXMiLCJhcmd1bWVudHMiLCJkb2N1bWVudCIsInR5cGUiLCJjaGlsZHJlbiIsImZpcnN0Q2hpbGRyZW4iLCJwIiwiJCIsImxvYWQiLCJ4bWxNb2RlIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsImF0dHIiLCJzdHlsZXMiLCJwciIsImdldCIsImZpbHRlciIsInIiLCJ4bWwiLCJmaW5kIiwiZmxkQ2hhciIsImF0dHJpYnMiLCJpbmxpbmUiLCJzdGQiLCJlbEJpbmRpbmciLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsImVsVHlwZSIsImh5cGVybGluayIsInBhcmVudCIsImdldENvbXBvbmVudCIsImV4aXN0aW5nIiwiVHlwZSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7UUFFZ0JBLFEsR0FBQUEsUTs7QUFGaEI7Ozs7OztBQUVPLFNBQVNBLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCQyxjQUF4QixFQUF1QztBQUM3QyxLQUFNQyxNQUFJRixLQUFLRyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQVY7QUFDQSxLQUFHQyxXQUFXSixHQUFYLENBQUgsRUFDQyxPQUFPSSxXQUFXSixHQUFYLG9CQUFtQkssU0FBbkIsS0FBK0JMLEdBQXRDOztBQUVELFFBQU9BLEdBQVA7QUFDQTs7QUFFRCxJQUFNSSxhQUFXO0FBQ2hCRSxTQURnQixvQkFDUFIsSUFETyxFQUNGO0FBQ2IsU0FBTyxFQUFDUyxNQUFLLFVBQU4sRUFBa0JDLFVBQVVWLEtBQUtXLGFBQUwsQ0FBbUJELFFBQS9DLEVBQVA7QUFDQSxFQUhlO0FBSWhCRSxFQUpnQixhQUlkWixJQUpjLEVBSVRDLGNBSlMsRUFJTTtBQUNyQixNQUFJWSxJQUFFLGtCQUFNQyxJQUFOLENBQVdkLElBQVgsRUFBZ0IsRUFBQ2UsU0FBUSxJQUFULEVBQWhCLENBQU47QUFDQSxNQUFJTixPQUFLLEdBQVQ7O0FBRUEsTUFBSU8sTUFBSUgsRUFBRSxTQUFGLENBQVI7QUFDQSxNQUFHRyxJQUFJQyxNQUFQLEVBQWM7QUFDYixPQUFJQyxVQUFRTCxFQUFFLFlBQUYsRUFBZUcsR0FBZixFQUFvQkcsSUFBcEIsQ0FBeUIsT0FBekIsQ0FBWjs7QUFFQSxPQUFHTixFQUFFLFdBQUYsRUFBZUcsR0FBZixFQUFvQkMsTUFBcEIsSUFDREMsV0FBWWpCLGVBQWVtQixNQUFmLDhCQUFnREYsT0FBaEQsb0JBQXVFRCxNQURyRixFQUVDUixPQUFLLE1BQUwsQ0FGRCxLQUdLLElBQUdJLEVBQUUsZ0JBQUYsRUFBb0JHLEdBQXBCLEVBQXlCQyxNQUF6QixJQUNOQyxXQUFXakIsZUFBZW1CLE1BQWYsOEJBQWdERixPQUFoRCx5QkFBNEVELE1BRHBGLEVBRUpSLE9BQUssU0FBTDs7QUFFRCxVQUFPLEVBQUNBLFVBQUQsRUFBTVksSUFBR0wsSUFBSU0sR0FBSixDQUFRLENBQVIsQ0FBVCxFQUFvQlosVUFBU1YsS0FBS1UsUUFBTCxDQUFjYSxNQUFkLENBQXFCO0FBQUEsU0FBRXBCLElBQUYsUUFBRUEsSUFBRjtBQUFBLFlBQVVBLFFBQU0sT0FBaEI7QUFBQSxLQUFyQixDQUE3QixFQUFQO0FBQ0E7QUFDRCxFQXJCZTtBQXNCaEJxQixFQXRCZ0IsYUFzQmRDLEdBdEJjLEVBc0JWO0FBQ0wsU0FBTyxFQUFDaEIsTUFBSyxHQUFOLEVBQVdZLElBQUlyQixLQUFLVSxRQUFMLENBQWNnQixJQUFkLENBQW1CO0FBQUEsUUFBRXZCLElBQUYsU0FBRUEsSUFBRjtBQUFBLFdBQVVBLFFBQU0sT0FBaEI7QUFBQSxJQUFuQixDQUFmLEVBQTRETyxVQUFVVixLQUFLVSxRQUFMLENBQWNhLE1BQWQsQ0FBcUI7QUFBQSxRQUFFcEIsSUFBRixTQUFFQSxJQUFGO0FBQUEsV0FBVUEsUUFBTSxPQUFoQjtBQUFBLElBQXJCLENBQXRFLEVBQVA7QUFDQSxFQXhCZTtBQXlCaEJ3QixRQXpCZ0IsbUJBeUJSM0IsSUF6QlEsRUF5Qkg7QUFDWixTQUFPQSxLQUFLNEIsT0FBTCxDQUFhLGVBQWIsQ0FBUDtBQUNBLEVBM0JlO0FBNEJoQkMsT0E1QmdCLGtCQTRCVDdCLElBNUJTLEVBNEJKO0FBQ1gsTUFBSWEsSUFBRSxrQkFBTUMsSUFBTixDQUFXZCxJQUFYLEVBQWdCLEVBQUNlLFNBQVEsSUFBVCxFQUFoQixDQUFOO0FBQ0EsTUFBSU4sbUJBQWVJLEVBQUUsNkJBQUYsRUFBaUNNLElBQWpDLENBQXNDLEtBQXRDLEVBQTZDZixLQUE3QyxDQUFtRCxHQUFuRCxFQUF3REMsR0FBeEQsRUFBbkI7QUFDQSxTQUFPLEVBQUNJLFVBQUQsRUFBTUMsVUFBUyxJQUFmLEVBQVA7QUFDQSxFQWhDZTtBQWlDaEJvQixJQWpDZ0IsZUFpQ1o5QixJQWpDWSxFQWlDUDtBQUNSLE1BQUlhLElBQUUsa0JBQU1DLElBQU4sQ0FBV2QsSUFBWCxFQUFnQixFQUFDZSxTQUFRLElBQVQsRUFBaEIsQ0FBTjtBQUNBLE1BQUlnQixZQUFVbEIsRUFBRSwyQkFBRixFQUErQlMsR0FBL0IsQ0FBbUMsQ0FBbkMsQ0FBZDtBQUNBLE1BQUdTLFNBQUgsRUFBYTtBQUFDO0FBQ2IsT0FBSUMsT0FBS0QsVUFBVUgsT0FBVixDQUFrQixTQUFsQixDQUFUO0FBQUEsT0FDQ0ssSUFBRUQsS0FBSzVCLEtBQUwsQ0FBVyxVQUFYLENBREg7QUFBQSxPQUVDRCxRQUFNOEIsRUFBRTVCLEdBQUYsSUFBUTRCLEVBQUU1QixHQUFGLEVBQWQsQ0FGRDtBQUdBLE9BQUk2QixRQUFNckIsRUFBRSxzQkFBRixFQUEwQnNCLElBQTFCLEVBQVY7QUFDQSxVQUFPLEVBQUMxQixNQUFLLFVBQU4sRUFBa0JOLFVBQWxCLEVBQXdCK0IsWUFBeEIsRUFBK0J4QixVQUFTLElBQXhDLEVBQVA7QUFDQSxHQU5ELE1BTU07QUFBQztBQUNOLE9BQUkwQixTQUFPdkIsRUFBRSxXQUFGLEVBQWVhLElBQWYsQ0FBb0Isb0VBQXBCLEVBQTBGSixHQUExRixDQUE4RixDQUE5RixDQUFYO0FBQ0EsT0FBSWIsT0FBSyxDQUFDMkIsU0FBU0EsT0FBT2pDLElBQWhCLEdBQXVCLFVBQXhCLEVBQW9DQyxLQUFwQyxDQUEwQyxHQUExQyxFQUErQ0MsR0FBL0MsRUFBVDtBQUNBLFVBQU8sRUFBQ0ksbUJBQWdCQSxJQUFqQixFQUF5QkMsVUFBUyxJQUFsQyxFQUFQO0FBQ0E7QUFDRCxFQS9DZTtBQWdEaEIyQixVQWhEZ0IscUJBZ0ROckMsSUFoRE0sRUFnREQ7QUFDZCxNQUFHQSxLQUFLc0MsTUFBTCxDQUFZbkMsSUFBWixJQUFrQixLQUFyQixFQUNDLE9BQU8sV0FBUDtBQUNEO0FBbkRlLENBQWpCOztBQXVETyxJQUFNb0Msc0NBQWEsU0FBYkEsWUFBYSxPQUFNO0FBQy9CLEtBQUlDLFdBQVNELGFBQWFwQyxJQUFiLENBQWI7QUFDQSxLQUFHcUMsUUFBSCxFQUNDLE9BQU9BLFFBQVA7QUFDRCxLQUFJQyxPQUFLLFNBQUxBLElBQUs7QUFBQSxTQUFPLElBQVA7QUFBQSxFQUFUO0FBQ0FBLE1BQUtDLFdBQUwsR0FBaUJ2QyxJQUFqQjtBQUNBLFFBQU9vQyxhQUFhcEMsSUFBYixJQUFtQnNDLElBQTFCO0FBQ0EsQ0FQTSIsImZpbGUiOiJmYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcblx0Y29uc3QgdGFnPXdYbWwubmFtZS5zcGxpdChcIjpcIikucG9wKClcblx0aWYoaWRlbnRpdGllc1t0YWddKVxuXHRcdHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKXx8dGFnXG5cblx0cmV0dXJuIHRhZ1xufVxuXG5jb25zdCBpZGVudGl0aWVzPXtcblx0ZG9jdW1lbnQod1htbCl7XG5cdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW46IHdYbWwuZmlyc3RDaGlsZHJlbi5jaGlsZHJlbn1cblx0fSxcblx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcblx0XHRsZXQgJD1jaGVlci5sb2FkKHdYbWwse3htbE1vZGU6dHJ1ZX0pXG5cdFx0bGV0IHR5cGU9XCJwXCJcblxuXHRcdGxldCBwUHI9JChcIndcXFxcOnBQclwiKVxuXHRcdGlmKHBQci5sZW5ndGgpe1xuXHRcdFx0bGV0IHN0eWxlSWQ9JChcIndcXFxcOnBTdHlsZVwiLHBQcikuYXR0cihcInc6dmFsXCIpXG5cblx0XHRcdGlmKCQoXCJ3XFxcXDpudW1QclwiLCBwUHIpLmxlbmd0aCB8fFxuXHRcdFx0XHQoc3R5bGVJZCAmJiAgb2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpudW1QcmApLmxlbmd0aCkpXG5cdFx0XHRcdHR5cGU9XCJsaXN0XCJcblx0XHRcdGVsc2UgaWYoJChcIndcXFxcOm91dGxpbmVMdmxcIiwgcFByKS5sZW5ndGggfHxcblx0XHRcdFx0KHN0eWxlSWQgJiYgb2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpvdXRsaW5lTHZsYCkubGVuZ3RoKSlcblx0XHRcdFx0dHlwZT1cImhlYWRpbmdcIlxuXG5cdFx0XHRyZXR1cm4ge3R5cGUscHI6cFByLmdldCgwKSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnBQclwiKX1cblx0XHR9XG5cdH0sXG5cdHIoeG1sKXtcblx0XHRyZXR1cm4ge3R5cGU6XCJyXCIsIHByOiB3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpyUHJcIiksIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnJQclwiKX1cblx0fSxcblx0ZmxkQ2hhcih3WG1sKXtcblx0XHRyZXR1cm4gd1htbC5hdHRyaWJzW1widzpmbGRDaGFyVHlwZVwiXVxuXHR9LFxuXHRpbmxpbmUod1htbCl7XG5cdFx0bGV0ICQ9Y2hlZXIubG9hZCh3WG1sLHt4bWxNb2RlOnRydWV9KVxuXHRcdGxldCB0eXBlPWBpbmxpbmUuJHskKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJykuYXR0cigndXJpJykuc3BsaXQoJy8nKS5wb3AoKX1gXG5cdFx0cmV0dXJuIHt0eXBlLGNoaWxkcmVuOm51bGx9XG5cdH0sXG5cdHN0ZCh3WG1sKXtcblx0XHRsZXQgJD1jaGVlci5sb2FkKHdYbWwse3htbE1vZGU6dHJ1ZX0pXG5cdFx0bGV0IGVsQmluZGluZz0kKCd3XFxcXDpzZHRQcj53XFxcXDpkYXRhQmluZGluZycpLmdldCgwKVxuXHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXG5cdFx0XHRsZXQgcGF0aD1lbEJpbmRpbmcuYXR0cmlic1sndzp4cGF0aCddLFxuXHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXG5cdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XG5cdFx0XHRsZXQgdmFsdWU9JCgnd1xcXFw6c2R0Q29udGVudDpmaXJzdCcpLnRleHQoKVxuXHRcdFx0cmV0dXJuIHt0eXBlOlwicHJvcGVydHlcIiwgbmFtZSwgdmFsdWUsIGNoaWxkcmVuOm51bGx9XG5cdFx0fWVsc2Ugey8vY29udHJvbHNcblx0XHRcdGxldCBlbFR5cGU9JCgnd1xcXFw6c2R0UHInKS5maW5kKFwidGV4dCwgcGljdHVyZSwgZG9jUGFydExpc3QsIGNvbWJvQm94LCBkcm9wRG93bkxpc3QsIGRhdGUsIGNoZWNrYm94XCIpLmdldCgwKVxuXHRcdFx0bGV0IHR5cGU9KGVsVHlwZSA/IGVsVHlwZS5uYW1lIDogJ3JpY2h0ZXh0Jykuc3BsaXQoXCI6XCIpLnBvcCgpXG5cdFx0XHRyZXR1cm4ge3R5cGU6YGNvbnRyb2wuJHt0eXBlfWAsIGNoaWxkcmVuOm51bGx9XG5cdFx0fVxuXHR9LFxuXHRoeXBlcmxpbmsod1htbCl7XG5cdFx0aWYod1htbC5wYXJlbnQubmFtZT09XCJ3OnBcIilcblx0XHRcdHJldHVybiBcImh5cGVybGlua1wiXG5cdH1cbn1cblxuXG5leHBvcnQgY29uc3QgZ2V0Q29tcG9uZW50PW5hbWU9Pntcblx0bGV0IGV4aXN0aW5nPWdldENvbXBvbmVudFtuYW1lXVxuXHRpZihleGlzdGluZylcblx0XHRyZXR1cm4gZXhpc3Rpbmdcblx0bGV0IFR5cGU9cHJvcHM9Pm51bGxcblx0VHlwZS5kaXNwbGF5TmFtZT1uYW1lXG5cdHJldHVybiBnZXRDb21wb25lbnRbbmFtZV09VHlwZVxufVxuIl19