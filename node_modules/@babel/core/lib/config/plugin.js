"use strict";

exports.__esModule = true;
exports.validatePluginObject = validatePluginObject;
exports.default = void 0;

var _optionAssertions = require("./option-assertions");

var VALIDATORS = {
  name: _optionAssertions.assertString,
  manipulateOptions: _optionAssertions.assertFunction,
  pre: _optionAssertions.assertFunction,
  post: _optionAssertions.assertFunction,
  inherits: _optionAssertions.assertFunction,
  visitor: assertVisitorMap,
  parserOverride: _optionAssertions.assertFunction,
  generatorOverride: _optionAssertions.assertFunction
};

function assertVisitorMap(key, value) {
  var obj = (0, _optionAssertions.assertObject)(key, value);

  if (obj) {
    Object.keys(obj).forEach(function (prop) {
      return assertVisitorHandler(prop, obj[prop]);
    });

    if (obj.enter || obj.exit) {
      throw new Error("." + key + " cannot contain catch-all \"enter\" or \"exit\" handlers. Please target individual nodes.");
    }
  }

  return obj;
}

function assertVisitorHandler(key, value) {
  if (value && typeof value === "object") {
    Object.keys(value).forEach(function (handler) {
      if (handler !== "enter" && handler !== "exit") {
        throw new Error(".visitor[\"" + key + "\"] may only have .enter and/or .exit handlers.");
      }
    });
  } else if (typeof value !== "function") {
    throw new Error(".visitor[\"" + key + "\"] must be a function");
  }

  return value;
}

function validatePluginObject(obj) {
  Object.keys(obj).forEach(function (key) {
    var validator = VALIDATORS[key];
    if (validator) validator(key, obj[key]);else throw new Error("." + key + " is not a valid Plugin property");
  });
  return obj;
}

var Plugin = function Plugin(plugin, options, key) {
  this.key = void 0;
  this.manipulateOptions = void 0;
  this.post = void 0;
  this.pre = void 0;
  this.visitor = void 0;
  this.parserOverride = void 0;
  this.generatorOverride = void 0;
  this.options = void 0;
  this.key = plugin.name || key;
  this.manipulateOptions = plugin.manipulateOptions;
  this.post = plugin.post;
  this.pre = plugin.pre;
  this.visitor = plugin.visitor || {};
  this.parserOverride = plugin.parserOverride;
  this.generatorOverride = plugin.generatorOverride;
  this.options = options;
};

exports.default = Plugin;