const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
//自动生成html的插件
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: './dist/src/index.js',
  output: {
    path: resolve("dist"),
    filename: 'main.js',
    publicPath: './'
  },
  target: 'electron-renderer',
  module: {
    rules: [
      //css-loader
      {
        test: /\.css$/,
        //css-loader只负责加载
        //style-loader负责将样式添加到dom中
        //使用loader时，是从右向左读取
        use: ['style-loader', 'css-loader']
      },
      //less-loader
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file-loader?publicPath=/bulma/dist/font/&outputPath=font/'
      },
      // // font-awesome
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2)\w*/,
      //   loader: 'url-loader?limit=1000000'
      // },
      // font-awesome
      //url-loader file-loader
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            //当加载的图片，小于limit时，会将图片编译成base64字符串形式
            //当加载的图片，大于limit时，需要使用file-loader模块进行加载
            limit: 12040,
            name: 'img/[name].[hash:8].[ext]'
          },

        }]
      },
      //babel-loader 将es6转化为es5
      {
        test: /\.js$/,
        //exclude 排除
        //include 包含
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  },
  //插件的配置
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html'
    }),
  ],
}