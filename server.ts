import path from 'path'
import { Server } from 'http'
import chokidar from 'chokidar'

const PORT = process.env.PORT || 3000
let server: Server = require('./src/server').default(PORT)
console.log(`Listening on http://localhost:${PORT}`)

if (process.env.NODE_ENV !== 'production') {
  const handleChange = () => {
    console.log('Restarting server...')
    Object.keys(require.cache).forEach(id => {
      if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id]
    })
    server.close()
    server = require('./src/server').default(PORT)
    console.log(`Listening on http://localhost:${PORT}`)
  }

  const watcher = chokidar.watch(path.resolve(__dirname, 'src/server'))

  watcher.on('ready', () => {
    watcher.on('add', path => {
      handleChange()
      watcher.add(path)
    })
    watcher.on('change', handleChange)
    watcher.on('unlink', path => {
      handleChange()
      watcher.unwatch(path)
    })
  })
}
