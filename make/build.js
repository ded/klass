var fs = require('fs')
  , ugly = require('uglify-js')
  , file = fs.readFileSync('./src/klass.js', 'utf-8')
  , header = fs.readFileSync('./src/copyright.js', 'utf-8')
  , ast = ugly.parser.parse(file)
  , min

ast = ugly.uglify.ast_mangle(ast)
ast = ugly.uglify.ast_squeeze(ast)

min = ugly.uglify.gen_code(ast);

fs.writeFileSync('./klass.min.js', [header, min].join(''), 'utf-8')
fs.writeFileSync('./klass.js', [header, file].join(''), 'utf-8')
