!function (exports) {
  // Convenience aliases.
  var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,

  // Capture the original value of the `klass` variable; used in `klass.noConflict`.
  original = exports.klass,

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
    for (var property in methods) {
      if (hasOwnProperty.call(methods, property)) {
        var method = methods[property];
        prototype[property] = toString.call(method) == '[object Function]' && toString.call(superclass.prototype[property]) == '[object Function]' && supercall.test(method) ? wrap(property, method, superclass) : method;
      }
    }
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