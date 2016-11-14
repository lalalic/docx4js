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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJhdHRyIiwibm9kZSIsIm5hbWUiLCJ1bmRlZmluZWQiLCJGYWN0b3J5Iiwid1htbCIsImRvYyIsInBhcmVudCIsIm1vcmUiLCJ0YWciLCJsb2NhbE5hbWUiLCJzd2FwIiwicmVxdWlyZSIsInN0eWxlSWQiLCIkMSIsInN0eWxlIiwiZ2V0IiwiZ2V0TnVtSWQiLCJvdXRsaW5lTHZsIiwidG1wIiwiZ2V0T3V0bGluZUxldmVsIiwicGFyc2VJbnQiLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsImZhY3RvcnkiLCJwYXJlbnROb2RlIiwidHlwZSIsInNwbGl0IiwicG9wIiwiY29uc29sZSIsImVycm9yIiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJlbFR5cGUiLCJjb250cm9sIiwiY3JlYXRlQ29udHJvbCIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxDQUFjQyxJQUFkLEVBQWdDO0FBQUEsS0FBYkMsSUFBYSx1RUFBUixPQUFROztBQUMvQixRQUFPRCxPQUFLQSxLQUFLRCxJQUFMLENBQVVFLElBQVYsQ0FBTCxHQUFxQkMsU0FBNUI7QUFDQTs7SUFFb0JDLE87Ozs7Ozs7Ozs7O3lCQUNiQyxJLEVBQU1DLEcsRUFBS0MsTSxFQUFRQyxJLEVBQUs7QUFDOUIsT0FBSUMsTUFBSUosS0FBS0ssU0FBYjtBQUFBLE9BQXdCQyxJQUF4Qjs7QUFFQSxPQUFHLGNBQVlGLEdBQWYsRUFDQyxPQUFPLEtBQUtHLFFBQVEsa0JBQVIsQ0FBTCxFQUFrQ1AsSUFBbEMsRUFBdUNDLEdBQXZDLEVBQTRDQyxNQUE1QyxDQUFQLENBREQsS0FFSyxJQUFHLFlBQVVFLEdBQWIsRUFDSixPQUFPLEtBQUtHLFFBQVEsd0JBQVIsQ0FBTCxFQUF3Q1AsSUFBeEMsRUFBNkNDLEdBQTdD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QyxHQUE5QyxFQUFrREMsTUFBbEQsQ0FBUCxDQURJLEtBRUEsSUFBRyxjQUFZcUIsSUFBZixFQUNKLE9BQU8sS0FBS2hCLFFBQVEsMEJBQVIsQ0FBTCxFQUEwQ1AsSUFBMUMsRUFBK0NDLEdBQS9DLEVBQW1EQyxNQUFuRCxDQUFQLENBREksS0FFQSxJQUFHLGtCQUFnQnFCLElBQW5CLEVBQ0osT0FBTyxLQUFLaEIsUUFBUSwwQkFBUixDQUFMLEVBQTBDUCxJQUExQyxFQUErQ0MsR0FBL0MsRUFBbURDLE1BQW5ELENBQVAsQ0FESSxLQUVBLElBQUcsVUFBUXFCLElBQVgsRUFDSixPQUFPLEtBQUtoQixRQUFRLHNCQUFSLENBQUwsRUFBc0NQLElBQXRDLEVBQTJDQyxHQUEzQyxFQUErQ0MsTUFBL0MsQ0FBUCxDQURJLEtBRUEsSUFBRyxjQUFZcUIsSUFBZixFQUNKLE9BQU8sS0FBS2hCLFFBQVEsMEJBQVIsQ0FBTCxFQUEwQ1AsSUFBMUMsRUFBK0NDLEdBQS9DLEVBQW1EQyxNQUFuRCxDQUFQLENBREksS0FFQSxJQUFHLGNBQVlxQixJQUFmLEVBQ0osT0FBTyxLQUFLaEIsUUFBUSwwQkFBUixDQUFMLEVBQTBDUCxJQUExQyxFQUErQ0MsR0FBL0MsRUFBbURDLE1BQW5ELENBQVA7QUFDRDs7Ozs7O2tCQXRLbUJILE8iLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJ1xyXG5pbXBvcnQge0ZhY3RvcnkgYXMgQmFzZX0gZnJvbSAnLi4vZG9jdW1lbnQnXHJcblxyXG5mdW5jdGlvbiBhdHRyKG5vZGUsbmFtZT0ndzp2YWwnKXtcclxuXHRyZXR1cm4gbm9kZT9ub2RlLmF0dHIobmFtZSk6dW5kZWZpbmVkXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY3RvcnkgZXh0ZW5kcyBCYXNle1xyXG5cdGNyZWF0ZSh3WG1sLCBkb2MsIHBhcmVudCwgbW9yZSl7XHJcblx0XHR2YXIgdGFnPXdYbWwubG9jYWxOYW1lLCBzd2FwO1xyXG5cclxuXHRcdGlmKCdkb2N1bWVudCc9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9kb2N1bWVudCcpKSh3WG1sLGRvYywgcGFyZW50KVxyXG5cdFx0ZWxzZSBpZignc3R5bGVzJz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2RvY3VtZW50U3R5bGVzJykpKHdYbWwsZG9jKVxyXG5cdFx0ZWxzZSBpZignYWJzdHJhY3ROdW0nPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvbnVtYmVyaW5nRGVmaW5pdGlvbicpKSh3WG1sLGRvYylcclxuXHRcdGVsc2UgaWYoJ251bSc9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zdHlsZS9saXN0JykpKHdYbWwsZG9jKVxyXG5cdFx0ZWxzZSBpZignc3R5bGUnPT10YWcpe1xyXG5cdFx0XHRzd2l0Y2god1htbC5hdHRyKCd3OnR5cGUnKSl7XHJcblx0XHRcdGNhc2UgJ3BhcmFncmFwaCc6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zdHlsZS9wYXJhZ3JhcGgnKSkod1htbCxkb2MpXHJcblx0XHRcdGNhc2UgJ2NoYXJhY3Rlcic6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zdHlsZS9pbmxpbmUnKSkod1htbCxkb2MpXHJcblx0XHRcdGNhc2UgJ3RhYmxlJzpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL3RhYmxlJykpKHdYbWwsZG9jKVxyXG5cdFx0XHRjYXNlICdudW1iZXJpbmcnOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvbnVtYmVyaW5nJykpKHdYbWwsZG9jKVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZSBpZignZG9jRGVmYXVsdHMnPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvZG9jdW1lbnQnKSkod1htbCxkb2MpXHJcblx0XHRlbHNlIGlmKCdib2R5Jz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2JvZHknKSkod1htbCxkb2MsIHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ3AnPT10YWcpe1xyXG5cdFx0XHR2YXIgc3R5bGVJZD1hdHRyKHdYbWwuJDEoJz5wUHI+cFN0eWxlJyksJ3c6dmFsJyksIHN0eWxlPWRvYy5zdHlsZS5nZXQoc3R5bGVJZClcclxuXHRcdFx0aWYod1htbC4kMSgnPnBQcj5udW1QcicpIHx8IChzdHlsZSAmJiBzdHlsZS5nZXROdW1JZCgpIT0tMSkpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9saXN0JykpKHdYbWwsZG9jLHBhcmVudClcclxuXHJcblx0XHRcdGxldCBvdXRsaW5lTHZsPS0xLHRtcFxyXG5cdFx0XHRpZihzdHlsZSlcclxuXHRcdFx0XHRvdXRsaW5lTHZsPXN0eWxlLmdldE91dGxpbmVMZXZlbCgpXHJcblx0XHRcdGVsc2UgaWYodG1wPXdYbWwuJDEoJz5wUHI+b3V0bGluZUx2bCcpKXtcclxuXHRcdFx0XHR0bXA9cGFyc2VJbnQoYXR0cih0bXApKVxyXG5cdFx0XHRcdG91dGxpbmVMdmw9cGFyc2VJbnQodG1wKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihvdXRsaW5lTHZsIT0tMSlcclxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2hlYWRpbmcnKSkod1htbCxkb2MsIHBhcmVudCxvdXRsaW5lTHZsKVxyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9wYXJhZ3JhcGgnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0fWVsc2UgaWYoJ3InPT10YWcpe1xyXG5cdFx0XHRsZXQgc3R5bGU9ZG9jLnN0eWxlLmdldChhdHRyKHdYbWwuJDEoJz5yUHI+clN0eWxlJyksJ3c6dmFsJykpXHJcblxyXG5cdFx0XHRsZXQgb3V0bGluZUx2bD0tMSwgdG1wXHJcblx0XHRcdGlmKHN0eWxlKVxyXG5cdFx0XHRcdG91dGxpbmVMdmw9c3R5bGUuZ2V0T3V0bGluZUxldmVsKClcclxuXHRcdFx0ZWxzZSBpZih0bXA9d1htbC4kMSgnPnJQcj5vdXRsaW5lTHZsJykpe1xyXG5cdFx0XHRcdHRtcD1hdHRyKHRtcClcclxuXHRcdFx0XHRvdXRsaW5lTHZsPXBhcnNlSW50KHRtcClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYob3V0bGluZUx2bCE9LTEpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9oZWFkaW5nSW5saW5lJykpKHdYbWwsZG9jLHBhcmVudCxvdXRsaW5lTHZsKVxyXG5cclxuXHRcdFx0aWYod1htbC5jaGlsZE5vZGVzLmxlbmd0aD09MSB8fCAod1htbC5jaGlsZE5vZGVzPT0yICYmIHdYbWwuZmlyc3RDaGlsZC5sb2NhbE5hbWU9PSdyUHInKSl7XHJcblx0XHRcdFx0c3dpdGNoKHdYbWwubGFzdENoaWxkLmxvY2FsTmFtZSl7XHJcblx0XHRcdFx0Y2FzZSAnZmxkQ2hhcic6XHJcblx0XHRcdFx0Y2FzZSAnaW5zdHJUZXh0JzpcclxuXHRcdFx0XHRcdHJldHVybiBmYWN0b3J5KHdYbWwubGFzdENoaWxkLGRvYyxwYXJlbnQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2lubGluZScpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHR9ZWxzZSBpZignaW5zdHJUZXh0Jz09dGFnKVxyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZmllbGRJbnN0cnVjdCcpKSh3WG1sLCBkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZigndCc9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC90ZXh0JykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ3N5bSc9PXRhZyAmJiB3WG1sLnBhcmVudE5vZGUubG9jYWxOYW1lPT0ncicpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3ltYm9sJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ3NvZnRIeXBoZW4nPT10YWcgJiYgd1htbC5wYXJlbnROb2RlLmxvY2FsTmFtZT09J3InKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3NvZnRIeXBoZW4nKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignbm9CcmVha0h5cGhlbic9PXRhZyAmJiB3WG1sLnBhcmVudE5vZGUubG9jYWxOYW1lPT0ncicpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvbm9CcmVha0h5cGhlbicpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCd0YWInPT10YWcgJiYgd1htbC5wYXJlbnROb2RlLmxvY2FsTmFtZT09J3InKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3RhYicpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdmbGRTaW1wbGUnPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZmllbGRTaW1wbGUnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignZmxkQ2hhcic9PXRhZyl7XHJcblx0XHRcdHN3aXRjaCh3WG1sLmF0dHIoJ3c6ZmxkQ2hhclR5cGUnKSl7XHJcblx0XHRcdGNhc2UgJ2JlZ2luJzpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ZpZWxkQmVnaW4nKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlICdlbmQnOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZmllbGRFbmQnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlICdzZXBhcmF0ZSc6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9maWVsZFNlcGFyYXRlJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fWVsc2UgaWYoJ3RibCc9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC90YWJsZScpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCd0cic9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9yb3cnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZigndGMnPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY2VsbCcpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdicic9PXRhZylcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9icicpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdoeXBlcmxpbmsnPT10YWcgJiYgJ3AnPT13WG1sLnBhcmVudE5vZGUubG9jYWxOYW1lKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2h5cGVybGluaycpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdBbHRlcm5hdGVDb250ZW50Jz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2RyYXdpbmdBbmNob3InKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignd3NwJz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3NoYXBlJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ2lubGluZSc9PXRhZyl7XHJcblx0XHRcdHZhciB0eXBlPXdYbWwuJDEoJz5ncmFwaGljPmdyYXBoaWNEYXRhJykuYXR0cigndXJpJykuc3BsaXQoJy8nKS5wb3AoKVxyXG5cdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdGNhc2UgJ3BpY3R1cmUnOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvaW1hZ2UnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0XHRjYXNlICdkaWFncmFtJzpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2RpYWdyYW0nKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0XHRjYXNlICdjaGFydCc6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jaGFydCcpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignaW5saW5lICcrdHlwZSArJyBpcyBub3Qgc3VwcG9yZWQgeWV0LicpXHJcblx0XHRcdH1cclxuXHRcdH1lbHNlIGlmKCdzZHQnPT10YWcpe1xyXG5cdFx0XHR2YXIgZWxCaW5kaW5nPXdYbWwuJDEoJz5zZHRQcj5kYXRhQmluZGluZycpXHJcblx0XHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXHJcblx0XHRcdFx0dmFyIHBhdGg9YXR0cihlbEJpbmRpbmcsICd3OnhwYXRoJyksXHJcblx0XHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXHJcblx0XHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xyXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZG9jdW1lbnRQcm9wZXJ0eScpKSh3WG1sLGRvYyxwYXJlbnQsIG5hbWUpXHJcblx0XHRcdH1lbHNlIHsvL2NvbnRyb2xzXHJcblx0XHRcdFx0bGV0IGVsVHlwZT13WG1sLiQxKCc+c2R0UHInKS4kMShcInRleHQsIHBpY3R1cmUsIGRvY1BhcnRMaXN0LCBjb21ib0JveCwgZHJvcERvd25MaXN0LCBkYXRlLCBjaGVja2JveFwiKVxyXG5cdFx0XHRcdHRhZz1lbFR5cGUgPyBlbFR5cGUubG9jYWxOYW1lIDogJ3JpY2h0ZXh0J1xyXG5cclxuXHRcdFx0XHRsZXQgY29udHJvbD10aGlzLmNyZWF0ZUNvbnRyb2wodGFnLC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRcdFx0aWYoY29udHJvbClcclxuXHRcdFx0XHRcdHJldHVybiBjb250cm9sXHJcblx0XHRcdH1cclxuXHRcdH1lbHNlIGlmKCdib29rbWFya1N0YXJ0Jz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2Jvb2ttYXJrU3RhcnQnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignYm9va21hcmtFbmQnPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvYm9va21hcmtFbmQnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignb01hdGgnPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZXF1YXRpb24nKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignb2JqZWN0Jz09dGFnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL09MRScpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdzZWN0UHInPT10YWcpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc2VjdGlvbicpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblxyXG5cdFx0cmV0dXJuIG5ldyBNb2RlbCh3WG1sLGRvYyxwYXJlbnQpXHJcblx0fVxyXG5cdFxyXG5cdGNyZWF0ZUNvbnRyb2wodHlwZSx3WG1sLGRvYyxwYXJlbnQpe1xyXG5cdFx0aWYoJ3RleHQnPT10eXBlKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvdGV4dCcpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdwaWN0dXJlJz09dHlwZSlcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL3BpY3R1cmUnKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignZG9jUGFydExpc3QnPT10eXBlKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvZ2FsbGVyeScpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdjb21ib0JveCc9PXR5cGUpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9jb21ib2JveCcpKSh3WG1sLGRvYyxwYXJlbnQpXHJcblx0XHRlbHNlIGlmKCdkcm9wRG93bkxpc3QnPT10eXBlKVxyXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvZHJvcGRvd24nKSkod1htbCxkb2MscGFyZW50KVxyXG5cdFx0ZWxzZSBpZignZGF0ZSc9PXR5cGUpXHJcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9kYXRlJykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ2NoZWNrYm94Jz09dHlwZSlcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL2NoZWNrYm94JykpKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdGVsc2UgaWYoJ3JpY2h0ZXh0Jz09dHlwZSlcclxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL3JpY2h0ZXh0JykpKHdYbWwsZG9jLHBhcmVudClcclxuXHR9XHJcbn1cclxuIl19