const gulp = require('gulp');
const clean = require('gulp-clean'); 
const copy = require('gulp-copy'); 
const ts = require('gulp-typescript');
const debug = require("gulp-debug");
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');

const tsProject = ts.createProject('tsconfig.json');
let tsResult = null;

const bases = {
  dist: 'dist',
  src: 'src'
};

gulp.task('build', ['clean', 'copy'], () => {
  return getBuildProject(tsProject).js;
});

gulp.task('clean', () => {
  return gulp.src(bases.dist).pipe(clean());
});

gulp.task('copy', () => {
  return gulp
    .src([bases.src + '/mocks/**/*.*'])
    .pipe(gulp.dest(bases.dist + '/mocks'));
});

gulp.task('test', () => {
  return gulp.src( bases.dist + '/**/*.spec.js')
    .pipe(mocha({ reporter: 'progress' }));     
});

gulp.task('serve', ['watch'], () => {
  let started = false;

  return nodemon({ 
    script: bases.dist + '/index.js', 
    ext: 'js', 
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ], 
    tasks: [] 
  })
  .on('restart', () => {
    console.log('Node server restarted.')
  })
  .on('start', (cb) => {
		if (!started) {
			cb();
			started = true; 
      console.log('Server Started!');
		} 
	});
})

gulp.task('watch', ['build'], () => {
  gulp.watch('src/**/*.ts', ['build', 'test']);
});

gulp.task('default', [
  'serve',
  'test'
]);

function getBuildProject(tsProject) {
  return tsResult || (tsResult = tsProject.src()
    .pipe(tsProject(ts.reporter.longReporter()))
    .pipe(gulp.dest('dist')));
}