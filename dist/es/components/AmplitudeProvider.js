"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _validation = require("../lib/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AmplitudeProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AmplitudeProvider, _React$Component);

  function AmplitudeProvider() {
    _classCallCheck(this, AmplitudeProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(AmplitudeProvider).apply(this, arguments));
  }

  _createClass(AmplitudeProvider, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var props = this.props;

      if ((0, _validation.isValidAmplitudeInstance)(props.amplitudeInstance)) {
        if (props.apiKey) {
          if (props.deviceId) {
            props.amplitudeInstance.init(props.apiKey, null, {
              deviceId: props.deviceId
            });
          } else {
            props.amplitudeInstance.init(props.apiKey);
          }
        }

        if (props.userId) {
          props.amplitudeInstance.setUserId(props.userId);
        }
      } else {
        console.error('AmplitudeProvider was not provided with a valid "amplitudeInstance" prop.');
      }
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      var context = this.context,
          props = this.props;
      return {
        getAmplitudeInstance: function getAmplitudeInstance() {
          var instanceName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '$default_instance';

          if (props.amplitudeInstance._instanceName === instanceName) {
            return props.amplitudeInstance;
          } else if (context.getAmplitudeInstance) {
            return context.getAmplitudeInstance(instanceName);
          } else {
            return null;
          }
        },
        getAmplitudeEventProperties: function getAmplitudeEventProperties() {
          return props.eventProperties || {};
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      return props.children;
    }
  }]);

  return AmplitudeProvider;
}(_react["default"].Component);

AmplitudeProvider.propTypes = {
  amplitudeInstance: _propTypes["default"].object.isRequired,
  apiKey: _propTypes["default"].string,
  userId: _propTypes["default"].string,
  deviceId: _propTypes["default"].string
};
AmplitudeProvider.contextTypes = {
  getAmplitudeInstance: _propTypes["default"].func
};
AmplitudeProvider.childContextTypes = {
  getAmplitudeInstance: _propTypes["default"].func,
  getAmplitudeEventProperties: _propTypes["default"].func
};
var _default = AmplitudeProvider;
exports["default"] = _default;