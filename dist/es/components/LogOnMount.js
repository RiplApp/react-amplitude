"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Amplitude = _interopRequireDefault(require("./Amplitude"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LogOnMount =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LogOnMount, _React$Component);

  function LogOnMount() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LogOnMount);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LogOnMount)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_amplitudeRef", null);

    _defineProperty(_assertThisInitialized(_this), "setRef", function (ref) {
      _this._amplitudeRef = ref;
    });

    return _this;
  }

  _createClass(LogOnMount, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var props = this.props;

      if (this._amplitudeRef) {
        this._amplitudeRef.logEvent(props.eventType);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      return _react["default"].createElement(_Amplitude["default"], {
        ref: this.setRef,
        instanceName: props.instanceName,
        eventProperties: props.eventProperties
      }, props.children);
    }
  }]);

  return LogOnMount;
}(_react["default"].Component);

LogOnMount.propTypes = {
  eventProperties: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
  eventType: _propTypes["default"].string.isRequired,
  instanceName: _propTypes["default"].string
};
var _default = LogOnMount;
exports["default"] = _default;