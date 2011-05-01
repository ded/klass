Klass
=====

`klass` is an expressive, cross-platform JavaScript class implementation with a slick, classical interface to prototypal inheritance.

## Downloads

You can download the latest version of `klass` from GitHub, or install it using the [Node Package Manager](http://npmjs.org):

    $ npm install -g klass

## Usage

### Creating a Class

    var Person = klass(function (name) {
      this.name = name;
    }).statics({
      head: ':)',
      feet: '_|_'
    }).methods({
      walk: function () {
        return this.name + ': Walking...';
      },
      run: function () {
        return this.name + ': Running...';
      }
    });
    
    var fat = new Person('Jacob');
    
    fat.name; // => Jacob
    fat.walk(); // => Jacob: Walking...
    fat.run(); // => Jacob: Running...

### Subclassing

    var SuperHuman = Person.extend(function (name) {
      // Superclass is automatically invoked...
    }).methods({
      walk: function () {
        // Note: `this.callSuper(arguments)` is equivalent to `arguments.callee.supr.call(this, ...)`.
        return this.callSuper(arguments).toUpperCase();
      },
      run: function () {
        // Note: `arguments.callee.supr.call(this, ...)` is equivalent to `this.callSuper(arguments)`.
        return arguments.callee.supr.call(this).toLowerCase();
      }
      fly: function () {
        return this.name.toUpperCase() + ': Flying...';
      }
    });
    
    var zelda = new SuperHuman('Zelda');
    
    zelda.name; // => Zelda
    zelda.walk(); // => ZELDA: WALKING...
    zelda.run(); // => zelda: running...
    zelda.fly(); // => ZELDA: Flying...

### Object Literals

In addition to providing a constructor function as the first argument to `klass`, you can also pass an object literal containing your class methods. If you specify an `initialize` method, it will be automatically called upon instantiation.

    var Foo = klass({
      foo: 0,
      initialize: function () {
        this.foo = 1;
      },
      getFoo: function () {
        return this.foo;
      },
      setFoo: function (value) {
        this.foo = value;
        return this.getFoo();
      }
    });
    
    var foo = new Foo;
    
    foo.foo;
    // => 1
    foo.getFoo();
    // => 1
    foo.setFoo(2);
    // => 2

### Implementing

You can use the `extend` and `implement` methods to override or mix-in instance methods.

    var Alien = SuperHuman.extend({
      beam: function () {
        // Beam into space...
      }
    });
    Alien.Beam = 'Up';
    // ...
    var spazoid = new Alien('Zoopo');
    // ...
    if (Alien.Beam == 'Down') {
      spazoid.implement({
        beam: function () {
          this.callSuper(arguments);
          // Beam is down; use jets...
        }
      });
    }

## Supported Environments

`klass` has been tested with the following web browsers, CommonJS environments, and JavaScript engines.

### Web Browsers

- Microsoft [Internet Explorer](http://www.microsoft.com/windows/internet-explorer) for Windows, version 5.5 and higher
- Mozilla [Firefox](http://www.mozilla.com/firefox), version 1.5 and higher
- Apple [Safari](http://www.apple.com/safari), version 2.0 and higher
- Google [Chrome](http://www.google.com/chrome), version 1.0 and higher
- [Opera](http://www.opera.com) 7.54 and higher
- [Mozilla](http://www.mozilla.org/projects/browsers.html) 1.7.2, [Netscape](http://browser.netscape.com/releases) 7.2, and [SeaMonkey](http://www.seamonkey-project.org/) 1.0 and higher
- [Konqueror](http://www.konqueror.org) 3.4.3 and higher

#### Example

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Example Class</title>
      </head>
      <body>
        <script src="/path/to/klass.js"></script>
        <script>
          var Foo = klass({
            // ...
          });
          var Bar = Foo.extend({
            // ...
          });
          Bar.implement({
            // ...
          });
        </script>
      </body>
    </html>

### CommonJS Environments

- [Node](http://nodejs.org/) 0.2.6 and higher
- [Narwhal](http://narwhaljs.org/) 0.3.2 and higher
- [RingoJS](http://ringojs.org/) 0.4 and higher

#### Example

    var klass = require('klass').klass;
    var Foo = klass({
      // ...
    });
    var Bar = Foo.extend({
      // ...
    });
    Bar.implement({
      // ...
    });

### JavaScript Engines

- Mozilla [SpiderMonkey](http://www.mozilla.org/js/spidermonkey), version 1.5.0 and higher
- Mozilla [Rhino](http://www.mozilla.org/rhino) 1.7R1 and higher
- WebKit [JSC](https://trac.webkit.org/wiki/JSC)
- Google [V8](http://code.google.com/p/v8)

#### Example

    load('/path/to/klass.js');
    var Foo = klass({
      // ...
    });
    var Bar = Foo.extend({
      // ...
    });
    Bar.implement({
      // ...
    });

## Contributing

Check out a working copy of the `klass` source code with [Git](http://git-scm.com/):

    $ git clone git://github.com/ded/klass.git

If you'd like to contribute a feature or bug fix, you can [fork](http://help.github.com/forking/) `klass`, commit your changes, and [send a pull request](http://help.github.com/pull-requests/). **Please make sure** to run `make tests` and `make build` before submitting your request.

Alternatively, you may use the [GitHub issue tracker](http://github.com/ded/klass/issues) to submit bug reports and feature requests. For the former, please make sure that you detail how to reproduce the bug, *including the environments that exhibit it*.

### Contributors

- [Dustin Diaz](https://github.com/ded/klass/commits/master?author=ded)
- [Jacob Thornton](https://github.com/ded/klass/commits/master?author=fat)

*Follow our software on Twitter: [@dedfat](http://twitter.com/dedfat)*.