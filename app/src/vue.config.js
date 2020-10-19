const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
    chainWebpack(config) {
        config.plugins.delete('prefetch');
        
        // and this line 
        config.plugin('CompressionPlugin').use(CompressionPlugin);
    }
};