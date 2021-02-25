const PORT = 3003;
const path = require("path");
const express = require("express");
const app = express();
const sokectIO = require("socket.io");

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => console.log("sever"));
const io = sokectIO(server);

io.on("connection", (socket) => {
  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
  });
  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
