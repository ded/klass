.PHONY: boosh test
boosh:
	smoosh make make/build.json
test:
	node test/tests.js