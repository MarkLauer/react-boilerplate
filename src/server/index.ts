import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  const config = require('../../webpack.dev.js')
  const compiler = webpack(config)
  const { publicPath } = config

  app.use(webpackDevMiddleware(compiler, { publicPath, logLevel: 'warn' }))
  app.use(webpackHotMiddleware(compiler))

  const clearCache = () => {
    delete require.cache[require.resolve('./renderHtml')]
    Object.keys(require.cache).forEach(id => {
      if (/[\/\\]common[\/\\]/.test(id)) delete require.cache[id]
    })
  }

  let html = require('./renderHtml').default()

  compiler.hooks.done.tap('htmlMiddleware', () => {
    clearCache()
    html = require('./renderHtml').default()
  })

  app.use((req, res) => res.send(html))
}

function start(port: number) {
  return app.listen(port)
}

export default start
