Klass.js
-----
An expressive JavaScript Class provider designed to provide a classical interface to prototypal inheritance.

    var Person = klass(function (name) {
      this.name = name;
    })
      .statics({
        head: ':)',
        feet: '_|_'
      })
      .methods({
        walk: function () {}
      });

    var SuperHuman = extend(Person, klass(function (name) {
      // super class is automagically called
    }))
      .methods({
        walk: function() {
          this.supr();
          this.fly();
        },

        fly: function() {}

      });

    new SuperHuman('Zelda').walk()

Klass is [Common JS](http://commonjs.org) compliant provides the [Modules 1.1](http://wiki.commonjs.org/wiki/Modules/1.1) interface to allow two flavors of development. See the implementations below:

browser environment

    <script src="path/to/klass.js"></script>
    <script type="text/javascript">
      // exposes 'klass' and 'extend'
      var Foo = klass(fn);
      var Bar = extend(Foo, klass(fn))
    </script>

as a module

    var oo = require('path/to/klass'),
        klass = oo.klass,
        extend = oo.extend;
