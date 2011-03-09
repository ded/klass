Klass.js
-----
An expressive JavaScript Class provider designed to provide a classical interface to prototypal inheritance.

    var oo = require('./klass.js'),
        klass = oo.klass,
        extend = oo.extend;

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