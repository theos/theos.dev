JEKYLL = bundler exec jekyll

all:
	$(JEKYLL) build

serve:
	$(JEKYLL) serve

.PHONY: all serve
