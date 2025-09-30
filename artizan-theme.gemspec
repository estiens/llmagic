# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "low-level-magic-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["LOW LEVEL MAGIC"]
  spec.email         = ["contact@lowlevelmagic.dev"]

  spec.summary       = "A grunge/punk Jekyll theme for creative consulting websites"
  spec.description   = "LOW LEVEL MAGIC is a Jekyll theme that combines grunge/punk aesthetics with professional presentation, perfect for creative consulting websites focusing on LLM character and game design."
  spec.homepage      = "https://github.com/lowlevelmagic/lowlevelmagic-jekyll-theme"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.3"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.12"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.3"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.6"

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 12.0"
end
