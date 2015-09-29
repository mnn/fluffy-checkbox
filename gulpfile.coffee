gulp = require "gulp"
$ = require("gulp-load-plugins")({lazy: true})
run = require "run-sequence"
rimraf = require "rimraf"

genConfig = ->
  styleFiles = ["src/**/*.styl"]
  jsFiles = ["src/**/*.js"]
  templateFiles = ["src/**/*.template.html"]
  srcFiles = [].concat(styleFiles).concat(jsFiles).concat(templateFiles)

  styleFiles: styleFiles
  jsFiles: jsFiles
  templateFiles: templateFiles
  dstDir: "dist/"
  srcFiles: srcFiles
  watchables: srcFiles

config = genConfig()

gulp.task "default", ["all"]

createSuffixFiler = (suffix) -> $.filter ["**/*." + suffix], {restore: true}

createStylusFilter = -> createSuffixFiler("styl")
createCssFilter = -> createSuffixFiler("css")
createJsFilter = -> createSuffixFiler("js")
createTemplateFilter = -> createSuffixFiler("template.html")

gulp.task "all", (cb) ->
  run "build", "dist", -> cb()

createBuildPipe = ->
  stylusFilter = createStylusFilter()
  jsFilter = createJsFilter()
  templateFilter = createTemplateFilter()
  styleRenamingFunc = (path) ->
    path.basename = path.basename.replace(/\.style/, "")
    path

  gulp.src config.srcFiles

  .pipe stylusFilter
  .pipe $.stylus()
  .pipe stylusFilter.restore

  .pipe $.rename(styleRenamingFunc)

  .pipe templateFilter
  .pipe $.angularTemplatecache("templates.js", {module: "fluffyCheckbox"})
  .pipe templateFilter.restore

  .pipe jsFilter
  .pipe $.babel()
  .pipe $.concat("fluffyCheckbox.js")
  .pipe jsFilter.restore

gulp.task "build", ->
  log "Compiling"
  createBuildPipe()
  .pipe gulp.dest(config.dstDir)

gulp.task "dist", ->
  log "Compiling and minifying"
  cssFilter = createCssFilter()
  jsFilter = createJsFilter()

  createBuildPipe()
  .pipe $.rename({suffix: ".min"})

  .pipe cssFilter
  .pipe $.minifyCss()
  .pipe cssFilter.restore

  .pipe jsFilter
  .pipe $.ngAnnotate()
  .pipe $.uglify()
  .pipe jsFilter.restore

  .pipe gulp.dest(config.dstDir)

gulp.task "clean", (cb) ->
  clean config.dstDir, cb

gulp.task "watch", ->
  log "Watching for changes to trigger build task 'all'"
  gulp.watch config.watchables, ["all"]


# utility functions

clean = (path, done) ->
  log "Cleaning: " + $.util.colors.blue(path)
  rimraf path, done

log = (msg) ->
  if typeof msg == "object"
    for item of msg
      if msg.hasOwnProperty item
        $.util.log $.util.colors.blue(msg[item])
  else
    $.util.log $.util.colors.blue(msg)

