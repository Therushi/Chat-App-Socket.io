const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//First We directly send h1 tag of html but we cant send full app here
// app.get("/", (req, res) => {
//   res.send("<h1>Hello World</h1>");
// });

//so we create a html file and pass that html file in these
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// we initialise new instance of (socket.io) by passing the server in line no 6
// then we listed on connection event for incoming socket and log to the console
io.on("connection", (socket) => {
  console.log("a user is connected");
  socket.on("disconnect", () => {
    console.log("user is disconnect");
  });
});

io.on("connection", (socket) => {
  // "chat message is event " that is similar to front end
  socket.on("chat message", (msg) => {
    console.log("message " + msg); // here we console log the message
    // but we have to emit these message to every connection
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listning on *:3000");
});
