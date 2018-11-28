const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'start' || !TARGET) {
    module.exports = require('./build/webpack.dev.conf');
}

if (TARGET === 'build') {
    module.exports = require('./build/webpack.prod.conf');
}
