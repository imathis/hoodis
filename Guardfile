# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'coffeescript', :input => 'coffeescripts', :output => 'javascripts'

guard :coffeescript do
  watch(%r{^coffeescripts/(.+\.coffee)$})
end

guard :compass do
  watch(%r{^sass/(.*)\.s[ac]ss$})
end
