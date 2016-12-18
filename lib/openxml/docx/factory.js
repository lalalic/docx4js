'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _document = require('../document');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function attr(node) {
	var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'w:val';

	return node ? node.attr(name) : undefined;
}

var Factory = function (_Base) {
	_inherits(Factory, _Base);

	function Factory() {
		_classCallCheck(this, Factory);

		return _possibleConstructorReturn(this, (Factory.__proto__ || Object.getPrototypeOf(Factory)).apply(this, arguments));
	}

	_createClass(Factory, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJhdHRyIiwibm9kZSIsIm5hbWUiLCJ1bmRlZmluZWQiLCJGYWN0b3J5Iiwid1htbCIsImRvYyIsInBhcmVudCIsIm1vcmUiLCJ0YWciLCJsb2NhbE5hbWUiLCJzd2FwIiwicmVxdWlyZSIsInN0eWxlSWQiLCIkMSIsInN0eWxlIiwiZ2V0IiwiZ2V0TnVtSWQiLCJvdXRsaW5lTHZsIiwidG1wIiwiZ2V0T3V0bGluZUxldmVsIiwicGFyc2VJbnQiLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsImZhY3RvcnkiLCJwYXJlbnROb2RlIiwidHlwZSIsInNwbGl0IiwicG9wIiwiY29uc29sZSIsImVycm9yIiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJlbFR5cGUiLCJjb250cm9sIiwiY3JlYXRlQ29udHJvbCIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxDQUFjQyxJQUFkLEVBQWdDO0FBQUEsS0FBYkMsSUFBYSx1RUFBUixPQUFROztBQUMvQixRQUFPRCxPQUFLQSxLQUFLRCxJQUFMLENBQVVFLElBQVYsQ0FBTCxHQUFxQkMsU0FBNUI7QUFDQTs7SUFFb0JDLE87Ozs7Ozs7Ozs7O3lCQUNiQyxJLEVBQU1DLEcsRUFBS0MsTSxFQUFRQyxJLEVBQUs7QUFDOUIsT0FBSUMsTUFBSUosS0FBS0ssU0FBYjtBQUFBLE9BQXdCQyxJQUF4Qjs7QUFFQSxPQUFHLGNBQVlGLEdBQWYsRUFDQyxPQUFPLEtBQUtHLFFBQVEsa0JBQVIsQ0FBTCxFQUFrQ1AsSUFBbEMsRUFBdUNDLEdBQXZDLEVBQTRDQyxNQUE1QyxDQUFQLENBREQsS0FFSyxJQUFHLFlBQVVFLEdBQWIsRUFDSixPQUFPLEtBQUtHLFFBQVEsd0JBQVIsQ0FBTCxFQUF3Q1AsSUFBeEMsRUFBNkNDLEdBQTdD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QyxHQUE5QyxFQUFrREMsTUFBbEQsQ0FBUCxDQURJLEtBRUEsSUFBRyxjQUFZcUIsSUFBZixFQUNKLE9BQU8sS0FBS2hCLFFBQVEsMEJBQVIsQ0FBTCxFQUEwQ1AsSUFBMUMsRUFBK0NDLEdBQS9DLEVBQW1EQyxNQUFuRCxDQUFQLENBREksS0FFQSxJQUFHLGtCQUFnQnFCLElBQW5CLEVBQ0osT0FBTyxLQUFLaEIsUUFBUSwwQkFBUixDQUFMLEVBQTBDUCxJQUExQyxFQUErQ0MsR0FBL0MsRUFBbURDLE1BQW5ELENBQVAsQ0FESSxLQUVBLElBQUcsVUFBUXFCLElBQVgsRUFDSixPQUFPLEtBQUtoQixRQUFRLHNCQUFSLENBQUwsRUFBc0NQLElBQXRDLEVBQTJDQyxHQUEzQyxFQUErQ0MsTUFBL0MsQ0FBUCxDQURJLEtBRUEsSUFBRyxjQUFZcUIsSUFBZixFQUNKLE9BQU8sS0FBS2hCLFFBQVEsMEJBQVIsQ0FBTCxFQUEwQ1AsSUFBMUMsRUFBK0NDLEdBQS9DLEVBQW1EQyxNQUFuRCxDQUFQLENBREksS0FFQSxJQUFHLGNBQVlxQixJQUFmLEVBQ0osT0FBTyxLQUFLaEIsUUFBUSwwQkFBUixDQUFMLEVBQTBDUCxJQUExQyxFQUErQ0MsR0FBL0MsRUFBbURDLE1BQW5ELENBQVA7QUFDRDs7Ozs7O2tCQXRLbUJILE8iLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJ1xuaW1wb3J0IHtGYWN0b3J5IGFzIEJhc2V9IGZyb20gJy4uL2RvY3VtZW50J1xuXG5mdW5jdGlvbiBhdHRyKG5vZGUsbmFtZT0ndzp2YWwnKXtcblx0cmV0dXJuIG5vZGU/bm9kZS5hdHRyKG5hbWUpOnVuZGVmaW5lZFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYWN0b3J5IGV4dGVuZHMgQmFzZXtcblx0Y3JlYXRlKHdYbWwsIGRvYywgcGFyZW50LCBtb3JlKXtcblx0XHR2YXIgdGFnPXdYbWwubG9jYWxOYW1lLCBzd2FwO1xuXG5cdFx0aWYoJ2RvY3VtZW50Jz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9kb2N1bWVudCcpKSh3WG1sLGRvYywgcGFyZW50KVxuXHRcdGVsc2UgaWYoJ3N0eWxlcyc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZG9jdW1lbnRTdHlsZXMnKSkod1htbCxkb2MpXG5cdFx0ZWxzZSBpZignYWJzdHJhY3ROdW0nPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL251bWJlcmluZ0RlZmluaXRpb24nKSkod1htbCxkb2MpXG5cdFx0ZWxzZSBpZignbnVtJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zdHlsZS9saXN0JykpKHdYbWwsZG9jKVxuXHRcdGVsc2UgaWYoJ3N0eWxlJz09dGFnKXtcblx0XHRcdHN3aXRjaCh3WG1sLmF0dHIoJ3c6dHlwZScpKXtcblx0XHRcdGNhc2UgJ3BhcmFncmFwaCc6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvcGFyYWdyYXBoJykpKHdYbWwsZG9jKVxuXHRcdFx0Y2FzZSAnY2hhcmFjdGVyJzpcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zdHlsZS9pbmxpbmUnKSkod1htbCxkb2MpXG5cdFx0XHRjYXNlICd0YWJsZSc6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvdGFibGUnKSkod1htbCxkb2MpXG5cdFx0XHRjYXNlICdudW1iZXJpbmcnOlxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL251bWJlcmluZycpKSh3WG1sLGRvYylcblx0XHRcdH1cblx0XHR9ZWxzZSBpZignZG9jRGVmYXVsdHMnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL2RvY3VtZW50JykpKHdYbWwsZG9jKVxuXHRcdGVsc2UgaWYoJ2JvZHknPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2JvZHknKSkod1htbCxkb2MsIHBhcmVudClcblx0XHRlbHNlIGlmKCdwJz09dGFnKXtcblx0XHRcdHZhciBzdHlsZUlkPWF0dHIod1htbC4kMSgnPnBQcj5wU3R5bGUnKSwndzp2YWwnKSwgc3R5bGU9ZG9jLnN0eWxlLmdldChzdHlsZUlkKVxuXHRcdFx0aWYod1htbC4kMSgnPnBQcj5udW1QcicpIHx8IChzdHlsZSAmJiBzdHlsZS5nZXROdW1JZCgpIT0tMSkpXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvbGlzdCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cblx0XHRcdGxldCBvdXRsaW5lTHZsPS0xLHRtcFxuXHRcdFx0aWYoc3R5bGUpXG5cdFx0XHRcdG91dGxpbmVMdmw9c3R5bGUuZ2V0T3V0bGluZUxldmVsKClcblx0XHRcdGVsc2UgaWYodG1wPXdYbWwuJDEoJz5wUHI+b3V0bGluZUx2bCcpKXtcblx0XHRcdFx0dG1wPXBhcnNlSW50KGF0dHIodG1wKSlcblx0XHRcdFx0b3V0bGluZUx2bD1wYXJzZUludCh0bXApXG5cdFx0XHR9XG5cblx0XHRcdGlmKG91dGxpbmVMdmwhPS0xKVxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2hlYWRpbmcnKSkod1htbCxkb2MsIHBhcmVudCxvdXRsaW5lTHZsKVxuXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3BhcmFncmFwaCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0fWVsc2UgaWYoJ3InPT10YWcpe1xuXHRcdFx0bGV0IHN0eWxlPWRvYy5zdHlsZS5nZXQoYXR0cih3WG1sLiQxKCc+clByPnJTdHlsZScpLCd3OnZhbCcpKVxuXG5cdFx0XHRsZXQgb3V0bGluZUx2bD0tMSwgdG1wXG5cdFx0XHRpZihzdHlsZSlcblx0XHRcdFx0b3V0bGluZUx2bD1zdHlsZS5nZXRPdXRsaW5lTGV2ZWwoKVxuXHRcdFx0ZWxzZSBpZih0bXA9d1htbC4kMSgnPnJQcj5vdXRsaW5lTHZsJykpe1xuXHRcdFx0XHR0bXA9YXR0cih0bXApXG5cdFx0XHRcdG91dGxpbmVMdmw9cGFyc2VJbnQodG1wKVxuXHRcdFx0fVxuXG5cdFx0XHRpZihvdXRsaW5lTHZsIT0tMSlcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9oZWFkaW5nSW5saW5lJykpKHdYbWwsZG9jLHBhcmVudCxvdXRsaW5lTHZsKVxuXG5cdFx0XHRpZih3WG1sLmNoaWxkTm9kZXMubGVuZ3RoPT0xIHx8ICh3WG1sLmNoaWxkTm9kZXM9PTIgJiYgd1htbC5maXJzdENoaWxkLmxvY2FsTmFtZT09J3JQcicpKXtcblx0XHRcdFx0c3dpdGNoKHdYbWwubGFzdENoaWxkLmxvY2FsTmFtZSl7XG5cdFx0XHRcdGNhc2UgJ2ZsZENoYXInOlxuXHRcdFx0XHRjYXNlICdpbnN0clRleHQnOlxuXHRcdFx0XHRcdHJldHVybiBmYWN0b3J5KHdYbWwubGFzdENoaWxkLGRvYyxwYXJlbnQpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9pbmxpbmUnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdH1lbHNlIGlmKCdpbnN0clRleHQnPT10YWcpXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZmllbGRJbnN0cnVjdCcpKSh3WG1sLCBkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ3QnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3RleHQnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ3N5bSc9PXRhZyAmJiB3WG1sLnBhcmVudE5vZGUubG9jYWxOYW1lPT0ncicpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N5bWJvbCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignc29mdEh5cGhlbic9PXRhZyAmJiB3WG1sLnBhcmVudE5vZGUubG9jYWxOYW1lPT0ncicpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3NvZnRIeXBoZW4nKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ25vQnJlYWtIeXBoZW4nPT10YWcgJiYgd1htbC5wYXJlbnROb2RlLmxvY2FsTmFtZT09J3InKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9ub0JyZWFrSHlwaGVuJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCd0YWInPT10YWcgJiYgd1htbC5wYXJlbnROb2RlLmxvY2FsTmFtZT09J3InKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC90YWInKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2ZsZFNpbXBsZSc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZmllbGRTaW1wbGUnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2ZsZENoYXInPT10YWcpe1xuXHRcdFx0c3dpdGNoKHdYbWwuYXR0cigndzpmbGRDaGFyVHlwZScpKXtcblx0XHRcdGNhc2UgJ2JlZ2luJzpcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9maWVsZEJlZ2luJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdlbmQnOlxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ZpZWxkRW5kJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdzZXBhcmF0ZSc6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZmllbGRTZXBhcmF0ZScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKCd0YmwnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3RhYmxlJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCd0cic9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvcm93JykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCd0Yyc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY2VsbCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignYnInPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2JyJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdoeXBlcmxpbmsnPT10YWcgJiYgJ3AnPT13WG1sLnBhcmVudE5vZGUubG9jYWxOYW1lKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9oeXBlcmxpbmsnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ0FsdGVybmF0ZUNvbnRlbnQnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2RyYXdpbmdBbmNob3InKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ3dzcCc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc2hhcGUnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2lubGluZSc9PXRhZyl7XG5cdFx0XHR2YXIgdHlwZT13WG1sLiQxKCc+Z3JhcGhpYz5ncmFwaGljRGF0YScpLmF0dHIoJ3VyaScpLnNwbGl0KCcvJykucG9wKClcblx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdGNhc2UgJ3BpY3R1cmUnOlxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ltYWdlJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRcdGNhc2UgJ2RpYWdyYW0nOlxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2RpYWdyYW0nKSkod1htbCxkb2MscGFyZW50KVxuXHRcdFx0Y2FzZSAnY2hhcnQnOlxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NoYXJ0JykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ2lubGluZSAnK3R5cGUgKycgaXMgbm90IHN1cHBvcmVkIHlldC4nKVxuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKCdzZHQnPT10YWcpe1xuXHRcdFx0dmFyIGVsQmluZGluZz13WG1sLiQxKCc+c2R0UHI+ZGF0YUJpbmRpbmcnKVxuXHRcdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcblx0XHRcdFx0dmFyIHBhdGg9YXR0cihlbEJpbmRpbmcsICd3OnhwYXRoJyksXG5cdFx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxuXHRcdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZG9jdW1lbnRQcm9wZXJ0eScpKSh3WG1sLGRvYyxwYXJlbnQsIG5hbWUpXG5cdFx0XHR9ZWxzZSB7Ly9jb250cm9sc1xuXHRcdFx0XHRsZXQgZWxUeXBlPXdYbWwuJDEoJz5zZHRQcicpLiQxKFwidGV4dCwgcGljdHVyZSwgZG9jUGFydExpc3QsIGNvbWJvQm94LCBkcm9wRG93bkxpc3QsIGRhdGUsIGNoZWNrYm94XCIpXG5cdFx0XHRcdHRhZz1lbFR5cGUgPyBlbFR5cGUubG9jYWxOYW1lIDogJ3JpY2h0ZXh0J1xuXG5cdFx0XHRcdGxldCBjb250cm9sPXRoaXMuY3JlYXRlQ29udHJvbCh0YWcsLi4uYXJndW1lbnRzKVxuXG5cdFx0XHRcdGlmKGNvbnRyb2wpXG5cdFx0XHRcdFx0cmV0dXJuIGNvbnRyb2xcblx0XHRcdH1cblx0XHR9ZWxzZSBpZignYm9va21hcmtTdGFydCc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvYm9va21hcmtTdGFydCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignYm9va21hcmtFbmQnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2Jvb2ttYXJrRW5kJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdvTWF0aCc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZXF1YXRpb24nKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ29iamVjdCc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvT0xFJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdzZWN0UHInPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3NlY3Rpb24nKSkod1htbCxkb2MscGFyZW50KVxuXG5cdFx0cmV0dXJuIG5ldyBNb2RlbCh3WG1sLGRvYyxwYXJlbnQpXG5cdH1cblx0XG5cdGNyZWF0ZUNvbnRyb2wodHlwZSx3WG1sLGRvYyxwYXJlbnQpe1xuXHRcdGlmKCd0ZXh0Jz09dHlwZSlcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC90ZXh0JykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdwaWN0dXJlJz09dHlwZSlcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9waWN0dXJlJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdkb2NQYXJ0TGlzdCc9PXR5cGUpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvZ2FsbGVyeScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignY29tYm9Cb3gnPT10eXBlKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL2NvbWJvYm94JykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdkcm9wRG93bkxpc3QnPT10eXBlKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL2Ryb3Bkb3duJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdkYXRlJz09dHlwZSlcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9kYXRlJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdjaGVja2JveCc9PXR5cGUpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvY2hlY2tib3gnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ3JpY2h0ZXh0Jz09dHlwZSlcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9yaWNodGV4dCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdH1cbn1cbiJdfQ==