"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OfficeDocument = exports.Document = exports.Part = exports.drawml = exports.xlsx = exports.pptx = exports.docx = undefined;

var _document = require("./openxml/docx/document");

var _document2 = _interopRequireDefault(_document);

var _document3 = require("./openxml/pptx/document");

var _document4 = _interopRequireDefault(_document3);

var _document5 = require("./openxml/xlsx/document");

var _document6 = _interopRequireDefault(_document5);

var _drawml = require("./openxml/drawml");

var _drawml2 = _interopRequireDefault(_drawml);

var _document7 = require("./openxml/document");

var _document8 = _interopRequireDefault(_document7);

var _part = require("./openxml/part");

var _part2 = _interopRequireDefault(_part);

var _officeDocument = require("./openxml/officeDocument");

var _officeDocument2 = _interopRequireDefault(_officeDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _document2.default;
exports.docx = _document2.default;
exports.pptx = _document4.default;
exports.xlsx = _document6.default;
exports.drawml = _drawml2.default;
exports.Part = _part2.default;
exports.Document = _document8.default;
exports.OfficeDocument = _officeDocument2.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N4IiwicHB0eCIsInhsc3giLCJkcmF3bWwiLCJQYXJ0IiwiRG9jdW1lbnQiLCJPZmZpY2VEb2N1bWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWVBLGtCO1FBR1hBLEksR0FBQUEsa0I7UUFBS0MsSSxHQUFBQSxrQjtRQUFLQyxJLEdBQUFBLGtCO1FBQUtDLE0sR0FBQUEsZ0I7UUFDZkMsSSxHQUFBQSxjO1FBQU1DLFEsR0FBQUEsa0I7UUFBVUMsYyxHQUFBQSx3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4IGZyb20gXCIuL29wZW54bWwvZG9jeC9kb2N1bWVudFwiXHJcbmltcG9ydCBwcHR4IGZyb20gXCIuL29wZW54bWwvcHB0eC9kb2N1bWVudFwiXHJcbmltcG9ydCB4bHN4IGZyb20gXCIuL29wZW54bWwveGxzeC9kb2N1bWVudFwiXHJcbmltcG9ydCBkcmF3bWwgZnJvbSBcIi4vb3BlbnhtbC9kcmF3bWxcIlxyXG5cclxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL29wZW54bWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgUGFydCBmcm9tIFwiLi9vcGVueG1sL3BhcnRcIlxyXG5pbXBvcnQgT2ZmaWNlRG9jdW1lbnQgZnJvbSBcIi4vb3BlbnhtbC9vZmZpY2VEb2N1bWVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkb2N4XHJcblxyXG5leHBvcnQge1xyXG4gICAgZG9jeCxwcHR4LHhsc3gsZHJhd21sLFxyXG4gICAgUGFydCwgRG9jdW1lbnQsIE9mZmljZURvY3VtZW50XHJcbn1cclxuIl19