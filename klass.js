/**
  * Klass.js - copyright @dedfat
  * version 1.0
  * https://github.com/ded/klass
  * Follow our software http://twitter.com/dedfat :)
  * MIT License
  */
!function (exports) {
  // Convenience aliases.
  var toString = {}.toString,

  // Capture the original value of the `klass` variable; used in `klass.noConflict`.
  original = exports.klass,

  // A cross-environment method for iterating over objects.
  forEach = (function () {
    // Convenience aliases.
    var hasOwnProperty = {}.hasOwnProperty, properties, property, length;

    // Provide a workaround for `Object#hasOwnProperty` for Safari 2.
    if (typeof hasOwnProperty != 'function') hasOwnProperty = function (property) {
      // Capture the original prototype chain.
      var original = this.__proto__, result;
      // Break the prototype chain.
      this.__proto__ = null;
      result = property in this;
      // Restore the prototype chain.
      this.__proto__ = original;
      return result;
    };

    // The `Properties` constructor is used to test for bugs in the current environment's
    // `for...in` algorithm. Credits: John-David Dalton.
    function Properties() {
      this.toString = 1;
    }
    Properties.prototype.toString = 1;

    // Create and iterate over a new instance of the `Properties` constructor.
    properties = new Properties;
    for (property in properties) {
      if (hasOwnProperty.call(properties, property)) length++;
    }

    switch (length) {
      // JScript ignores shadowed non-enumerable properties.
      case 0:
        // Provide a workaround for the JScript bug.
        properties = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
        return function (object, iterator, context) {
          var property, index;
          if (typeof object == 'object' && object != null) {
            for (property in object) {
              if (hasOwnProperty.call(object, property)) iterator.call(context, object[property], property);
            }
            // Provide a workaround for the JScript bug.
            index = -1;
            while ((property = properties[++index])) {
              if (hasOwnProperty.call(object, property)) iterator.call(context, object[property], property);
            }
          }
        };
      // Safari enumerates shadowed and inherited properties.
      case 1:
        return function (object, iterator, context) {
          var property, properties = {};
          if (typeof object == 'object' && object != null) {
            for (property in object) {
              // Memoize the iterated properties to prevent enumeration of shadowed
              // inherited properties.
              if (!hasOwnProperty.call(properties, property) && (properties[property] = 1) && hasOwnProperty.call(object, property)) iterator.call(context, object[property], property);
            }
          }
        };
      default:
        return function (object, iterator, context) {
          if (typeof object == 'object' && object != null) {
            for (var property in object) {
              if (hasOwnProperty.call(object, property)) iterator.call(context, object[property], property);
            }
          }
        };
    }
  })(),

  // Test if the current environment supports function decompilation.
  supercall = /xyz/.test(function () {
    xyz;
  }) ? /\bsupr\b/ : /.*/;

  // A helper function for creating prototype chains.
  function Subclass() {}

  // The `klass` function; creates a new class.
  function klass(options) {
    return extend.call(toString.call(options) == '[object Function]' ? options : Subclass, options, true);
  }

  // Wraps a subclass method to provide access to its superclass method.
  function wrap(property, method, superclass) {
    return function () {
      var original = this.supr;
      this.supr = superclass.prototype[property];
      var result = method.apply(this, arguments);
      this.supr = original;
      return result;
    };
  }

  // Extends a class with class methods, wrapping all subclass methods.
  function process(prototype, methods, superclass) {
    forEach(methods, function(method, property) {
      prototype[property] = toString.call(method) == '[object Function]' && toString.call(superclass.prototype[property]) == '[object Function]' && supercall.test(method) ? wrap(property, method, superclass) : method;
    });
  }

  // Creates a new base class or subclass.
  function extend(properties, isSubclass) {
    Subclass.prototype = this.prototype;
    var superclass = this, subclass = new Subclass, isFunction = toString.call(properties) == '[object Function]',
    constructor = isFunction ? properties : this, methods = isFunction ? {} : properties;

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

    return klass;
  }

  // Restores the original value of the `klass` variable.
  klass.noConflict = function() {
    exports.klass = original;
    return klass;
  };

  exports.klass = klass;
}(typeof exports == 'object' && exports || this);