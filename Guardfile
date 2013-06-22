require './stitcher'

stitcher = Stitcher.new

guard :shell do
  watch /^javascripts\/.+\.(js|coffee|mustache|eco|tmpl)/ do |change|
    stitcher.compile
  end
end

guard :compass do
  watch(%r{^stylesheets/(.*)\.s[ac]ss$})
end

