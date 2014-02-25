## Klass
An expressive, cross platform JavaScript Class provider with a classical interface to prototypal inheritance.

## API
### creating a Class

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

### Subclassing

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

### Object Literal Interface

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

### Implement

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

## Environments
Klass is [Common JS](http://commonjs.org) compliant and provides the [Modules 1.1](http://wiki.commonjs.org/wiki/Modules/1.1) interface to allow two flavors of development. See the implementations below:

### Browser

``` html
<script src="path/to/klass.js"></script>
<!-- klass() is exposed to context -->
```

### As a node module

``` sh
npm install klass
```

``` js
var klass = require('klass')
```

### Ender compatibility
add `klass` to your [ender](http://enderjs.com) compilation

``` sh
ender add klass
```

### Developers

``` sh
npm install
make
make test
```

Keep your edits localized to `src/klass.js`

## LICENSE
    MIT

### Happy Klassing!
