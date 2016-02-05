var gulp = require('gulp');

var path = require('path');
var del = require('del');
var globby = require('globby');
var lazypipe = require('lazypipe');

var plugins = require('./plugins');
var utils = require('./utils');
var config = require('./config');

var bowerJson = require('../bower.json');


// App:Clean:Scripts

function cleanScripts() {
    var moduleFile = bowerJson.moduleName + '.js';
    var files = [path.join(config.build, moduleFile)];

    return del(files, {force: true});
}

// App:Clean:Styles

function cleanStyles() {
    var moduleFile = bowerJson.moduleName + '.css';
    var files = [path.join(config.build, moduleFile)];

    return del(files, {force: true});
}

// App:Build:Scripts

function lazyTemplateTask(templateName) {
    var pipe = lazypipe()
        .pipe(plugins.htmlmin, {collapseWhitespace: true})
        .pipe(plugins.ngTemplates, {
            path: function (file) {
                return path.relative(config.app, file);
            },
            module: templateName
        });

    return pipe();
}

function lazyNgTask(destFile) {
    var cacheName = 'app.build.scripts.' + destFile;

    var pipe = lazypipe()
        .pipe(plugins.sourcemaps.init)
        .pipe(plugins.cached, cacheName)
        .pipe(plugins.remember, cacheName)
        .pipe(plugins.concat, destFile)
        .pipe(function () {
            return plugins.if(config.isProduction, plugins.uglify());
        })
        .pipe(plugins.sourcemaps.write);

    return pipe();
}

function scriptsTask(moduleName, tplFiles, scriptFiles, destDir) {
    var templateName = moduleName + '.tpls';
    var destFile = moduleName + '.js';

    return gulp.src(tplFiles)
        .pipe(lazyTemplateTask(templateName))
        .pipe(plugins.addSrc(scriptFiles))
        .pipe(lazyNgTask(destFile))
        .pipe(gulp.dest(destDir));
}

function scriptsPerAppTask() {
    var tplsFiles = path.join(config.app, '**/*.html');
    var jsFiles = [path.join(config.app, '**/*Config.js'), path.join(config.app, '**/*.js')];

    return scriptsTask(bowerJson.moduleName, tplsFiles, jsFiles, config.build);
}

gulp.task('app:build:scripts', function () {
    var app = utils.streamToPromise(scriptsPerAppTask());

    return cleanScripts().then(app);
});

// App:Build:Styles

function lazyLessTask(destFile) {
    var cacheName = 'app.build.styles.' + destFile;

    var pipe = lazypipe()
        .pipe(plugins.cached, cacheName)
        .pipe(plugins.sourcemaps.init)
        .pipe(plugins.concat, destFile)
        .pipe(plugins.remember, cacheName)
        .pipe(function () {
            return plugins.if(config.isProduction, plugins.minifyCss());
        })
        .pipe(plugins.sourcemaps.write);

    return pipe();
}

function stylesTask(moduleName, styleFiles, destDir) {
    var destFile = moduleName + '.css';

    return gulp.src(styleFiles)
        .pipe(lazyLessTask(destFile))
        .pipe(gulp.dest(destDir));
}

function stylesPerAppTask() {
    var styleFiles = path.join(config.app, '**/*.css');

    return stylesTask(bowerJson.moduleName, styleFiles, config.build);
}

gulp.task('app:build:styles', function () {
    var app = utils.streamToPromise(stylesPerAppTask());

    return cleanStyles().then(app);
});
