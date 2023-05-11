const btn_kirim = document.getElementById("kirim");
const input = document.querySelector("input");
const div_display = document.querySelector(".container-message");

const socket = io();
socket.on("connect", () => console.log("Connected to server"));

const createBubbleChat = chat => {
    const message = document.createElement("div");
    div_message.classList.add("pesan");
    div_message.innerHTML = chat;
    return div_message;
};

btn_kirim.addEventListener("click", () => {
    const bubbleChat = createBubbleChat(input.value);
    div_display.appendChild(bubbleChat);
    socket.emit("kirim-message", input.value);
    input.value = '';
});

socket.on("pesan-baru", message => {
   const bubbleChat = createBubbleChat(message); 
   bubbleChat.classList.add("message-r");
   div_display.appendChild(bubbleChat);
});
