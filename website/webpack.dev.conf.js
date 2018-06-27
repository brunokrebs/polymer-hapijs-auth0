const webpack = require('webpack');

module.exports = {
    entry : './src/components/my-app.js',
    output : {
        filename : 'main.js',
    },
    mode : 'development',
    plugins : [
    	new webpack.DefinePlugin({
          "API_URL": '"'+'http://localhost:3000'+'"',
    	})
    ]
  };
