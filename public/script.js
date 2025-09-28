const socket = io();
const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const allMessages = document.getElementById("chat-box");

const user = prompt("Enter username");
addMyMessage("You joined the chat!");

socket.emit("new-user", user);
socket.on("user-joined", (user) => {
  addMessage(`${user} has joined the chat!`);
});

socket.on("message", (data) => {
  addMessage(`${data.user}: ${data.message}`);
});

sendBtn.addEventListener("click", (e) => {
  const message = messageInput.value;
  console.log(message);
  addMyMessage(`You: ${message}`);
  socket.emit("send-msg", message);
  messageInput.value = "";
});

function addMessage(data) {
  const p = document.createElement("p");
  p.id = "received";
  p.innerText = data;
  allMessages.appendChild(p);
}

function addMyMessage(data) {
  const p = document.createElement("p");
  p.id = "sent";
  p.innerText = data;
  allMessages.appendChild(p);
}
