source "https://rubygems.org"

gem "jekyll", "~> 4.0.0"

# Needed for macOS ARM
gem "nokogiri", ">= 1.15.6"

# Needed to unbreak jekyll-assets
gem "sprockets", ">= 3.7"

gem "kramdown-parser-gfm", ">= 1.1.0"

group :jekyll_plugins do
	# Need to use src as no new release has been published on rubygems
	gem "jekyll-assets", :git => 'https://github.com/envygeeks/jekyll-assets'
	gem "jekyll-feed"
	gem "jekyll-paginate"
	gem "jekyll-seo-tag"
	gem "jekyll-sitemap"
end
