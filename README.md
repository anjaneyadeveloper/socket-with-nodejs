socket IO with NodeJS example

Node Js Chat Socket IO Example This is a sampe application to demonstrate a sample chat system using NodeJs socket.io programming.

Socket.IO enables real-time bidirectional event-based communication. It consists of:

    * Node.js server (app.js this repository)
    * Javascript client library for the browser (socket.html is Socket.IO client)


Simple and convenient API

Sample code:

io.on('connection', socket => {
  socket.emit('request', /* … */); // emit an event to the socket
  io.emit('broadcast', /* … */); // emit an event to all connected sockets
  socket.on('reply', () => { /* … */ }); // listen to the event
});

Installation
clone 

npm install socket.io



Running the application

Assuming that node Js is already installed, traverse to the project location and execute the command - node app.js and hit the url (http://localhost:3042) to access the vhat application.