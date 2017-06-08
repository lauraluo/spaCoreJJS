const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const merge = require('webpack-merge');
const globby = require('globby');


function getEntries (matches){
    var result = {};
    
    var files = globby.sync(matches);

    files.forEach(function(entry){
        var id = path.basename(entry,'.jsx');
        result[id] = entry; 
    });

    return result;
}



module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        stats: { modules: false },
        resolve: { 
            extensions: ['.js', '.jsx']},
        output: {
            filename: '[name].js',
            publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
            ]
        },
        plugins: [new CheckerPlugin()]
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig(), {
        entry: getEntries(['./src/*.jsx','!./src/*.server.jsx']),
        module: {
            rules: [
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
                { 
                    test: /\.jsx?$/, include: /src/, use: [
                        {
                            loader: "eslint-loader",
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                sourceMap: true,
                                presets: ['env', 'react'].concat(isDevBuild? ['react-hmre']: []),
                                plugins: ['transform-class-properties']
                            }
                    }]
                },
                { test: /\.scss$/, use: isDevBuild ? [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ] : ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader",
                })}
            ]
        },
        output: { 
            path: path.join(__dirname, clientBundleOutputDir)
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new ExtractTextPlugin('site.css'),
            new webpack.optimize.UglifyJsPlugin()
            
        ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig(), {
        resolve: { mainFields: ['main'] },
        entry: getEntries(['./src/*.server.jsx']),
        module: {
            rules: [
                { 
                    test: /\.jsx?$/, include: /src/, use: [{
                        loader: 'babel-loader',
                        options: {
                            sourceMap: false,
                            presets: ['env', 'react'],
                            plugins: ['transform-class-properties']
                        }
                    }]
                }
            ]
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./src/dist/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './src/dist')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};