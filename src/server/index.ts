import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import htmlMiddleware from './htmlMiddleware'

const app = express()

const __DEV__ = process.env.NODE_ENV !== 'production'

if (__DEV__) {
  const config = require('../../webpack.dev.js')
  const compiler = webpack(config)

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: 'errors-warnings',
    })
  )
  app.use(webpackHotMiddleware(compiler))
  app.use(htmlMiddleware(compiler))
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}\n`)
})
