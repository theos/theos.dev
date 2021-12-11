JEKYLL = bundler exec jekyll

all:
	bundler install
	npm install
	cd netlify/functions && npm install
	$(JEKYLL) build

serve:
	$(JEKYLL) serve

.PHONY: all serve
