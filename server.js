const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config.js')

const app = express()
const compiler = webpack(config)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: 'error',
  })
)

app.use(webpackHotMiddleware(compiler))

const template = `
<!doctype html>
<html>
  <head>
    <title>React Boilerplate</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>`

app.get('/', (req, res) => res.send(template))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}\n`)
})
