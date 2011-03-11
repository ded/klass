!function(context){
  var fnTest = /xyz/.test(function(){xyz;}) ? /\bsupr\b/ : /.*/, noop = function(){};

  function klass(o){
    var methods, _constructor = typeof o == 'function' ? (methods = {}, o) : (methods = o, noop);
    return extend.call(_constructor, o);
  };

  function extend(o) {

    var supr = this,
        _methods,
        _constructor = typeof o == 'function' ? (_methods = {}, o) : (_methods = o, this),
        fn = function fn() {
          supr.apply(this, arguments);
          _constructor.apply(this, arguments);
        };

    var prototype = new noop();

    fn.methods = function (prop) {
      for (var name in prop) {
        prototype[name] = typeof prop[name] == "function" &&
          typeof supr.prototype[name] == "function" && fnTest.test(prop[name]) ?
          (function(name, fn){
            return function() {
              this.supr = supr.prototype[name];
              return fn.apply(this, arguments);
            };
          })(name, prop[name]) :
          prop[name];
      }

      fn.prototype = prototype;
      return this;
    }

    fn.methods.call(fn, _methods).constructor = this;
    fn.extend = arguments.callee;
    fn.prototype.implement = fn.statics = function (o) {
      for (var k in o) {
        o.hasOwnProperty(k) && (this[k] = o[k]);
      }
      return this;
    }

    return fn;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = klass;
  } else {
    context.klass = klass;
  }

}(this);
