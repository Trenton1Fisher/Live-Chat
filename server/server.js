const app = require('express')();
const server = require('http').Server(app);
const { Server } = require('socket.io')
const cors = require('cors')
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})

const PORT = 8080;

app.use(cors());

io.on("connection", (socket) => {

  //Create room with unique room ID
  socket.on('create_room', function(roomId){
    socket.join(roomId)
   socket.emit('send_room_number', roomId) 
  })

  //Join room with given id from other user
  socket.on('connect_to_room', function(roomId) {
   socket.join(roomId)
    socket.emit('send_room_number',roomId)
  })

  //msgObj will hold display name and then the message
  socket.on('message_from_client', function(msgObj, roomId) {
    socket.to(roomId).emit('message_from_server', msgObj)
  })

  socket.on('disconnect', function() {
    console.log("User disconnected")
  })


});
server.listen(PORT, function() {
  console.log('Server is running on http://localhost:' + PORT)
})




