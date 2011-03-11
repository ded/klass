if (typeof module !== 'undefined' && module.exports) {
  var sink = require('../build/sink'),
      start = sink.start,
      sink = sink.sink;
  var klass = require('../src/klass');
}

sink('klass', function (test, ok, before, after) {


  var Base;
  before(function () {
    Base = klass(function (n) {
      this.n = n;
    });
  });

  test('should create a Base class', 1, function () {
    ok((new Base(5).n == 5), 'created Base class');
  });

  test('should allow optional hash as constructor for methods', 1, function () {
    var objectKlass = klass({
      get: function () {
        return this.foo;
      },

      set: function (foo) {
        this.foo = foo;
        return this;
      }
    });
    ok((new objectKlass().set('booshr').get() == 'booshr'), 'booshr is found');
  });

  test('should create methods', 1, function () {
    Base.methods({
      get: function () {
        return this.n;
      }
    });
    ok((new Base('hello').get() == 'hello'), 'created get() method');
  });

  test('should inherit from superclass when creating Subclass', 1, function () {
    var Sub = Base.extend();
    ok((new Sub('boosh').n == 'boosh'), 'inherits property from Base');
  });

  test('should call super methods from Sub methods', 5, function () {
    var methodTimes = 0;
    var constructTimes = 0;
    Base
      .methods({
        bah: function () {
          ok(++methodTimes == 1, 'called Base method first');
        }
      });

    var Sub1 = Base.extend(function() {
      ok(++constructTimes == 1, 'called Sub1 constructor first');
    })
      .methods({
        bah: function() {
          this.supr();
          ok(++methodTimes == 2, 'called Sub1 method second');
        }
      });

    var Sub2 = Sub1.extend(function () {
      ok(++constructTimes == 2, 'called Sub2 constructor second');
    })
      .methods({
        bah: function () {
          this.supr();
          ok(++methodTimes == 3, 'called Sub2 method third');
        }
      });
    (new Sub2()).bah();
  });

  test('should implement a wrapper method for mixins', 5, function () {
    var thingCalled = 0;
    Base.methods({
      thing: function () {;
        ok(true, 'Base thing() gets called');
      }
    });

    var Sub = Base.extend({
        thing: function () {
          this.supr();
          ok((++thingCalled == 1), 'calls middleware only once');
        }
      });

    var inst = new Sub('hello');

    inst.thing();

    inst.implement({
      thing: function (n) {
        this.supr();
        ok(true, 'called implementer');
        this.booooshr();
      },
      booooshr: function () {
        ok(true, 'called booshr');
      }
    }).thing();

  });

  test('should be able to set statics', 1, function () {
    Base.statics({
      'dead': 'obese'
    });
    ok(Base.dead == 'obese', 'dead should be a static value of obese')
  });

  test('should be instances of their classes', 2, function () {
    var Sub = Base.extend(),
    b = new Base();
    s = new Sub();
    ok(s instanceof Sub, 's is instance of Sub');
    ok(b instanceof Base, 'b is instance of Base');
  });

});
start();