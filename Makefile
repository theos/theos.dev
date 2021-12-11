JEKYLL = bundler exec jekyll

all:
	bundler install
	npm install
	npm install --prefix netlify/functions
	$(JEKYLL) build

serve:
	$(JEKYLL) serve

.PHONY: all serve
