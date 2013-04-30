.PHONY: boosh test
boosh:
	./node_modules/smoosh/bin/smoosh make make/build.json
test:
	node test/tests.js