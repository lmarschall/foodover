const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'development',
    chainWebpack(config) {
        config.plugins.delete('prefetch');
        
        // and this line 
        config.plugin('CompressionPlugin').use(CompressionPlugin);
    }
};