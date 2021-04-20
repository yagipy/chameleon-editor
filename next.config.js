const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')
const path = require('path')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    config.plugins.push(
      new WasmPackPlugin({
        crateDirectory: path.join(__dirname, 'markdown-parser/pkg'),
        withTypeScript: true,
      }),
    )
    return config
  },
  webpackDevMiddleware: (config) => {
    return config
  },
}
