const gulp = require('gulp');
const ts = require('gulp-typescript');
const debug = require("gulp-debug");
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');

const tsProject = ts.createProject('tsconfig.json');
let tsResult = null;

gulp.task('build', () => {
  return getBuildProject(tsProject).js;
});

gulp.task('test', function () {
  return gulp.src('dist/**/*.spec.js')
    .pipe(mocha({ reporter: 'progress' }));     
});

gulp.task('serve', function () {
  nodemon({ script: 'dist/index.js', ext: 'js', ignore: [], tasks: [] })
    .on('restart', function () {
      console.log('Node server restarted.')
    })
})

gulp.task('watch', ['build'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch', 'serve', 'test']);

function getBuildProject(tsProject) {
  return tsResult || (tsResult = tsProject.src()
    .pipe(tsProject(ts.reporter.longReporter()))
    .pipe(gulp.dest('dist')));
}