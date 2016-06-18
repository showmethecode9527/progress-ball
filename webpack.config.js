var path = require('path');
var webpack = require('webpack');

module.exports = {
  // entry: ['./view/teacher/jsx_webpack/teacherViewWebpack'],
  entry: {
    'entry': './demo/entry.jsx'
  },
  output: {
    // path: path.join(__dirname, 'dist'),
    path: path.join(__dirname, 'demo'),
    filename: '[name].js'
  },
  resolve: {
    // alias: {
    //   ProgressBall: 'components/build/public/ProgressBall/ProgressBall.js',
    //   RadioSlider: 'components/build/public/RadioSlider/RadioSlider.js'
    // },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    // noParse: ['/node_modules'],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      // 不解析node_modules中的js
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!postcss-loader!less-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      // loader: 'url-loader?mimetype=image/png'
      loader: 'url-loader?limit=8192'
    }]
  },
  // externals对象的key是给require时用的，比如require('react')
  // 对象的value表示的是如何在global（即window）中访问到该对象，这里是window.React
  // 同理jquery的话就可以这样写：'jquery': 'jQuery'，那么require('jquery')即可。
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react/addons': 'ReactAddons',
    'jquery': 'jQuery'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};