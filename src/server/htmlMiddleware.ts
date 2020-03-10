import { Handler } from 'express'
import { Compiler } from 'webpack'

function clearCache() {
  delete require.cache[require.resolve('./renderHtml')]
  Object.keys(require.cache).forEach(id => {
    if (/[\/\\]common[\/\\]/.test(id)) delete require.cache[id]
  })
}

function htmlMiddleware(compiler: Compiler): Handler {
  return (req, res) => {
    res.send(require('./renderHtml').default())

    compiler.hooks.done.tap('htmlMiddleware', () => {
      clearCache()
      res.send(require('./renderHtml').default())
    })
  }
}

export default htmlMiddleware
