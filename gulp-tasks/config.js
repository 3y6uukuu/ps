var bowerJson = require('../bower.json');

var nodeEnv = process.env.NODE_ENV;
var isProduction = nodeEnv === 'production';

module.exports = {
    app: bowerJson.appPath,
    isProduction: isProduction,
    build: 'build',
    templates: [bowerJson.appPath + '/**/*.html', '!' + bowerJson.appPath + '/**/index.html']
};
