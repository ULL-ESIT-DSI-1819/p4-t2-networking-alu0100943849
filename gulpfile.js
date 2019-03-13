var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', function(done) {
    console.log("Gulpfile ejecutándose");
    done();
});

gulp.task("node", shell.task("node networking/test-json-service.js"));

gulp.task("nc", shell.task("nc localhost 60300"));

gulp.task("node", shell.task("node networking/net-watcher-ldj-client.js"));


