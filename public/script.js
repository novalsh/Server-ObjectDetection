const btn_kirim = document.getElementById("kirim");
const input = document.querySelector("input");
const div_display = document.querySelector(".container-pesan");

const socket = io();
socket.on("connect", () => console.log("Connected to server"));

const createBubbleChat = chat => {
    const div_pesan = document.createElement("div");
    div_pesan.classList.add("pesan");
    div_pesan.innerHTML = chat;
    return div_pesan;
};

btn_kirim.addEventListener("click", () => {
    const bubbleChat = createBubbleChat(input.value);
    div_display.appendChild(bubbleChat);
    socket.emit("kirim-pesan", input.value);
    input.value = '';
});

socket.on("pesan-baru", pesan => {
   const bubbleChat = createBubbleChat(pesan); 
   bubbleChat.classList.add("pesan-r");
   div_display.appendChild(bubbleChat);
});
