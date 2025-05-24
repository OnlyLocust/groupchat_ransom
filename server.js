import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  let users = []

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    // console.log('⚡ Client connected:', socket.id)

    socket.on('join' , (name) => {
        io.emit('welcome', name)
        users.push(name)
        io.emit('all', users)
    })

    socket.on('send' , ({name,msg}) => {
      io.emit('recv', {name,msg})
    })

    socket.on('leave' , (name) => {
      io.emit('leaving',name)
      users = users.filter((val) => val != name)
      io.emit('all', users)
    })

  })

  console.log(`🚀 Server listening at http://localhost:${port} (${dev ? 'development' : 'production'})`)
})
