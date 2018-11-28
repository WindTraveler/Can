const path = require('path');

module.exports = {
    isDev() {
        const TARGET = process.env.npm_lifecycle_event;

        if (TARGET === 'build') {
            return false;
        }

        return true;
    }
};