const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (client) => {
  client.on("event", (data) => {
    io.emit("data", data);
  });
  console.log("A new user has connected", client.id);
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("");
});

server.listen(3000, () => {
  console.log("server started at port 3000");
});
