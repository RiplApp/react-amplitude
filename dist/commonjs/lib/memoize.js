"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoize = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NestedMap =
/*#__PURE__*/
function () {
  function NestedMap(value) {
    _classCallCheck(this, NestedMap);

    this.children = new Map();
    this.value = value;
    this.referenceCount = 0;
  }

  _createClass(NestedMap, [{
    key: "set",
    value: function set(keys, value) {
      if (Array.isArray(keys)) {
        if (keys.length === 1) {
          return this.children.set(keys[0], new NestedMap(value));
        } else {
          var child = this.children.get(keys[0]);

          if (!child) {
            child = new NestedMap();
            this.children.set(keys[0], child);
          }

          child.set(keys.slice(1), value);
        }
      } else {
        return this.children.set(keys, value);
      }
    }
  }, {
    key: "get",
    value: function get(keys) {
      if (Array.isArray(keys)) {
        if (keys.length === 0) {
          this.referenceCount += 1;
          return this.value;
        } else {
          var child = this.children.get(keys[0]);

          if (child) {
            return child.get(keys.slice(1));
          } else {
            return undefined;
          }
        }
      } else {
        return this.children.get(keys);
      }
    }
  }, {
    key: "has",
    value: function has(keys) {
      if (Array.isArray(keys)) {
        if (keys.length === 0) {
          return true;
        } else {
          var child = this.children.get(keys[0]);

          if (child) {
            return child.has(keys.slice(1));
          } else {
            return false;
          }
        }
      } else {
        return this.children.has(keys);
      }
    }
  }, {
    key: "delete",
    value: function _delete(keys) {
      if (Array.isArray(keys)) {
        if (keys.length === 0) {
          return true;
        } else {
          var child = this.children.get(keys[0]);

          if (child) {
            var shouldDeleteChild = child["delete"](keys.slice(1));

            if (shouldDeleteChild) {
              this.children["delete"](keys[0]);
            }

            if (this.children.size === 0) {
              return true;
            }
          } else {
            return false;
          }
        }
      } else {
        return this.children["delete"](keys);
      }
    }
  }, {
    key: "traverse",
    value: function traverse(visitor) {
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (this.children.size === 0) {
        visitor(this, keys);
      } else {
        this.children.forEach(function (value, key) {
          value.traverse(visitor, [].concat(_toConsumableArray(keys), [key]));
        });
      }
    }
  }, {
    key: "garbageCollect",
    value: function garbageCollect() {
      var _this = this;

      this.traverse(function (node, keys) {
        if (node.referenceCount === 0 && node.children.size === 0) {
          _this["delete"](keys);
        } else {
          node.referenceCount = 0;
        }
      });
    }
  }]);

  return NestedMap;
}();

var memoize = function memoize(func) {
  var cache = new NestedMap();

  var memoizedFunc = function memoizedFunc() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    if (!cache.has(params)) {
      var boundedFunction = func.apply(void 0, params);
      cache.set(params, boundedFunction);
    }

    return cache.get(params);
  };

  memoizedFunc.cache = cache;
  return memoizedFunc;
};

exports.memoize = memoize;