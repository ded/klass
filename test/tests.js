if (typeof module !== 'undefined' && module.exports) {
  var sink = require('../build/sink'),
      start = sink.start,
      sink = sink.sink;
  var klass = require('../klass');
}

sink('Klass', function (test, ok, before, after) {

  var base;
  before(function () {
    base = klass(function (n) {
      this.n = n;
    });
  });

  test('should create a base class', 1, function () {
    ok((new base(5).n == 5), 'created base class');
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
    base.methods({
      get: function () {
        return this.n;
      }
    });
    ok((new base('hello').get() == 'hello'), 'created get() method');
  });

  test('should inherit from superclass when creating subclass', 1, function () {
    var sub = base.extend();
    ok((new sub('boosh').n == 'boosh'), 'inherits property from base');
  });

  test('should call super methods from sub methods', 5, function () {
    var methodTimes = 0;
    var constructTimes = 0;
    base
      .methods({
        bah: function () {
          ok(++methodTimes == 1, 'called base method first');
        }
      });

    var sub1 = base.extend(function() {
      ok(++constructTimes == 1, 'called sub1 constructor first');
    })
      .methods({
        bah: function() {
          this.supr();
          ok(++methodTimes == 2, 'called sub1 method second');
        }
      });

    var sub2 = sub1.extend(function () {
      ok(++constructTimes == 2, 'called sub2 constructor second');
    })
      .methods({
        bah: function () {
          this.supr();
          ok(++methodTimes == 3, 'called sub2 method third');
        }
      });
    (new sub2()).bah();
  });

  test('should implement a wrapper method for mixins', 5, function () {
    var thingCalled = 0;
    base.methods({
      thing: function () {;
        ok(true, 'base thing() gets called');
      }
    });

    var sub = base.extend({
        thing: function () {
          this.supr();
          ok((++thingCalled == 1), 'calls middleware only once');
        }
      });

    var inst = new sub('hello');

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


});
start();