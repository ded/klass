Klass.js
--------
An expressive, cross platform JavaScript Class provider with a slick, classical interface to prototypal inheritance.

Interface
---------
creating a Class...

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

Subclassing...

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

Implementing...
(because sometimes you want to overwrite OR mixin an instance method)

    var Alien = extend(SuperHuman, klass(function (name) {
      beem: function() {
        this.supr();
        // beem into space
      }
    }));

    if (beamIsDown) {
      implement(Alien, {
        beam: function() {
          this.supr();
          // fallback to jets
          this.jets();
        }
      });
    }

Environments
------------
Klass is [Common JS](http://commonjs.org) compliant and provides the [Modules 1.1](http://wiki.commonjs.org/wiki/Modules/1.1) interface to allow two flavors of development. See the implementations below:

browser environment

    <script src="path/to/klass.js"></script>
    <script type="text/javascript">
      // exposes 'klass' and 'extend'
      var Foo = klass(fn);
      var Bar = extend(Foo, klass(fn));
      implement(Bar, { ... });
    </script>

as a module

    var oo = require('path/to/klass'),
        klass = oo.klass,
        extend = oo.extend,
        implement = oo.implement;

Running the tests
-----------------
If you want to see shiny passing tests, run the _tests_ make command

    % make tests

Install the Package!
--------------------
By far the easiest way to get started with klass is to simply install the package and hit the ground running!

    % npm install klass

    # in your Node application
    # var oo = require('klass')

Contributors
------------
  * [Dustin Diaz](https://github.com/polvero)
  * [Jacob Thornton](https://github.com/jacobthornton)