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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N4IiwicHB0eCIsInhsc3giLCJkcmF3bWwiLCJQYXJ0IiwiRG9jdW1lbnQiLCJPZmZpY2VEb2N1bWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7O1FBS0lBLEk7UUFBS0MsSTtRQUFLQyxJO1FBQUtDLE07UUFDZkMsSTtRQUFNQyxRO1FBQVVDLGMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeCBmcm9tIFwiLi9vcGVueG1sL2RvY3gvZG9jdW1lbnRcIlxyXG5pbXBvcnQgcHB0eCBmcm9tIFwiLi9vcGVueG1sL3BwdHgvZG9jdW1lbnRcIlxyXG5pbXBvcnQgeGxzeCBmcm9tIFwiLi9vcGVueG1sL3hsc3gvZG9jdW1lbnRcIlxyXG5pbXBvcnQgZHJhd21sIGZyb20gXCIuL29wZW54bWwvZHJhd21sXCJcclxuXHJcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9vcGVueG1sL2RvY3VtZW50XCJcclxuaW1wb3J0IFBhcnQgZnJvbSBcIi4vb3BlbnhtbC9wYXJ0XCJcclxuaW1wb3J0IE9mZmljZURvY3VtZW50IGZyb20gXCIuL29wZW54bWwvb2ZmaWNlRG9jdW1lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZG9jeFxyXG5cclxuZXhwb3J0IHtcclxuICAgIGRvY3gscHB0eCx4bHN4LGRyYXdtbCxcclxuICAgIFBhcnQsIERvY3VtZW50LCBPZmZpY2VEb2N1bWVudFxyXG59XHJcbiJdfQ==