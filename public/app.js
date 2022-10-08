const socket = io();
const users = document.querySelector(".name");

const name = prompt("Ismingizni kiriting");

let h3 = document.createElement("h3")
h3.textContent = textContent = "You Joined";
users.appendChild(h3);

socket.emit("new-user", name);

socket.on("new-user-joined", (newUser) => {
  let h3 = document.createElement("h3")
  h3.textContent = `${newUser} joined`;
  users.appendChild(h3);
});


btn.addEventListener('click', () => {
    let p = document.createElement("p")
    p.textContent = textContent = `You: ${message.value}`;
    users.appendChild(p);
    socket.emit('new-message', {message: message.value})
})

socket.on('new-user-message', ({sender, message}) => {
    let p = document.createElement("p")
    p.textContent = textContent = `${sender}: ${message}`;
    users.appendChild(p);
    socket.emit('new-message', {message: message.value})
})

message.addEventListener('keyup', e => {
    socket.emit('user-typing', {sender: name})
})

let typing = document.createElement("p")

socket.on('typing', ({sender}) => {

    typing.textContent = `${sender} typing...`
    users.appendChild(typing);

    if(typing.textContent){
        setTimeout(() => {
            typing.textContent = ''
        }, 1300)
    }
})