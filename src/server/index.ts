import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import htmlMiddleware from './htmlMiddleware'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  const config = require('../../webpack.dev.js')
  const compiler = webpack(config)
  const { publicPath } = config

  app.use(webpackDevMiddleware(compiler, { publicPath, logLevel: 'warn' }))
  app.use(webpackHotMiddleware(compiler))
  app.use(htmlMiddleware(compiler))
}

function start(port: number) {
  return app.listen(port)
}

export default start
