const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (user) => {
    users[socket.id] = user;
    socket.broadcast.emit("user-joined", user);
  });

  socket.on("send-msg", (data) => {
    socket.broadcast.emit("message", { message: data, user: users[socket.id] });
  });
  console.log("A new user has connected", socket.id);
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("");
});

server.listen(3000, () => {
  console.log("server started at port 3000");
});
