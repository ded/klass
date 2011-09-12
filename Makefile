.PHONY: boosh test
boosh:
	node make/build.js
test:
	node test/tests.js