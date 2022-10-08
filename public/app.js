const socket = io();
const users = document.querySelector(".name");

const name = prompt("Ismingizni kiriting");
localStorage.setItem('name', JSON.stringify(name))


let h3 = document.createElement("h3")
h3.textContent = "You Joined";
users.appendChild(h3);

socket.emit("new-user", name);

socket.on("new-user-joined", (newUser) => {
  let h3 = document.createElement("h3")
  h3.textContent = `${newUser} joined`;
  users.appendChild(h3);
});


btn.addEventListener('click', () => {
    let p = document.createElement("p")
    p.textContent = `You: ${message.value}`;
    users.appendChild(p);
    socket.emit('new-message', {sender: name,    message: message.value})
})

socket.on('new-user-message', ({sender, message}) => {
    let p = document.createElement("p")
    p.textContent = `${sender}: ${message}`;
    users.appendChild(p);
})

message.addEventListener('keyup', () => {
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