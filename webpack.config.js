const path=require('path'); //imports the path package 
module.exports={
    entry: './src/js/index.js',

    
    output:{
        path:path.resolve(__dirname, 'dist/js'), 
        filename:'bundle.js'
    },
    devServer:{
        contentBase:'./dist' //which folder will serve
    }
};
