const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]

if (!port) {
  console.log('请指定端口好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true)
  const path = request.url
  const query = ''

  if (path.indexOf('?') >= 0) {
    query = path.substring(path.indexOf('?'))
  }

  const pathNoQuery = parsedUrl.pathname
  const queryObject = parsedUrl.query
  const method = request.method

  console.log('HTTP 路径为 \n' + path)

  if (path == '/style.css') {
    response.setHeader('Content-type', 'text/css; charset=utf-8')
    response.write('body {background: black; color: white}')
    response.end()
  } else if (path == '/main.js') {
    response.setHeader('Content-type', 'text/javascript; charset=utf-8')
    response.write('alert("A Ha")')
    response.end()
  } else if (path == '/') {
    response.setHeader('Content-type', 'text/html; charset=utf-8')
    response.write(
      '<!Doctype html>' +
      '<head>' +
      '<link rel="stylesheet" href="/style.css">' +
      '</head>' +
      '<body>' +
      '<h1>Hello Nodejs</h1>' +
      '<script src="/main.js"></script>' +
      '</body>'
    )
    response.end()
  } else {
    response.statusCode = 404
    response.end()
  }
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
