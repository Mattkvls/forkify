const path=require('path'); //imports the path package 
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    entry: ['babel-polyfill','./src/js/index.js'],

    
    output:{
        path:path.resolve(__dirname, 'dist'), 
        filename:'js/bundle.js'
    },
    devServer:{
        contentBase:'./dist' //which folder will serve
    },
    plugins:[//to use the plugin we wnat to copy the index.html and add the script tag every time we bundling
        new HtmlWebpackPlugin({
            filename: 'index.html',// we pass options with an object 
            template: './src/index.html', //the source file 
        })
    ],
    //use babel
    module:{
        rules:[
            {
                //for each of the loaders we need 
                test: /\.js$/,//regular expression tests for files that end at .js
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader' //then apply the babel-loader
                }
            }
        ]//all the loaders we need for each loader an object 
    }
};
