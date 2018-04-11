// Defining requirements
var gulp = require( 'gulp' );
var plumber = require( 'gulp-plumber' );
var sass = require( 'gulp-sass' );
var watch = require( 'gulp-watch' );
var cssnano = require( 'gulp-cssnano' );
var rename = require( 'gulp-rename' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var merge2 = require( 'merge2' );
var imagemin = require( 'gulp-imagemin' );
var ignore = require( 'gulp-ignore' );
var rimraf = require( 'gulp-rimraf' );
var clone = require( 'gulp-clone' );
var merge = require( 'gulp-merge' );
var sourcemaps = require( 'gulp-sourcemaps' );
var browserSync = require( 'browser-sync' ).create();
var del = require( 'del' );
var cleanCSS = require( 'gulp-clean-css' );
var gulpSequence = require( 'gulp-sequence' );
var replace = require( 'gulp-replace' );
var autoprefixer = require( 'gulp-autoprefixer' );
var penthouse = require( 'penthouse' );
var fs = require( 'fs' );
var urlList = require( './criticalcss-pagelist.json' )

// Configuration file to keep your code DRY
var cfg = require( './gulpconfig.json' );
var paths = cfg.paths;

// Run:
// gulp sass + cssnano + rename
// Prepare the min.css for production (with 2 pipes to be sure that "theme.css" == "theme.min.css")
gulp.task( 'scss-for-prod', function() {
	var source =  gulp.src( paths.sass + '/*.scss' )
		.pipe( plumber({
			errorHandler: function( err ) {
				console.log( err );
				this.emit( 'end' );
			}
		}) )
		.pipe( sourcemaps.init({ loadMaps: true }) )
		.pipe( sass() );

	var pipe1 = source.pipe( clone() )
		.pipe( sourcemaps.write( undefined, { sourceRoot: null } ) )
		.pipe( gulp.dest( paths.css ) )
		.pipe( rename( 'custom-editor-style.css' ) );

	var pipe2 = source.pipe( clone() )
		.pipe( minifycss() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( gulp.dest( paths.css ) );
	return merge( pipe1, pipe2 );
});

// Run:
// gulp sourcemaps + sass + reload(browserSync)
// Prepare the style.css for the development environment
gulp.task( 'scss-for-dev', function() {
	gulp.src( paths.sass + '/*.scss' )
		.pipe( plumber( {
			errorHandler: function( err ) {
				console.log( err );
				this.emit( 'end' );
			}
		} ) )
		.pipe( sourcemaps.init({ loadMaps: true }) )
		.pipe( sass() )
		.pipe( sourcemaps.write( undefined, { sourceRoot: null } ) )
		.pipe( gulp.dest( paths.css ) );
});

gulp.task( 'watch-scss', ['browser-sync'], function() {
	gulp.watch( paths.sass + '/**/*.scss', ['scss-for-dev'] );
});

// Run:
// gulp sass
// Compiles SCSS files in CSS
gulp.task( 'sass', function() {
	var stream = gulp.src( paths.sass + '/*.scss' )
		.pipe( plumber( {
			errorHandler: function( err ) {
				console.log( err );
				this.emit( 'end' );
			}
		} ) )
		.pipe( sourcemaps.init({loadMaps: true } ) )
		.pipe( sass( { errLogToConsole: true } ) )
		.pipe( autoprefixer( 'last 2 versions' ) )
		.pipe( sourcemaps.write( undefined, { sourceRoot: null } ) )
		.pipe( gulp.dest( paths.css ) )
		.pipe( rename( 'custom-editor-style.css' ) );
	return stream;
});

// Run:
// gulp watch
// Starts watcher. Watcher runs gulp sass task on changes
gulp.task( 'watch', function() {
	gulp.watch( paths.sass + '/**/*.scss', ['styles'] );
	gulp.watch( [paths.dev + '/js/**/*.js', 'js/**/*.js', '!js/app.js', '!js/app.min.js'], ['scripts'] );
	gulp.watch( paths.custom_js + '/include/*.js', ['scripts'] );


	//Inside the watch task.
	gulp.watch( paths.imgsrc + '/**', ['imagemin-watch'] );
});

// Run:
// gulp imagemin
// Running image optimizing task
gulp.task( 'imagemin', function() {
	gulp.src( paths.imgsrc + '/**' )
	.pipe( imagemin() )
	.pipe( gulp.dest( paths.img ) );
});

// Run:
// gulp cssnano
// Minifies CSS files
gulp.task( 'cssnano', function() {
  return gulp.src( paths.css + '/style.css' )
	.pipe( sourcemaps.init( { loadMaps: true } ) )
	.pipe( plumber( {
			errorHandler: function( err ) {
				console.log( err );
				this.emit( 'end' );
			}
		} ) )
	.pipe( rename( { suffix: '.min' } ) )
	.pipe( cssnano( { discardComments: { removeAll: true } } ) )
	.pipe( sourcemaps.write( './' ) )
	.pipe( gulp.dest( paths.css ) );
});

gulp.task( 'minifycss', function() {
  return gulp.src( paths.css + '/style.css' )
  .pipe( sourcemaps.init( { loadMaps: true } ) )
	.pipe( cleanCSS( { compatibility: '*' } ) )
	.pipe( plumber( {
			errorHandler: function( err ) {
				console.log( err ) ;
				this.emit( 'end' );
			}
		} ) )
	.pipe( rename( { suffix: '.min' } ) )
	 .pipe( sourcemaps.write( './' ) )
	.pipe( gulp.dest( paths.css ) );
});

gulp.task( 'cleancss', function() {
  return gulp.src( paths.css + '/*.min.css', { read: false } ) // Much faster
	.pipe( ignore( 'style.css' ) )
	.pipe( rimraf() );
});

gulp.task( 'styles', function( callback ) {
	gulpSequence( 'sass', 'minifycss' )( callback );
} );

// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task( 'browser-sync', function() {
	browserSync.init( cfg.browserSyncWatchFiles, cfg.browserSyncOptions );
} );

// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task( 'watch-bs', ['browser-sync', 'watch', 'scripts'], function() { 
} );

// Run: 
// gulp scripts. 
// Uglifies and concat all JS files into one
gulp.task( 'scripts', function() {
	var scripts = [

		// Start - All BS4 stuff
		paths.dev + '/js/bootstrap4/bootstrap.js',
		// End - All BS4 stuff

		paths.dev + '/js/skip-link-focus-fix.js',

		// Start - Owl Carousel script, comment out if not using
		paths.dev + '/js/owl.carousel.js',
		// Start - Owl Carousel scripts

		// Start - Custom scripts
		paths.custom_js + '/include/*.js',
		// End - Custom scripts
	];
  gulp.src( scripts )
	.pipe( concat( 'app.min.js' ) )
	.pipe( uglify() )
	.pipe( gulp.dest( paths.js ) );

  gulp.src( scripts )
	.pipe( concat( 'app.js' ) )
	.pipe( gulp.dest( paths.js ) );
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

////////////////// All Bootstrap SASS  Assets /////////////////////////
gulp.task( 'copy-assets', function() {

////////////////// All Bootstrap 4 Assets /////////////////////////
// Copy all JS files
	var stream = gulp.src( paths.node + 'bootstrap/dist/js/**/*.js' )
		.pipe( gulp.dest( paths.dev + '/js/bootstrap4' ) );

// Copy all Bootstrap SCSS files
	gulp.src( paths.node + 'bootstrap/scss/**/*.scss' )
		.pipe( gulp.dest( paths.dev + '/sass/bootstrap4' ) );

////////////////// End Bootstrap 4 Assets /////////////////////////

// Copy all Font Awesome 5 Pro Fonts
	gulp.src( paths.node + '@fortawesome/fontawesome-pro-webfonts/webfonts/*.{ttf,woff,woff2,eof,svg}' )
		.pipe( gulp.dest('./fonts' ) );

// Copy all Font Awesome 5 Pro SCSS files
	gulp.src( paths.node + '@fortawesome/fontawesome-pro-webfonts/scss/*.scss' )
		.pipe( gulp.dest( paths.dev + '/sass/fontawesome' ) );

// Copy all Owl Carousel SCSS files
	gulp.src( paths.node + 'owl.carousel/src/scss/*.scss')
		.pipe( gulp.dest( paths.dev + '/sass/owl-carousel' ) );

// Copy all Owl Carousel JS
	gulp.src( paths.node + 'owl.carousel/dist/owl.carousel.js' )
		.pipe(gulp.dest( paths.dev + '/js' ) );


// _s SCSS files
	gulp.src( paths.node + 'undescores-for-npm/sass/media/*.scss' )
		.pipe( gulp.dest( paths.dev + '/sass/underscores' ) );

// _s JS files into /src/js
	gulp.src( paths.node + 'undescores-for-npm/js/skip-link-focus-fix.js' )
		.pipe( gulp.dest( paths.dev + '/js' ) );

// _s JS files into /js
	gulp.src( paths.node + 'undescores-for-npm/js/skip-link-focus-fix.js' )
		.pipe( gulp.dest( paths.js + paths.vendor ) );

// Copy Popper JS files
	gulp.src( paths.node + 'popper.js/dist/umd/popper.min.js' )
		.pipe( gulp.dest( paths.js + paths.vendor ) );
	gulp.src( paths.node + 'popper.js/dist/umd/popper.js' )
		.pipe( gulp.dest( paths.js + paths.vendor ) );

// UnderStrap SCSS files
	gulp.src( paths.node + 'understrap/sass/**/*.scss' )
		.pipe( gulp.dest( paths.dev + '/sass/understrap' ) );    

	return stream;
});

// Deleting the files distributed by the copy-assets task
gulp.task( 'clean-vendor-assets', function() {
  return del( [paths.dev + '/js/bootstrap4/**', paths.dev + '/sass/bootstrap4/**', './fonts/*wesome*.{ttf,woff,woff2,eot,svg}', paths.dev + '/sass/fontawesome/**', paths.dev + '/sass/underscores/**', paths.dev + '/js/skip-link-focus-fix.js', paths.js + '/**/skip-link-focus-fix.js', paths.js + '/**/popper.min.js', paths.js + '/**/popper.js', ( paths.vendor !== ''?( paths.js + paths.vendor + '/**' ):'' )] );
});

// Run
// gulp dist
// Copies the files to the /dist folder for distribution as simple theme
gulp.task( 'dist', ['clean-dist'], function() {
  return gulp.src( ['**/*', '!' + paths.bower, '!' + paths.bower + '/**', '!' + paths.node, '!' + paths.node + '/**', '!' + paths.dev, '!' + paths.dev + '/**', '!' + paths.dist, '!' + paths.dist + '/**', '!' + paths.distprod, '!' + paths.distprod + '/**', '!' + paths.sass, '!' + paths.sass + '/**', '!readme.txt', '!readme.md', '!package.json', '!package-lock.json', '!gulpfile.js', '!gulpconfig.json', '!CHANGELOG.md', '!.travis.yml', '!jshintignore',  '!codesniffer.ruleset.xml',  '*'], { 'buffer': false } )
  .pipe( replace( '/js/jquery.slim.min.js', '/js' + paths.vendor + '/jquery.slim.min.js', { 'skipBinary': true } ) )
  .pipe( replace( '/js/popper.min.js', '/js' + paths.vendor + '/popper.min.js', { 'skipBinary': true } ) )
  .pipe( replace( '/js/skip-link-focus-fix.js', '/js' + paths.vendor + '/skip-link-focus-fix.js', { 'skipBinary': true } ) )
	.pipe( gulp.dest( paths.dist ) );
});

// Deleting any file inside the /dist folder
gulp.task( 'clean-dist', function() {
  return del( [paths.dist + '/**'] );
});

// Run
// gulp dist-product
// Copies the files to the /dist-prod folder for distribution as theme with all assets
gulp.task( 'dist-product', ['clean-dist-product'], function() {
  return gulp.src( ['**/*', '!' + paths.bower, '!' + paths.bower + '/**', '!' + paths.node, '!' + paths.node + '/**', '!' + paths.dist, '!' + paths.dist +'/**', '!' + paths.distprod, '!' + paths.distprod + '/**', '*'] )
	.pipe( gulp.dest( paths.distprod ) );
} );

// Deleting any file inside the /dist-product folder
gulp.task( 'clean-dist-product', function() {
  return del( [paths.distprod + '/**'] );
} );