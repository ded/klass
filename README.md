Klass
--------
An expressive, cross platform JavaScript Class provider with a classical interface to prototypal inheritance.

API
---------
<h3>creating a Class...</h3>

``` js
var Person = klass(function (name) {
  this.name = name
})
  .statics({
    head: ':)',
    feet: '_|_'
  })
  .methods({
    walk: function () {}
  })
```

<h3>Subclassing...</h3>

``` js
var SuperHuman = Person.extend(function (name) {
  // super class is automagically called
})
  .methods({
    walk: function() {
      this.supr()
      this.fly()
    },

    fly: function() {}

  })

new SuperHuman('Zelda').walk()
```

<h3>Object Literals...</h3>

``` js
var Foo = klass({
  foo: 0,
  initialize: function() {
    this.foo = 1
  },
  getFoo: function () {
    return this.foo
  },
  setFoo: function (x) {
    this.foo = x
    return this.getFoo()
  }
})
```

*note: initialize will be called on class invocation*

<h3>Implementing...</h3>

because sometimes you want to overwrite OR mixin an instance method

``` js
// note you can optionally pass an object literal to extend too ;)
var Alien = SuperHuman.extend({
  beam: function() {
    this.supr()
    // beam into space
  }
})

var Spazoid = new Alien('Zoopo')

if (beamIsDown) {
  Spazoid.implement({
    beam: function() {
      this.supr()
      // fallback to jets
      this.jets()
    }
  })
}
```

Environments
------------
Klass is [Common JS](http://commonjs.org) compliant and provides the [Modules 1.1](http://wiki.commonjs.org/wiki/Modules/1.1) interface to allow two flavors of development. See the implementations below:

<h3>browser environment</h3>

``` html
<script src="path/to/klass.js"></script>
<!-- klass() is exposed to context -->

<script type="text/javascript">
  var Foo = klass(fn1)
  var Bar = Foo.extend(fn2)
  Bar.implement({ ... })
</script>
``` html

<h3>as a module</h3>

``` js
// your-application.js
var klass = require('path/to/klass')

var Foo = klass(...)
```

Install the Package!
--------------------
By far the easiest way to get started with klass is to simply install the package and hit the ground running!!

    $ npm install klass

    // in your Node application
    var klass = require('klass')

Ender compatibility
-------------
add `klass` to your ender compilation

    $ ender add klass

Use it:

``` js
$.klass(...)
```

Developers
----------

    $ npm install --dev
    $ make
    $ make test

Keep your edits localized to `src/klass.js`

Contributors
------------
  * [Dustin Diaz](https://github.com/ded/klass/commits/master?author=ded)
  * [Jacob Thornton](https://github.com/ded/klass/commits/master?author=fat)
