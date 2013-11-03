require 'rubygems'
require 'sass'
require 'bundler'
require 'pathname'
require 'logger'
require 'fileutils'

Bundler.require

ROOT        = Pathname(File.dirname(__FILE__))
LOGGER      = Logger.new(STDOUT)
BUNDLES     = %w( shroom.css shroom.js )
BUILD_DIR   = ROOT.join("build")
SOURCE_DIR  = ROOT.join("assets")

task :make do
  sprockets = Sprockets::Environment.new(ROOT) do |env|
    env.logger = LOGGER
  end

  sprockets.append_path(SOURCE_DIR.join('javascripts').to_s)
  sprockets.append_path(SOURCE_DIR.join('stylesheets').to_s)

  BUNDLES.each do |bundle|
    assets = sprockets.find_asset(bundle)
    prefix, basename = assets.pathname.to_s.split('/')[-2..-1]
    FileUtils.mkpath BUILD_DIR.join(prefix)

    basename = "#{File.basename(basename)}.css" if File.extname(basename) == '.scss'

    assets.write_to(BUILD_DIR.join(prefix, basename))
    #assets.to_a.each do |asset|
    #  # strip filename.css.foo.bar.css multiple extensions
    #  realname = asset.pathname.basename.to_s.split(".")[0..1].join(".")
    #  asset.write_to(BUILD_DIR.join(prefix, realname))
    #end
  end
end


task default: :make