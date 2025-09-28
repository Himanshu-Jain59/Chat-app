const socket = io();
const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const allMessages = document.getElementById("chat-box");

socket.on("data", (data) => {
  const p = document.createElement("p");
  p.innerText = data;
  allMessages.appendChild(p);
});

sendBtn.addEventListener("click", (e) => {
  const message = messageInput.value;
  console.log(message);
  socket.emit("event", message);
  messageInput.value = "";
});
