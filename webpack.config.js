const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');
const dev = require('./webpack.config.dev');
const prod = require('./webpack.config.prod');

module.exports = env => {
    switch(env) {
        case 'dev':
            return merge(common, dev);
        case 'prod':
            return merge(common, prod);
        default:
            throw new Error('No matching configuration found!');
    }
}
