'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _document = require('../document');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attr(node) {
	var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'w:val';

	return node ? node.attr(name) : undefined;
}

var Factory = function (_Base) {
	(0, _inherits3.default)(Factory, _Base);

	function Factory() {
		(0, _classCallCheck3.default)(this, Factory);
		return (0, _possibleConstructorReturn3.default)(this, (Factory.__proto__ || (0, _getPrototypeOf2.default)(Factory)).apply(this, arguments));
	}

	(0, _createClass3.default)(Factory, [{
		key: 'create',
		value: function create(wXml, doc, parent, more) {
			var tag = wXml.localName,
			    swap;

			if ('document' == tag) return new (require('./model/document'))(wXml, doc, parent);else if ('styles' == tag) return new (require('./model/documentStyles'))(wXml, doc);else if ('abstractNum' == tag) return new (require('./model/style/numberingDefinition'))(wXml, doc);else if ('num' == tag) return new (require('./model/style/list'))(wXml, doc);else if ('style' == tag) {
				switch (wXml.attr('w:type')) {
					case 'paragraph':
						return new (require('./model/style/paragraph'))(wXml, doc);
					case 'character':
						return new (require('./model/style/inline'))(wXml, doc);
					case 'table':
						return new (require('./model/style/table'))(wXml, doc);
					case 'numbering':
						return new (require('./model/style/numbering'))(wXml, doc);
				}
			} else if ('docDefaults' == tag) return new (require('./model/style/document'))(wXml, doc);else if ('body' == tag) return new (require('./model/body'))(wXml, doc, parent);else if ('p' == tag) {
				var styleId = attr(wXml.$1('>pPr>pStyle'), 'w:val'),
				    style = doc.style.get(styleId);
				if (wXml.$1('>pPr>numPr') || style && style.getNumId() != -1) return new (require('./model/list'))(wXml, doc, parent);

				var outlineLvl = -1,
				    tmp = void 0;
				if (style) outlineLvl = style.getOutlineLevel();else if (tmp = wXml.$1('>pPr>outlineLvl')) {
					tmp = parseInt(attr(tmp));
					outlineLvl = parseInt(tmp);
				}

				if (outlineLvl != -1) return new (require('./model/heading'))(wXml, doc, parent, outlineLvl);

				return new (require('./model/paragraph'))(wXml, doc, parent);
			} else if ('r' == tag) {
				var _style = doc.style.get(attr(wXml.$1('>rPr>rStyle'), 'w:val'));

				var _outlineLvl = -1,
				    _tmp = void 0;
				if (_style) _outlineLvl = _style.getOutlineLevel();else if (_tmp = wXml.$1('>rPr>outlineLvl')) {
					_tmp = attr(_tmp);
					_outlineLvl = parseInt(_tmp);
				}

				if (_outlineLvl != -1) return new (require('./model/headingInline'))(wXml, doc, parent, _outlineLvl);

				if (wXml.childNodes.length == 1 || wXml.childNodes == 2 && wXml.firstChild.localName == 'rPr') {
					switch (wXml.lastChild.localName) {
						case 'fldChar':
						case 'instrText':
							return factory(wXml.lastChild, doc, parent);
					}
				}

				return new (require('./model/inline'))(wXml, doc, parent);
			} else if ('instrText' == tag) return new (require('./model/fieldInstruct'))(wXml, doc, parent);else if ('t' == tag) return new (require('./model/text'))(wXml, doc, parent);else if ('sym' == tag && wXml.parentNode.localName == 'r') return new (require('./model/symbol'))(wXml, doc, parent);else if ('softHyphen' == tag && wXml.parentNode.localName == 'r') return new (require('./model/softHyphen'))(wXml, doc, parent);else if ('noBreakHyphen' == tag && wXml.parentNode.localName == 'r') return new (require('./model/noBreakHyphen'))(wXml, doc, parent);else if ('tab' == tag && wXml.parentNode.localName == 'r') return new (require('./model/tab'))(wXml, doc, parent);else if ('fldSimple' == tag) return new (require('./model/fieldSimple'))(wXml, doc, parent);else if ('fldChar' == tag) {
				switch (wXml.attr('w:fldCharType')) {
					case 'begin':
						return new (require('./model/fieldBegin'))(wXml, doc, parent);
						break;
					case 'end':
						return new (require('./model/fieldEnd'))(wXml, doc, parent);
						break;
					case 'separate':
						return new (require('./model/fieldSeparate'))(wXml, doc, parent);
						break;
				}
			} else if ('tbl' == tag) return new (require('./model/table'))(wXml, doc, parent);else if ('tr' == tag) return new (require('./model/row'))(wXml, doc, parent);else if ('tc' == tag) return new (require('./model/cell'))(wXml, doc, parent);else if ('br' == tag) return new (require('./model/br'))(wXml, doc, parent);else if ('hyperlink' == tag && 'p' == wXml.parentNode.localName) return new (require('./model/hyperlink'))(wXml, doc, parent);else if ('AlternateContent' == tag) return new (require('./model/drawingAnchor'))(wXml, doc, parent);else if ('wsp' == tag) return new (require('./model/shape'))(wXml, doc, parent);else if ('inline' == tag) {
				var type = wXml.$1('>graphic>graphicData').attr('uri').split('/').pop();
				switch (type) {
					case 'picture':
						return new (require('./model/image'))(wXml, doc, parent);
					case 'diagram':
						return new (require('./model/diagram'))(wXml, doc, parent);
					case 'chart':
						return new (require('./model/chart'))(wXml, doc, parent);
					default:
						console.error('inline ' + type + ' is not suppored yet.');
				}
			} else if ('sdt' == tag) {
				var elBinding = wXml.$1('>sdtPr>dataBinding');
				if (elBinding) {
					//properties
					var path = attr(elBinding, 'w:xpath'),
					    d = path.split(/[\/\:\[]/),
					    name = (d.pop(), d.pop());
					return new (require('./model/documentProperty'))(wXml, doc, parent, name);
				} else {
					//controls
					var elType = wXml.$1('>sdtPr').$1("text, picture, docPartList, comboBox, dropDownList, date, checkbox");
					tag = elType ? elType.localName : 'richtext';

					var control = this.createControl.apply(this, [tag].concat(Array.prototype.slice.call(arguments)));

					if (control) return control;
				}
			} else if ('bookmarkStart' == tag) return new (require('./model/bookmarkStart'))(wXml, doc, parent);else if ('bookmarkEnd' == tag) return new (require('./model/bookmarkEnd'))(wXml, doc, parent);else if ('oMath' == tag) return new (require('./model/equation'))(wXml, doc, parent);else if ('object' == tag) return new (require('./model/OLE'))(wXml, doc, parent);else if ('sectPr' == tag) return new (require('./model/section'))(wXml, doc, parent);

			return new _model2.default(wXml, doc, parent);
		}
	}, {
		key: 'createControl',
		value: function createControl(type, wXml, doc, parent) {
			if ('text' == type) return new (require('./model/control/text'))(wXml, doc, parent);else if ('picture' == type) return new (require('./model/control/picture'))(wXml, doc, parent);else if ('docPartList' == type) return new (require('./model/control/gallery'))(wXml, doc, parent);else if ('comboBox' == type) return new (require('./model/control/combobox'))(wXml, doc, parent);else if ('dropDownList' == type) return new (require('./model/control/dropdown'))(wXml, doc, parent);else if ('date' == type) return new (require('./model/control/date'))(wXml, doc, parent);else if ('checkbox' == type) return new (require('./model/control/checkbox'))(wXml, doc, parent);else if ('richtext' == type) return new (require('./model/control/richtext'))(wXml, doc, parent);
		}
	}]);
	return Factory;
}(_document.Factory);

exports.default = Factory;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJhdHRyIiwibm9kZSIsIm5hbWUiLCJ1bmRlZmluZWQiLCJGYWN0b3J5Iiwid1htbCIsImRvYyIsInBhcmVudCIsIm1vcmUiLCJ0YWciLCJsb2NhbE5hbWUiLCJzd2FwIiwicmVxdWlyZSIsInN0eWxlSWQiLCIkMSIsInN0eWxlIiwiZ2V0IiwiZ2V0TnVtSWQiLCJvdXRsaW5lTHZsIiwidG1wIiwiZ2V0T3V0bGluZUxldmVsIiwicGFyc2VJbnQiLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsImZhY3RvcnkiLCJwYXJlbnROb2RlIiwidHlwZSIsInNwbGl0IiwicG9wIiwiY29uc29sZSIsImVycm9yIiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJlbFR5cGUiLCJjb250cm9sIiwiY3JlYXRlQ29udHJvbCIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUEsU0FBU0EsSUFBVCxDQUFjQyxJQUFkLEVBQWdDO0FBQUEsS0FBYkMsSUFBYSx1RUFBUixPQUFROztBQUMvQixRQUFPRCxPQUFLQSxLQUFLRCxJQUFMLENBQVVFLElBQVYsQ0FBTCxHQUFxQkMsU0FBNUI7QUFDQTs7SUFFb0JDLE87Ozs7Ozs7Ozs7eUJBQ2JDLEksRUFBTUMsRyxFQUFLQyxNLEVBQVFDLEksRUFBSztBQUM5QixPQUFJQyxNQUFJSixLQUFLSyxTQUFiO0FBQUEsT0FBd0JDLElBQXhCOztBQUVBLE9BQUcsY0FBWUYsR0FBZixFQUNDLE9BQU8sS0FBS0csUUFBUSxrQkFBUixDQUFMLEVBQWtDUCxJQUFsQyxFQUF1Q0MsR0FBdkMsRUFBNENDLE1BQTVDLENBQVAsQ0FERCxLQUVLLElBQUcsWUFBVUUsR0FBYixFQUNKLE9BQU8sS0FBS0csUUFBUSx3QkFBUixDQUFMLEVBQXdDUCxJQUF4QyxF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SUFBekMsRUFBOENDLEdBQTlDLEVBQWtEQyxNQUFsRCxDQUFQLENBREksS0FFQSxJQUFHLGNBQVlxQixJQUFmLEVBQ0osT0FBTyxLQUFLaEIsUUFBUSwwQkFBUixDQUFMLEVBQTBDUCxJQUExQyxFQUErQ0MsR0FBL0MsRUFBbURDLE1BQW5ELENBQVAsQ0FESSxLQUVBLElBQUcsa0JBQWdCcUIsSUFBbkIsRUFDSixPQUFPLEtBQUtoQixRQUFRLDBCQUFSLENBQUwsRUFBMENQLElBQTFDLEVBQStDQyxHQUEvQyxFQUFtREMsTUFBbkQsQ0FBUCxDQURJLEtBRUEsSUFBRyxVQUFRcUIsSUFBWCxFQUNKLE9BQU8sS0FBS2hCLFFBQVEsc0JBQVIsQ0FBTCxFQUFzQ1AsSUFBdEMsRUFBMkNDLEdBQTNDLEVBQStDQyxNQUEvQyxDQUFQLENBREksS0FFQSxJQUFHLGNBQVlxQixJQUFmLEVBQ0osT0FBTyxLQUFLaEIsUUFBUSwwQkFBUixDQUFMLEVBQTBDUCxJQUExQyxFQUErQ0MsR0FBL0MsRUFBbURDLE1BQW5ELENBQVAsQ0FESSxLQUVBLElBQUcsY0FBWXFCLElBQWYsRUFDSixPQUFPLEtBQUtoQixRQUFRLDBCQUFSLENBQUwsRUFBMENQLElBQTFDLEVBQStDQyxHQUEvQyxFQUFtREMsTUFBbkQsQ0FBUDtBQUNEOzs7OztrQkF0S21CSCxPIiwiZmlsZSI6ImZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCdcclxuaW1wb3J0IHtGYWN0b3J5IGFzIEJhc2V9IGZyb20gJy4uL2RvY3VtZW50J1xyXG5cclxuZnVuY3Rpb24gYXR0cihub2RlLG5hbWU9J3c6dmFsJyl7XHJcblx0cmV0dXJuIG5vZGU/bm9kZS5hdHRyKG5hbWUpOnVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYWN0b3J5IGV4dGVuZHMgQmFzZXtcclxuXHRjcmVhdGUod1htbCwgZG9jLCBwYXJlbnQsIG1vcmUpe1xyXG5cdFx0dmFyIHRhZz13WG1sLmxvY2FsTmFtZSwgc3dhcDtcclxuXHJcblx0XHRpZignZG9jdW1lbnQnPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZG9jdW1lbnQnKSkod1htbCxkb2MsIHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ3N0eWxlcyc9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9kb2N1bWVudFN0eWxlcycpKSh3WG1sLGRvYylcclxuXHRcdGVsc2UgaWYoJ2Fic3RyYWN0TnVtJz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL251bWJlcmluZ0RlZmluaXRpb24nKSkod1htbCxkb2MpXHJcblx0XHRlbHNlIGlmKCdudW0nPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvbGlzdCcpKSh3WG1sLGRvYylcclxuXHRcdGVsc2UgaWYoJ3N0eWxlJz09dGFnKXtcclxuXHRcdFx0c3dpdGNoKHdYbWwuYXR0cigndzp0eXBlJykpe1xyXG5cdFx0XHRjYXNlICdwYXJhZ3JhcGgnOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvcGFyYWdyYXBoJykpKHdYbWwsZG9jKVxyXG5cdFx0XHRjYXNlICdjaGFyYWN0ZXInOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvaW5saW5lJykpKHdYbWwsZG9jKVxyXG5cdFx0XHRjYXNlICd0YWJsZSc6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zdHlsZS90YWJsZScpKSh3WG1sLGRvYylcclxuXHRcdFx0Y2FzZSAnbnVtYmVyaW5nJzpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL251bWJlcmluZycpKSh3WG1sLGRvYylcclxuXHRcdFx0fVxyXG5cdFx0fWVsc2UgaWYoJ2RvY0RlZmF1bHRzJz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL2RvY3VtZW50JykpKHdYbWwsZG9jKVxyXG5cdFx0ZWxzZSBpZignYm9keSc9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9ib2R5JykpKHdYbWwsZG9jLCBwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdwJz09dGFnKXtcclxuXHRcdFx0dmFyIHN0eWxlSWQ9YXR0cih3WG1sLiQxKCc+cFByPnBTdHlsZScpLCd3OnZhbCcpLCBzdHlsZT1kb2Muc3R5bGUuZ2V0KHN0eWxlSWQpXHJcblx0XHRcdGlmKHdYbWwuJDEoJz5wUHI+bnVtUHInKSB8fCAoc3R5bGUgJiYgc3R5bGUuZ2V0TnVtSWQoKSE9LTEpKVxyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvbGlzdCcpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblxyXG5cdFx0XHRsZXQgb3V0bGluZUx2bD0tMSx0bXBcclxuXHRcdFx0aWYoc3R5bGUpXHJcblx0XHRcdFx0b3V0bGluZUx2bD1zdHlsZS5nZXRPdXRsaW5lTGV2ZWwoKVxyXG5cdFx0XHRlbHNlIGlmKHRtcD13WG1sLiQxKCc+cFByPm91dGxpbmVMdmwnKSl7XHJcblx0XHRcdFx0dG1wPXBhcnNlSW50KGF0dHIodG1wKSlcclxuXHRcdFx0XHRvdXRsaW5lTHZsPXBhcnNlSW50KHRtcClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYob3V0bGluZUx2bCE9LTEpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9oZWFkaW5nJykpKHdYbWwsZG9jLCBwYXJlbnQsb3V0bGluZUx2bClcclxuXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvcGFyYWdyYXBoJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdH1lbHNlIGlmKCdyJz09dGFnKXtcclxuXHRcdFx0bGV0IHN0eWxlPWRvYy5zdHlsZS5nZXQoYXR0cih3WG1sLiQxKCc+clByPnJTdHlsZScpLCd3OnZhbCcpKVxyXG5cclxuXHRcdFx0bGV0IG91dGxpbmVMdmw9LTEsIHRtcFxyXG5cdFx0XHRpZihzdHlsZSlcclxuXHRcdFx0XHRvdXRsaW5lTHZsPXN0eWxlLmdldE91dGxpbmVMZXZlbCgpXHJcblx0XHRcdGVsc2UgaWYodG1wPXdYbWwuJDEoJz5yUHI+b3V0bGluZUx2bCcpKXtcclxuXHRcdFx0XHR0bXA9YXR0cih0bXApXHJcblx0XHRcdFx0b3V0bGluZUx2bD1wYXJzZUludCh0bXApXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKG91dGxpbmVMdmwhPS0xKVxyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvaGVhZGluZ0lubGluZScpKSh3WG1sLGRvYyxwYXJlbnQsb3V0bGluZUx2bClcclxuXHJcblx0XHRcdGlmKHdYbWwuY2hpbGROb2Rlcy5sZW5ndGg9PTEgfHwgKHdYbWwuY2hpbGROb2Rlcz09MiAmJiB3WG1sLmZpcnN0Q2hpbGQubG9jYWxOYW1lPT0nclByJykpe1xyXG5cdFx0XHRcdHN3aXRjaCh3WG1sLmxhc3RDaGlsZC5sb2NhbE5hbWUpe1xyXG5cdFx0XHRcdGNhc2UgJ2ZsZENoYXInOlxyXG5cdFx0XHRcdGNhc2UgJ2luc3RyVGV4dCc6XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFjdG9yeSh3WG1sLmxhc3RDaGlsZCxkb2MscGFyZW50KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9pbmxpbmUnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0fWVsc2UgaWYoJ2luc3RyVGV4dCc9PXRhZylcclxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ZpZWxkSW5zdHJ1Y3QnKSkod1htbCwgZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ3QnPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvdGV4dCcpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdzeW0nPT10YWcgJiYgd1htbC5wYXJlbnROb2RlLmxvY2FsTmFtZT09J3InKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N5bWJvbCcpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdzb2Z0SHlwaGVuJz09dGFnICYmIHdYbWwucGFyZW50Tm9kZS5sb2NhbE5hbWU9PSdyJylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zb2Z0SHlwaGVuJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ25vQnJlYWtIeXBoZW4nPT10YWcgJiYgd1htbC5wYXJlbnROb2RlLmxvY2FsTmFtZT09J3InKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL25vQnJlYWtIeXBoZW4nKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZigndGFiJz09dGFnICYmIHdYbWwucGFyZW50Tm9kZS5sb2NhbE5hbWU9PSdyJylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC90YWInKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignZmxkU2ltcGxlJz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ZpZWxkU2ltcGxlJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ2ZsZENoYXInPT10YWcpe1xyXG5cdFx0XHRzd2l0Y2god1htbC5hdHRyKCd3OmZsZENoYXJUeXBlJykpe1xyXG5cdFx0XHRjYXNlICdiZWdpbic6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9maWVsZEJlZ2luJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAnZW5kJzpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ZpZWxkRW5kJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAnc2VwYXJhdGUnOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZmllbGRTZXBhcmF0ZScpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdH1lbHNlIGlmKCd0YmwnPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvdGFibGUnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZigndHInPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvcm93JykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ3RjJz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NlbGwnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignYnInPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvYnInKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignaHlwZXJsaW5rJz09dGFnICYmICdwJz09d1htbC5wYXJlbnROb2RlLmxvY2FsTmFtZSlcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9oeXBlcmxpbmsnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignQWx0ZXJuYXRlQ29udGVudCc9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9kcmF3aW5nQW5jaG9yJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ3dzcCc9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zaGFwZScpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdpbmxpbmUnPT10YWcpe1xyXG5cdFx0XHR2YXIgdHlwZT13WG1sLiQxKCc+Z3JhcGhpYz5ncmFwaGljRGF0YScpLmF0dHIoJ3VyaScpLnNwbGl0KCcvJykucG9wKClcclxuXHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRjYXNlICdwaWN0dXJlJzpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ltYWdlJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdFx0Y2FzZSAnZGlhZ3JhbSc6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9kaWFncmFtJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdFx0Y2FzZSAnY2hhcnQnOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY2hhcnQnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ2lubGluZSAnK3R5cGUgKycgaXMgbm90IHN1cHBvcmVkIHlldC4nKVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZSBpZignc2R0Jz09dGFnKXtcclxuXHRcdFx0dmFyIGVsQmluZGluZz13WG1sLiQxKCc+c2R0UHI+ZGF0YUJpbmRpbmcnKVxyXG5cdFx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xyXG5cdFx0XHRcdHZhciBwYXRoPWF0dHIoZWxCaW5kaW5nLCAndzp4cGF0aCcpLFxyXG5cdFx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG5cdFx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2RvY3VtZW50UHJvcGVydHknKSkod1htbCxkb2MscGFyZW50LCBuYW1lKVxyXG5cdFx0XHR9ZWxzZSB7Ly9jb250cm9sc1xyXG5cdFx0XHRcdGxldCBlbFR5cGU9d1htbC4kMSgnPnNkdFByJykuJDEoXCJ0ZXh0LCBwaWN0dXJlLCBkb2NQYXJ0TGlzdCwgY29tYm9Cb3gsIGRyb3BEb3duTGlzdCwgZGF0ZSwgY2hlY2tib3hcIilcclxuXHRcdFx0XHR0YWc9ZWxUeXBlID8gZWxUeXBlLmxvY2FsTmFtZSA6ICdyaWNodGV4dCdcclxuXHJcblx0XHRcdFx0bGV0IGNvbnRyb2w9dGhpcy5jcmVhdGVDb250cm9sKHRhZywuLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0XHRcdGlmKGNvbnRyb2wpXHJcblx0XHRcdFx0XHRyZXR1cm4gY29udHJvbFxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZSBpZignYm9va21hcmtTdGFydCc9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9ib29rbWFya1N0YXJ0JykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ2Jvb2ttYXJrRW5kJz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2Jvb2ttYXJrRW5kJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ29NYXRoJz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2VxdWF0aW9uJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ29iamVjdCc9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9PTEUnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignc2VjdFByJz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3NlY3Rpb24nKSkod1htbCxkb2MscGFyZW50KVxyXG5cclxuXHRcdHJldHVybiBuZXcgTW9kZWwod1htbCxkb2MscGFyZW50KVxyXG5cdH1cclxuXHRcclxuXHRjcmVhdGVDb250cm9sKHR5cGUsd1htbCxkb2MscGFyZW50KXtcclxuXHRcdGlmKCd0ZXh0Jz09dHlwZSlcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL3RleHQnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZigncGljdHVyZSc9PXR5cGUpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9waWN0dXJlJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ2RvY1BhcnRMaXN0Jz09dHlwZSlcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL2dhbGxlcnknKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignY29tYm9Cb3gnPT10eXBlKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvY29tYm9ib3gnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignZHJvcERvd25MaXN0Jz09dHlwZSlcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL2Ryb3Bkb3duJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ2RhdGUnPT10eXBlKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvZGF0ZScpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdjaGVja2JveCc9PXR5cGUpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9jaGVja2JveCcpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdyaWNodGV4dCc9PXR5cGUpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9yaWNodGV4dCcpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0fVxyXG59XHJcbiJdfQ==