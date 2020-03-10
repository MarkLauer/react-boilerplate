import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '../common/App'

function renderHtml() {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>React Boilerplate</title>
  </head>
  <body>
    <div id="root">${renderToString(<App />)}</div>
    <script src="bundle.js"></script>
  </body>
</html>  
  `
}

export default renderHtml
