"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidAmplitudeInstance = void 0;

var isValidAmplitudeInstance = function isValidAmplitudeInstance(maybeInstance) {
  return Boolean(maybeInstance) && typeof maybeInstance.init === 'function' && typeof maybeInstance.logEvent === 'function';
};

exports.isValidAmplitudeInstance = isValidAmplitudeInstance;