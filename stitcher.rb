require 'digest/md5'
require 'stitch-rb'
require 'uglifier'
require 'coffee-script'
require 'colorator'

class Stitcher
  def js_dir
    File.join File.dirname(__FILE__), "javascripts"
  end

  def lib_core
    ['jquery.js', 'underscore.js', 'backbone.js']
  end

  def js_lib
    lib = lib_core.collect {|item| Dir.glob("#{js_dir}/lib/#{item}") }
    lib.concat(Dir.glob("#{js_dir}/lib/**/*")).flatten.uniq
  end

  def js_modules
    Dir.glob("#{js_dir}/modules/**/*")
  end

  def get_fingerprint
    Digest::MD5.hexdigest(js_modules.concat(js_lib).flatten.uniq.map! { |path| "#{File.mtime(path).to_i}" }.join + lib_core.join)
  end

  def fingerprinted(file, fingerprint)
    File.size?(file) && File.open(file) {|f| f.readline} =~ /#{fingerprint}/
  end
  
  def compile
    fingerprint = get_fingerprint
    
    file = "./assets/site.js"

    if fingerprinted(file, fingerprint)
      "identical ".green + file
    else
      write_msg = (File.exists?(file) ? "overwrite " : "   create ").green + file
    
      puts "compiling javascripts..."

      js = Stitch::Package.new(:dependencies => js_lib.flatten, :paths => ["javascripts/modules"]).compile
      #js = Uglifier.new.compile js
      js = "/* Build fingerprint: #{fingerprint} */\n" + js

      File.open(file, 'w') { |f| f.write js }

      write_msg
    end
  end
end
