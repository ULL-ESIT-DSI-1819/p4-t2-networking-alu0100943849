var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', function(done) {
    console.log("Gulp");
    done();
});

gulp.task("pre-install", shell.task([
	"npm i -g gulp static-server",
	"npm install -g gulp-shell"
]));

gulp.task("node", shell.task("node networking/test-json-service.js"));
gulp.task("nc", shell.task("nc localhost 60300"));
gulp.task("node", shell.task("node networking/net-watcher-ldj-client.js"));


