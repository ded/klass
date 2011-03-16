Klass.js
--------
An expressive, cross platform JavaScript Class provider with a slick, classical interface to prototypal inheritance.

Interface
---------
<h2>creating a Class...</h2>

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

<h2>Subclassing...</h2>

    var SuperHuman = Person.extend(function (name) {
      // super class is automagically called
    })
      .methods({
        walk: function() {
          this.supr();
          this.fly();
        },

        fly: function() {}

      });

    new SuperHuman('Zelda').walk()

<h2>Implementing...</h2>
(because sometimes you want to overwrite OR mixin an instance method)

    // note you can optionally pass an object literal to extend too ;)
    var Alien = SuperHuman.extend({
      beam: function() {
        this.supr();
        // beam into space
      }
    });

    if (beamIsDown) {
      Alien.implement({
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

<h2>browser environment</h2>

    <script src="path/to/klass.js"></script>
    <!-- klass() is exposed to context -->

    <script type="text/javascript">
      var Foo = klass(fn1);
      var Bar = Foo.extend(fn2);
      Bar.implement({ ... });
    </script>

<h2>as a module</h2>

    // your-application.js
    var klass = require('path/to/klass');

    var Foo = klass(...);

Running the tests
-----------------
If you want to see shiny passing tests, run the _tests_ make command

    % make tests

Install the Package!
--------------------
By far the easiest way to get started with klass is to simply install the package and hit the ground running!!

    % npm install klass

    // in your Node application
    var klass = require('klass')

Contributors
------------
  * [Dustin Diaz](https://github.com/polvero/klass/commits/master?author=polvero)
  * [Jacob Thornton](https://github.com/polvero/klass/commits/master?author=jacobthornton)
  * Follow our Software [@dedfat](http://twitter.com/dedfat)
