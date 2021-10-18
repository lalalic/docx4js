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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJhdHRyIiwibm9kZSIsIm5hbWUiLCJ1bmRlZmluZWQiLCJGYWN0b3J5Iiwid1htbCIsImRvYyIsInBhcmVudCIsIm1vcmUiLCJ0YWciLCJsb2NhbE5hbWUiLCJzd2FwIiwicmVxdWlyZSIsInN0eWxlSWQiLCIkMSIsInN0eWxlIiwiZ2V0IiwiZ2V0TnVtSWQiLCJvdXRsaW5lTHZsIiwidG1wIiwiZ2V0T3V0bGluZUxldmVsIiwicGFyc2VJbnQiLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsImZhY3RvcnkiLCJwYXJlbnROb2RlIiwidHlwZSIsInNwbGl0IiwicG9wIiwiY29uc29sZSIsImVycm9yIiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJlbFR5cGUiLCJjb250cm9sIiwiY3JlYXRlQ29udHJvbCIsImFyZ3VtZW50cyIsIk1vZGVsIiwiQmFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxDQUFjQyxJQUFkLEVBQWdDO0FBQUEsS0FBYkMsSUFBYSx1RUFBUixPQUFROztBQUMvQixRQUFPRCxPQUFLQSxLQUFLRCxJQUFMLENBQVVFLElBQVYsQ0FBTCxHQUFxQkMsU0FBNUI7QUFDQTs7SUFFb0JDLE87Ozs7Ozs7Ozs7O3lCQUNiQyxJLEVBQU1DLEcsRUFBS0MsTSxFQUFRQyxJLEVBQUs7QUFDOUIsT0FBSUMsTUFBSUosS0FBS0ssU0FBYjtBQUFBLE9BQXdCQyxJQUF4Qjs7QUFFQSxPQUFHLGNBQVlGLEdBQWYsRUFDQyxPQUFPLEtBQUtHLFFBQVEsa0JBQVIsQ0FBTCxFQUFrQ1AsSUFBbEMsRUFBdUNDLEdBQXZDLEVBQTRDQyxNQUE1QyxDQUFQLENBREQsS0FFSyxJQUFHLFlBQVVFLEdBQWIsRUFDSixPQUFPLEtBQUtHLFFBQVEsd0JBQVIsQ0FBTCxFQUF3Q1AsSUFB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QUFSLENBQUwsRUFBeUNQLElBQXpDLEVBQThDQyxHQUE5QyxFQUFrREMsTUFBbEQsQ0FBUCxDQURJLEtBRUEsSUFBRyxjQUFZcUIsSUFBZixFQUNKLE9BQU8sS0FBS2hCLFFBQVEsMEJBQVIsQ0FBTCxFQUEwQ1AsSUFBMUMsRUFBK0NDLEdBQS9DLEVBQW1EQyxNQUFuRCxDQUFQLENBREksS0FFQSxJQUFHLGtCQUFnQnFCLElBQW5CLEVBQ0osT0FBTyxLQUFLaEIsUUFBUSwwQkFBUixDQUFMLEVBQTBDUCxJQUExQyxFQUErQ0MsR0FBL0MsRUFBbURDLE1BQW5ELENBQVAsQ0FESSxLQUVBLElBQUcsVUFBUXFCLElBQVgsRUFDSixPQUFPLEtBQUtoQixRQUFRLHNCQUFSLENBQUwsRUFBc0NQLElBQXRDLEVBQTJDQyxHQUEzQyxFQUErQ0MsTUFBL0MsQ0FBUCxDQURJLEtBRUEsSUFBRyxjQUFZcUIsSUFBZixFQUNKLE9BQU8sS0FBS2hCLFFBQVEsMEJBQVIsQ0FBTCxFQUEwQ1AsSUFBMUMsRUFBK0NDLEdBQS9DLEVBQW1EQyxNQUFuRCxDQUFQLENBREksS0FFQSxJQUFHLGNBQVlxQixJQUFmLEVBQ0osT0FBTyxLQUFLaEIsUUFBUSwwQkFBUixDQUFMLEVBQTBDUCxJQUExQyxFQUErQ0MsR0FBL0MsRUFBbURDLE1BQW5ELENBQVA7QUFDRDs7OztFQXRLbUNrQyxpQjs7a0JBQWhCckMsTyIsImZpbGUiOiJmYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsIGZyb20gJy4vbW9kZWwnXG5pbXBvcnQge0ZhY3RvcnkgYXMgQmFzZX0gZnJvbSAnLi4vZG9jdW1lbnQnXG5cbmZ1bmN0aW9uIGF0dHIobm9kZSxuYW1lPSd3OnZhbCcpe1xuXHRyZXR1cm4gbm9kZT9ub2RlLmF0dHIobmFtZSk6dW5kZWZpbmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY3RvcnkgZXh0ZW5kcyBCYXNle1xuXHRjcmVhdGUod1htbCwgZG9jLCBwYXJlbnQsIG1vcmUpe1xuXHRcdHZhciB0YWc9d1htbC5sb2NhbE5hbWUsIHN3YXA7XG5cblx0XHRpZignZG9jdW1lbnQnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2RvY3VtZW50JykpKHdYbWwsZG9jLCBwYXJlbnQpXG5cdFx0ZWxzZSBpZignc3R5bGVzJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9kb2N1bWVudFN0eWxlcycpKSh3WG1sLGRvYylcblx0XHRlbHNlIGlmKCdhYnN0cmFjdE51bSc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvbnVtYmVyaW5nRGVmaW5pdGlvbicpKSh3WG1sLGRvYylcblx0XHRlbHNlIGlmKCdudW0nPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL2xpc3QnKSkod1htbCxkb2MpXG5cdFx0ZWxzZSBpZignc3R5bGUnPT10YWcpe1xuXHRcdFx0c3dpdGNoKHdYbWwuYXR0cigndzp0eXBlJykpe1xuXHRcdFx0Y2FzZSAncGFyYWdyYXBoJzpcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zdHlsZS9wYXJhZ3JhcGgnKSkod1htbCxkb2MpXG5cdFx0XHRjYXNlICdjaGFyYWN0ZXInOlxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL2lubGluZScpKSh3WG1sLGRvYylcblx0XHRcdGNhc2UgJ3RhYmxlJzpcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zdHlsZS90YWJsZScpKSh3WG1sLGRvYylcblx0XHRcdGNhc2UgJ251bWJlcmluZyc6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvbnVtYmVyaW5nJykpKHdYbWwsZG9jKVxuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKCdkb2NEZWZhdWx0cyc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvZG9jdW1lbnQnKSkod1htbCxkb2MpXG5cdFx0ZWxzZSBpZignYm9keSc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvYm9keScpKSh3WG1sLGRvYywgcGFyZW50KVxuXHRcdGVsc2UgaWYoJ3AnPT10YWcpe1xuXHRcdFx0dmFyIHN0eWxlSWQ9YXR0cih3WG1sLiQxKCc+cFByPnBTdHlsZScpLCd3OnZhbCcpLCBzdHlsZT1kb2Muc3R5bGUuZ2V0KHN0eWxlSWQpXG5cdFx0XHRpZih3WG1sLiQxKCc+cFByPm51bVByJykgfHwgKHN0eWxlICYmIHN0eWxlLmdldE51bUlkKCkhPS0xKSlcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9saXN0JykpKHdYbWwsZG9jLHBhcmVudClcblxuXHRcdFx0bGV0IG91dGxpbmVMdmw9LTEsdG1wXG5cdFx0XHRpZihzdHlsZSlcblx0XHRcdFx0b3V0bGluZUx2bD1zdHlsZS5nZXRPdXRsaW5lTGV2ZWwoKVxuXHRcdFx0ZWxzZSBpZih0bXA9d1htbC4kMSgnPnBQcj5vdXRsaW5lTHZsJykpe1xuXHRcdFx0XHR0bXA9cGFyc2VJbnQoYXR0cih0bXApKVxuXHRcdFx0XHRvdXRsaW5lTHZsPXBhcnNlSW50KHRtcClcblx0XHRcdH1cblxuXHRcdFx0aWYob3V0bGluZUx2bCE9LTEpXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvaGVhZGluZycpKSh3WG1sLGRvYywgcGFyZW50LG91dGxpbmVMdmwpXG5cblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvcGFyYWdyYXBoJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHR9ZWxzZSBpZigncic9PXRhZyl7XG5cdFx0XHRsZXQgc3R5bGU9ZG9jLnN0eWxlLmdldChhdHRyKHdYbWwuJDEoJz5yUHI+clN0eWxlJyksJ3c6dmFsJykpXG5cblx0XHRcdGxldCBvdXRsaW5lTHZsPS0xLCB0bXBcblx0XHRcdGlmKHN0eWxlKVxuXHRcdFx0XHRvdXRsaW5lTHZsPXN0eWxlLmdldE91dGxpbmVMZXZlbCgpXG5cdFx0XHRlbHNlIGlmKHRtcD13WG1sLiQxKCc+clByPm91dGxpbmVMdmwnKSl7XG5cdFx0XHRcdHRtcD1hdHRyKHRtcClcblx0XHRcdFx0b3V0bGluZUx2bD1wYXJzZUludCh0bXApXG5cdFx0XHR9XG5cblx0XHRcdGlmKG91dGxpbmVMdmwhPS0xKVxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2hlYWRpbmdJbmxpbmUnKSkod1htbCxkb2MscGFyZW50LG91dGxpbmVMdmwpXG5cblx0XHRcdGlmKHdYbWwuY2hpbGROb2Rlcy5sZW5ndGg9PTEgfHwgKHdYbWwuY2hpbGROb2Rlcz09MiAmJiB3WG1sLmZpcnN0Q2hpbGQubG9jYWxOYW1lPT0nclByJykpe1xuXHRcdFx0XHRzd2l0Y2god1htbC5sYXN0Q2hpbGQubG9jYWxOYW1lKXtcblx0XHRcdFx0Y2FzZSAnZmxkQ2hhcic6XG5cdFx0XHRcdGNhc2UgJ2luc3RyVGV4dCc6XG5cdFx0XHRcdFx0cmV0dXJuIGZhY3Rvcnkod1htbC5sYXN0Q2hpbGQsZG9jLHBhcmVudClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2lubGluZScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0fWVsc2UgaWYoJ2luc3RyVGV4dCc9PXRhZylcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9maWVsZEluc3RydWN0JykpKHdYbWwsIGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZigndCc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvdGV4dCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignc3ltJz09dGFnICYmIHdYbWwucGFyZW50Tm9kZS5sb2NhbE5hbWU9PSdyJylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3ltYm9sJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdzb2Z0SHlwaGVuJz09dGFnICYmIHdYbWwucGFyZW50Tm9kZS5sb2NhbE5hbWU9PSdyJylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc29mdEh5cGhlbicpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignbm9CcmVha0h5cGhlbic9PXRhZyAmJiB3WG1sLnBhcmVudE5vZGUubG9jYWxOYW1lPT0ncicpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL25vQnJlYWtIeXBoZW4nKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ3RhYic9PXRhZyAmJiB3WG1sLnBhcmVudE5vZGUubG9jYWxOYW1lPT0ncicpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3RhYicpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignZmxkU2ltcGxlJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9maWVsZFNpbXBsZScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignZmxkQ2hhcic9PXRhZyl7XG5cdFx0XHRzd2l0Y2god1htbC5hdHRyKCd3OmZsZENoYXJUeXBlJykpe1xuXHRcdFx0Y2FzZSAnYmVnaW4nOlxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ZpZWxkQmVnaW4nKSkod1htbCxkb2MscGFyZW50KVxuXHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ2VuZCc6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZmllbGRFbmQnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ3NlcGFyYXRlJzpcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9maWVsZFNlcGFyYXRlJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fWVsc2UgaWYoJ3RibCc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvdGFibGUnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ3RyJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9yb3cnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ3RjJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jZWxsJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdicic9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvYnInKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2h5cGVybGluayc9PXRhZyAmJiAncCc9PXdYbWwucGFyZW50Tm9kZS5sb2NhbE5hbWUpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2h5cGVybGluaycpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignQWx0ZXJuYXRlQ29udGVudCc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZHJhd2luZ0FuY2hvcicpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignd3NwJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zaGFwZScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignaW5saW5lJz09dGFnKXtcblx0XHRcdHZhciB0eXBlPXdYbWwuJDEoJz5ncmFwaGljPmdyYXBoaWNEYXRhJykuYXR0cigndXJpJykuc3BsaXQoJy8nKS5wb3AoKVxuXHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0Y2FzZSAncGljdHVyZSc6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvaW1hZ2UnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdFx0Y2FzZSAnZGlhZ3JhbSc6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZGlhZ3JhbScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0XHRjYXNlICdjaGFydCc6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY2hhcnQnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Y29uc29sZS5lcnJvcignaW5saW5lICcrdHlwZSArJyBpcyBub3Qgc3VwcG9yZWQgeWV0LicpXG5cdFx0XHR9XG5cdFx0fWVsc2UgaWYoJ3NkdCc9PXRhZyl7XG5cdFx0XHR2YXIgZWxCaW5kaW5nPXdYbWwuJDEoJz5zZHRQcj5kYXRhQmluZGluZycpXG5cdFx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xuXHRcdFx0XHR2YXIgcGF0aD1hdHRyKGVsQmluZGluZywgJ3c6eHBhdGgnKSxcblx0XHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXG5cdFx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9kb2N1bWVudFByb3BlcnR5JykpKHdYbWwsZG9jLHBhcmVudCwgbmFtZSlcblx0XHRcdH1lbHNlIHsvL2NvbnRyb2xzXG5cdFx0XHRcdGxldCBlbFR5cGU9d1htbC4kMSgnPnNkdFByJykuJDEoXCJ0ZXh0LCBwaWN0dXJlLCBkb2NQYXJ0TGlzdCwgY29tYm9Cb3gsIGRyb3BEb3duTGlzdCwgZGF0ZSwgY2hlY2tib3hcIilcblx0XHRcdFx0dGFnPWVsVHlwZSA/IGVsVHlwZS5sb2NhbE5hbWUgOiAncmljaHRleHQnXG5cblx0XHRcdFx0bGV0IGNvbnRyb2w9dGhpcy5jcmVhdGVDb250cm9sKHRhZywuLi5hcmd1bWVudHMpXG5cblx0XHRcdFx0aWYoY29udHJvbClcblx0XHRcdFx0XHRyZXR1cm4gY29udHJvbFxuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKCdib29rbWFya1N0YXJ0Jz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9ib29rbWFya1N0YXJ0JykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdib29rbWFya0VuZCc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvYm9va21hcmtFbmQnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ29NYXRoJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9lcXVhdGlvbicpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignb2JqZWN0Jz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9PTEUnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ3NlY3RQcic9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc2VjdGlvbicpKSh3WG1sLGRvYyxwYXJlbnQpXG5cblx0XHRyZXR1cm4gbmV3IE1vZGVsKHdYbWwsZG9jLHBhcmVudClcblx0fVxuXHRcblx0Y3JlYXRlQ29udHJvbCh0eXBlLHdYbWwsZG9jLHBhcmVudCl7XG5cdFx0aWYoJ3RleHQnPT10eXBlKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL3RleHQnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ3BpY3R1cmUnPT10eXBlKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL3BpY3R1cmUnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2RvY1BhcnRMaXN0Jz09dHlwZSlcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9nYWxsZXJ5JykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdjb21ib0JveCc9PXR5cGUpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvY29tYm9ib3gnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2Ryb3BEb3duTGlzdCc9PXR5cGUpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvZHJvcGRvd24nKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2RhdGUnPT10eXBlKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL2RhdGUnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2NoZWNrYm94Jz09dHlwZSlcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9jaGVja2JveCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZigncmljaHRleHQnPT10eXBlKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL3JpY2h0ZXh0JykpKHdYbWwsZG9jLHBhcmVudClcblx0fVxufVxuIl19