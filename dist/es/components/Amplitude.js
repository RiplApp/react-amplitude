"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _memoize = require("../lib/memoize");

var _validation = require("../lib/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Amplitude =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Amplitude, _React$Component);

  function Amplitude(_props) {
    var _this;

    _classCallCheck(this, Amplitude);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Amplitude).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "_makeLogEvent", function () {
      return function (eventType, eventProperties, callback) {
        var amplitudeInstance = _this.getAmplitudeInstance();

        if (amplitudeInstance) {
          amplitudeInstance.logEvent(eventType, _objectSpread({}, _this.getAmplitudeEventProperties(), {}, eventProperties || {}), callback);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "instrument", (0, _memoize.memoize)(function (eventType, func) {
      return function () {
        var retVal = func ? func.apply(void 0, arguments) : undefined;

        _this.logEvent(eventType);

        return retVal;
      };
    }));

    _defineProperty(_assertThisInitialized(_this), "getAmplitudeInstance", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          context = _assertThisInitialize.context,
          props = _assertThisInitialize.props;

      if (!context.getAmplitudeInstance) {
        return null;
      }

      var amplitudeInstance = context.getAmplitudeInstance(props.instanceName);

      if (!(0, _validation.isValidAmplitudeInstance)(amplitudeInstance)) {
        console.error('Failed to get a valid Amplitude instance. This likely means the "amplitudeInstance" prop your provided to the AmplitudeProvider component is not a valid Amplitude instance.');
        return null;
      }

      return amplitudeInstance;
    });

    _defineProperty(_assertThisInitialized(_this), "getAmplitudeEventProperties", function () {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          props = _assertThisInitialize2.props,
          context = _assertThisInitialize2.context;

      if (!context.getAmplitudeEventProperties) {
        return props.eventProperties;
      }

      var inheritedEventProperties = context.getAmplitudeEventProperties();

      if (typeof props.eventProperties === 'function') {
        return props.eventProperties(inheritedEventProperties);
      } else {
        return _objectSpread({}, inheritedEventProperties, {}, props.eventProperties);
      }
    });

    if (typeof _props.debounceInterval === 'number') {
      _this.logEvent = (0, _lodash["default"])(_this._makeLogEvent(), _props.debounceInterval);
    } else {
      _this.logEvent = _this._makeLogEvent();
    }

    _this._renderPropParams = {
      logEvent: _this.logEvent,
      instrument: _this.instrument
    };
    return _this;
  }

  _createClass(Amplitude, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;

      if (typeof nextProps.debounceInterval === 'number') {
        if (props.debounceInterval !== nextProps.debounceInterval) {
          this.logEvent = (0, _lodash["default"])(this._makeLogEvent(), nextProps.debounceInterval);
          this._renderPropParams = _objectSpread({}, this._renderPropParams, {
            logEvent: this.logEvent
          });
        }
      } else if (typeof props.debounceInterval === 'number') {
        this.logEvent = this._makeLogEvent();
        this._renderPropParams = _objectSpread({}, this._renderPropParams, {
          logEvent: this.logEvent
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var props = this.props;
      var amplitudeInstance = this.getAmplitudeInstance();

      if (amplitudeInstance && props.userProperties) {
        amplitudeInstance.setUserProperties(props.userProperties);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.instrument.cache.garbageCollect();
      var props = this.props;
      var amplitudeInstance = this.getAmplitudeInstance();

      if (amplitudeInstance && !(0, _shallowequal["default"])(prevProps.userProperties, props.userProperties)) {
        amplitudeInstance.setUserProperties(props.userProperties);
      }
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        getAmplitudeEventProperties: this.getAmplitudeEventProperties
      };
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;

      if (typeof props.children === 'function') {
        return props.children(this._renderPropParams);
      } else {
        return props.children || null;
      }
    }
  }]);

  return Amplitude;
}(_react["default"].Component);

Amplitude.propTypes = {
  children: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  eventProperties: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
  debounceInterval: _propTypes["default"].number,
  instanceName: _propTypes["default"].string,
  userProperties: _propTypes["default"].object
};
Amplitude.contextTypes = {
  getAmplitudeInstance: _propTypes["default"].func,
  getAmplitudeEventProperties: _propTypes["default"].func
};
Amplitude.childContextTypes = {
  getAmplitudeEventProperties: _propTypes["default"].func
};
var _default = Amplitude;
exports["default"] = _default;