var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("../webpack.config").default;

var port = process.env.PORT || 8081;

const options = {
  contentBase: './build',
  hot: true,
  host: 'localhost',
  port: 8081
};

WebpackDevServer.addDevServerEntrypoints(config, options);

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
  },
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  port: port,
  publicPath: '/apps/',
}).listen(port, "localhost", (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at localhost:${port}...`);
});