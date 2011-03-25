var fs = require('fs'),
    ugly = require('../build/uglify');

var file = fs.readFileSync('./src/klass.js', 'utf-8');
var header = fs.readFileSync('./src/copyright.js', 'utf-8');

var ast = ugly.parser.parse(file);
ast = ugly.uglify.ast_mangle(ast);
ast = ugly.uglify.ast_squeeze(ast);

var min = ugly.uglify.gen_code(ast);

fs.writeFileSync('./klass.min.js', [header, min].join(''), 'utf-8');
fs.writeFileSync('./klass.js', [header, file].join(''), 'utf-8');
