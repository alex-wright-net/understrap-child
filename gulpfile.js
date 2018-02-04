// Defining base pathes
var basePaths = {
    js: './js/',
    node: './node_modules/',
    dev: './src/'
};

// browser-sync watched files
// automatically reloads the page when files changed
var browserSyncWatchFiles = [
    './css/*.min.css',
    './js/*.min.js',
    './*.php'
];
// browser-sync options
// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
    proxy: "https://local-project.com", // change to your local development url
    notify: false
};

// Defining requirements
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge2 = require('merge2');
var imagemin = require('gulp-imagemin');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var clone = require('gulp-clone');
var merge = require('gulp-merge');
var browserSync = require('browser-sync').create();
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var gulpSequence = require('gulp-sequence');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var penthouse = require("penthouse");
var fs = require('fs');
var urlList = require('./criticalcss-pagelist.json')

function swallowError(self, error) {
    console.log(error.toString())

    self.emit('end')
}

// Run:
// gulp sass + cssnano + rename
// Prepare the min.css for production (with 2 pipes to be sure that "style.css" == "style.min.css")
gulp.task('scss-for-prod', function() {
    var source =  gulp.src('./sass/*.scss')
        .pipe(plumber({ errorHandler: function (error) { swallowError(this, error); } }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass());

    var pipe1 = source.pipe(clone())
        .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
        .pipe(gulp.dest('./css'))
        .pipe(rename('custom-editor-style.css'))
        .pipe(gulp.dest('./css'));

    var pipe2 = source.pipe(clone())
        .pipe(plumber({ errorHandler: function (error) { swallowError(this, error); } }))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'));

    return merge(pipe1, pipe2);
});


// Run:
// gulp sourcemaps + sass + reload(browserSync)
// Prepare the style.css for the development environment
gulp.task('scss-for-dev', function() {
    gulp.src('./sass/*.scss')
        .pipe(plumber({ errorHandler: function (error) { swallowError(this, error); } }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass())
        .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
        .pipe(gulp.dest('./css'))
});

gulp.task('watch-scss', ['browser-sync'], function () {
    gulp.watch('./sass/**/*.scss', ['scss-for-dev']);
});

// Run:
// gulp sass
// Compiles SCSS files in CSS
gulp.task('sass', function () {
    var stream = gulp.src('./sass/*.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
        .pipe(gulp.dest('./css'))
        .pipe(rename('custom-editor-style.css'))
    return stream;
});

// Run:
// gulp watch
// Starts watcher. Watcher runs gulp sass task on changes
gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['styles']);
    gulp.watch([basePaths.dev + 'js/**/*.js','js/**/*.js','!js/app.js','!js/app.min.js'], ['scripts']);

    //Inside the watch task.
    gulp.watch('./img/**', ['imagemin'])
});

// Run:
// gulp imagemin
// Running image optimizing task
gulp.task('imagemin', function(){
    gulp.src('img/src/**')
    .pipe(imagemin())
    .pipe(gulp.dest('img'))
});

// Run:
// gulp nanocss
// Minifies CSS files
gulp.task('cssnano', ['cleancss'], function(){
  return gulp.src('./css/*.css')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(plumber({ errorHandler: function (error) { swallowError(self, error); } }))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('minify-css', function() {
  return gulp.src('./css/style.css')
  .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
    .pipe(rename({suffix: '.min'}))
     .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('cleancss', function() {
  return gulp.src('./css/*.min.css', { read: false }) // much faster
    .pipe(ignore('style.css'))
    .pipe(rimraf());
});

gulp.task('styles', function(callback){ gulpSequence('sass', 'minify-css')(callback) });

// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});

// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task('watch-bs', ['browser-sync', 'watch', 'scripts'], function () { });

// Run:
// gulp scripts.
// Uglifies and concat all JS files into one
gulp.task('scripts', function() {
    var scripts = [

        // Start - All BS4 stuff
        basePaths.dev + 'js/bootstrap4/bootstrap.js',
        // End - All BS4 stuff

        // Start - Custom scripts
        basePaths.dev + '../custom-scripts/include/*.js',
        // End - Custom scripts

        basePaths.dev + 'js/skip-link-focus-fix.js'
    ];
  gulp.src(scripts)
    .pipe(concat('app.min.js'))
    .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
    .pipe(gulp.dest('./js/'));

  gulp.src(scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./js/'));
});

// Deleting any file inside the /src folder
gulp.task('clean-source', function () {
  return del(['src/**/*',]);
});



// Run:
// gulp criticalcss
// Generates CriticalCSS for above-the-fold content - look to criticalcss-pagelist.json for list of input pages and output files
gulp.task('criticalcss',function(){
  urlList.urls.forEach(function(item,i){
    penthouse({
        url: item.link,       // can also use file:/// protocol for local files
        //cssString: 'body { color; red }', // the original css to extract critcial css from
        css: './css/style.min.css',      // path to original css file on disk
        // OPTIONAL params
        width: 1300,                    // viewport width
        height: 900,                    // viewport height
        keepLargerMediaQueries: false,  // when true, will not filter out larger media queries
        forceInclude: [ // selectors to keep
          '.keepMeEvenIfNotSeenInDom',
          /^\.regexWorksToo/
        ],
        propertiesToRemove: [
          '(.*)transition(.*)',
          'cursor',
          'pointer-events',
          '(-webkit-)?tap-highlight-color',
          '(.*)user-select'
        ],
        timeout: 30000,                 // ms; abort critical CSS generation after this timeout
        pageLoadSkipTimeout: 0,         // ms; stop waiting for page load after this timeout (for sites with broken page load event timings)
        maxEmbeddedBase64Length: 1000,  // characters; strip out inline base64 encoded resources larger than this
        userAgent: 'Penthouse Critical Path CSS Generator', // specify which user agent string when loading the page
        renderWaitTime: 100,            // ms; render wait timeout before CSS processing starts (default: 100)
        blockJSRequests: true,          // set to false to load (external) JS (default: true)
        customPageHeaders: {
          'Accept-Encoding': 'identity' // add if getting compression errors like 'Data corrupted'
        },
        strict: false,                  // set to true to throw on CSS errors
        screenshots: {
          // turned off by default
          // basePath: 'homepage', // absolute or relative; excluding file extension
          // type: 'jpeg', // jpeg or png, png default
          // quality: 20 // only applies for jpeg type
          // -> these settings will produce homepage-before.jpg and homepage-after.jpg
        },
        puppeteer: {
          getBrowser: undefined,        // A function that resolves with a puppeteer browser to use instead of launching a new browser session
        }
    })
    .then(criticalCss => {
        // use the critical css
        fs.writeFileSync('./'+item.name+'.php',"<?php ?><style>"+ criticalCss + "</style><?php ?> ");
    })
    .catch(err => {
        // handle the error
    })
  })
})


// Run:
// gulp copy-assets.
// Copy all needed dependency assets files from bower_component assets to themes /js, /scss and /fonts folder. Run this task after bower install or bower update


// Copy all Bootstrap JS files
gulp.task('copy-assets', function() {

////////////////// All Bootstrap 4 Assets /////////////////////////
// Copy all Bootstrap JS files
    gulp.src(basePaths.node + 'bootstrap/dist/js/**/*.js')
       .pipe(gulp.dest(basePaths.dev + '/js/bootstrap4'));

// Copy all Bootstrap SCSS files
    gulp.src(basePaths.node + 'bootstrap/scss/**/*.scss')
       .pipe(gulp.dest(basePaths.dev + '/sass/bootstrap4'));
////////////////// End Bootstrap 4 Assets /////////////////////////

// Copy all UnderStrap SCSS files
    gulp.src(basePaths.node + 'understrap/sass/**/*.scss')
       .pipe(gulp.dest(basePaths.dev + '/sass/understrap'));

// Copy all Font Awesome Fonts
    gulp.src(basePaths.node + 'font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest('./fonts'));

// Copy all Font Awesome SCSS files
    gulp.src(basePaths.node + 'font-awesome/scss/*.scss')
        .pipe(gulp.dest(basePaths.dev + '/sass/fontawesome'));

// _s SCSS files
    gulp.src(basePaths.node + 'undescores-for-npm/sass/**/*.scss')
        .pipe(gulp.dest(basePaths.dev + '/sass/underscores'));

// _s JS files into /src/js
    gulp.src(basePaths.node + 'undescores-for-npm/js/*.js')
        .pipe(gulp.dest(basePaths.dev + '/js'));

// _s JS files into /js
    gulp.src(basePaths.node + 'undescores-for-npm/js/*.js')
        .pipe(gulp.dest(basePaths.js));

// Copy Popper JS files
    gulp.src(basePaths.node + 'popper.js/dist/umd/popper.min.js')
        .pipe(gulp.dest(basePaths.js));

    gulp.src(basePaths.node + 'popper.js/dist/umd/popper.js')
        .pipe(gulp.dest(basePaths.js));
});

// Run
// gulp dist
// Copies the files to the /dist folder for distributon
gulp.task('dist', ['clean-dist'], function() {
    gulp.src(['**/*','!bower_components','!bower_components/**','!node_modules','!node_modules/**','!src','!src/**','!dist','!dist/**','!sass','!sass/**','!readme.txt','!readme.md','!package.json','!gulpfile.js','!CHANGELOG.md','!.travis.yml','!jshintignore', '!codesniffer.ruleset.xml', '*'])
    .pipe(gulp.dest('dist/'))
});

// Deleting any file inside the /dist folder
gulp.task('clean-dist', function () {
  return del(['dist/**/*',]);
});

// Run
// gulp dist-product
// Copies the files to the /dist folder for distributon
gulp.task('dist-product', ['clean-dist-product'], function() {
    gulp.src(['**/*','!bower_components','!bower_components/**','!node_modules','!node_modules/**','!dist','!dist/**', '*'])
    .pipe(gulp.dest('dist-product/'))
});

// Deleting any file inside the /dist-product folder
gulp.task('clean-dist-product', function () {
  return del(['dist-product/**/*',]);
});
