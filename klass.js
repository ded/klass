/**
  * Klass.js - copyright @dedfat
  * version 1.0
  * https://github.com/ded/klass
  * Follow our software http://twitter.com/dedfat :)
  * MIT License
  */
!function (exports) {
  // Convenience aliases.
  var getClass = {}.toString, slice = [].slice,

  // Capture the original value of the `klass` variable; used in
  // `klass.noConflict`.
  original = exports.klass,

  // A cross-environment method for iterating over objects.
  forEach = (function () {
    // Provide a workaround for `Object#hasOwnProperty` for Safari 2.
    var hasOwnProperty = {}.hasOwnProperty || function (property) {
      // Capture the original prototype chain.
      var original = this.__proto__, result;
      // Break the prototype chain.
      this.__proto__ = null;
      result = property in this;
      // Restore the prototype chain.
      this.__proto__ = original;
      return result;
    }, properties, property, length;

    // Test for bugs in the `for...in` iteration algorithm.
    function Properties() {
      this.toString = 1;
    }
    Properties.prototype.toString = 1;
    // Iterate over a new instance of the `Properties` constructor.
    properties = new Properties;
    for (property in properties) {
      // Ignore inherited properties to correctly detect iteration bugs.
      if (hasOwnProperty.call(properties, property)) {
        length++;
      }
    }

    switch (length) {
      // JScript ignores shadowed non-enumerable properties.
      case 0:
        // Provide a workaround for the JScript bug.
        properties = ['constructor', 'hasOwnProperty', 'isPrototypeOf',
          'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
        return function (value, iterator, context) {
          var isFunction = getClass.call(value) == '[object Function]',
          length = properties.length, key;
          for (key in value) {
            // The `prototype` property of functions is handled inconsistently.
            if (!(isFunction && key == 'prototype') && hasOwnProperty.call(
            value, key) && iterator.call(context, value[key], key) === false) {
              break;
            }
          }
          // Provide a workaround for the JScript bug.
          while (length--) {
            key = properties[length];
            if (hasOwnProperty.call(value, key) && iterator.call(context,
            value[key], key) === false) {
              break;
            }
          }
        };
      // Safari enumerates shadowed and inherited properties.
      case 1:
        return function (value, iterator, context) {
          var isFunction = getClass.call(value) == '[object Function]',
          keys = {}, key;
          for (key in value) {
            // Cache each property to prevent double enumeration of properties.
            if (!(isFunction && key == 'prototype') && !hasOwnProperty.call(
            keys, key) && (keys[key] = 1) && hasOwnProperty.call(value, key) &&
            iterator.call(context, value[key], key) === false) {
              break;
            }
          }
        };
      default:
        return function (value, iterator, context) {
          var isFunction = getClass.call(value) == '[object Function]', key;
          for (key in value) {
            if (!(isFunction && key == 'prototype') && hasOwnProperty.call(value,
            key) && iterator.call(context, value[key], key) === false) {
              break;
            }
          }
        };
    }
  })();

  // A helper function for creating prototype chains.
  function Subclass() {}

  // The `klass` function; creates a new class.
  function klass(options) {
    return extend.call(getClass.call(options) == '[object Function]' ? options :
      Subclass, options, true);
  }

  // Extends a class with class methods.
  function process(prototype, methods, superclass) {
    forEach(methods, function(method, property) {
      var supr = superclass.prototype[property];
      // Subclass method; set its `supr` property to the corresponding superclass method.
      if (getClass.call(method) == '[object Function]' && supr &&
      getClass.call(supr) == '[object Function]') {
        method.supr = supr;
      }
      prototype[property] = method;
    });
  }

  // Creates a new base class or subclass.
  function extend(properties, isSubclass) {
    Subclass.prototype = this.prototype;
    var superclass = this, subclass = new Subclass,
    isFunction = getClass.call(properties) == '[object Function]',
    constructor = isFunction ? properties : this,
    methods = isFunction ? {} : properties;

    function klass() {
      if (this.initialize) {
        this.initialize.apply(this, arguments);
      } else {
        isSubclass || isFunction && superclass.apply(this, arguments);
        constructor.apply(this, arguments);
      }
    }

    klass.methods = function (methods) {
      process(subclass, methods, superclass);
      klass.prototype = subclass;
      return this;
    };

    klass.methods.call(klass, methods).prototype.constructor = klass;

    klass.extend = extend;
    klass.prototype.implement = klass.statics = function (properties, method) {
      if (typeof properties == 'string') {
        var object = {};
        object[properties] = method;
        properties = object;
      }
      process(this, properties, superclass);
      return this;
    };

    // A helper for invoking a superclass method. Credits: T.J. Crowder.
    klass.prototype.callSuper = function(method) {
      var supr, parameters;
      if (typeof method.callee == 'function') {
        // An `arguments` object was provided; extract the superclass method.
        parameters = method;
        method = method.callee;
      } else {
        parameters = arguments.length > 1 && slice.call(arguments, 1);
      }
      // Call the superclass method.
      supr = method.supr;
      return parameters ? supr.apply(this, parameters) : supr.call(this);
    };

    return klass;
  }

  // Restores the original value of the `klass` variable.
  klass.noConflict = function() {
    exports.klass = original;
    return klass;
  };

  exports.klass = klass;
}(typeof exports == 'object' && exports || this);