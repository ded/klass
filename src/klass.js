!function(context){
  var fnTest = /xyz/.test(function(){xyz;}) ? /\bsupr\b/ : /.*/, noop = function(){};

  function klass(o) {
    return extend.call(typeof o == 'function' ? o : noop, o);
  }

  function process(what, o, supr){
    for (var k in o) {
      if (o.hasOwnProperty(k)) {
        what[k] = typeof o[k] == "function"
          && typeof supr.prototype[k] == "function"
          && fnTest.test(o[k])
          ? wrap(k, o[k], supr) : o[k];
      }
    }
  }

  function wrap(k, fn, supr) {
    return function () {
      var tmp = this.supr;
      this.supr = supr.prototype[k];
      var ret = fn.apply(this, arguments);
      this.supr = tmp;
      return ret;
    };
  }

  function extend(o) {

    var supr = this,
        prototype = new noop(),
        isFunction = typeof o == 'function',
        _constructor = isFunction ? o : this,
        _methods = isFunction ? {} : o,
        fn = function () {
          supr.apply(this, arguments);
          _constructor.apply(this, arguments);
        };

    fn.methods = function (o) {
      process(prototype, o, supr);
      fn.prototype = prototype;
      return this;
    };

    fn.methods.call(fn, _methods).constructor = this;
    fn.extend = arguments.callee;
    fn.prototype.implement = fn.statics = function (o) {
      process(this, o, supr);
      return this;
    };
    return fn;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = klass;
  } else {
    context.klass = klass;
  }

}(this);