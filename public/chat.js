const socket = io();

let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("btn");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    message: message.value,
    username: username.value,
  });
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username.value);
});

socket.on("chat:message", (data) => {
  actions.innerHTML = " ";
  username.value = "";
  message.value = "";
  output.innerHTML += `<p>
  <strong>${data.username}</strong> : ${data.message}
  
  </p>`;
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<p>${data} is writting</p>`;
});
