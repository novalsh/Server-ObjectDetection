//DOM ELEMENTS
const btn_kirim = document.getElementById("kirim");
const input = document.querySelector("input");
const div_display = document.querySelector(".container-pesan");

//DOM LOGIN
const sensorStatus = document.getElementById('sensor-status');
const overlayLogin = document.getElementById("overlay-login");
const popupLogin = document.getElementById("popup-login");
const popupUsernameInputLogin = document.getElementById("popup-username-login");
const popupBranchInputLogin = document.getElementById("popup-branch-login");
const popupBtnLogin = document.getElementById("popup-btn-login");

const socket = io();
socket.on("connect", () => console.log("Connected to server"));

const { username, branch_id } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

login();
updateSensorStatus(false);

function login() {
  console.log(username, branch_id)
    if (username && branch_id) {
      overlayLogin.style.display = "none";
      popupLogin.style.display = "none";
      personLogin.textContent = `${username} - ${branch_id}`;
    } else {
      overlayLogin.style.display = "block";
      popupLogin.style.display = "block";
    }
  }

  function updateSensorStatus(status) {
    if (status) {
        sensorStatus.textContent = 'OFF';
        sensorStatus.style.color = 'red';
        // Show pop-up
        overlay.style.display = 'block';
        popup.style.display = 'block';
    } else {
        sensorStatus.textContent = 'OFF';
        sensorStatus.style.color = 'green';
        // Hide pop-up
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }
}

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


socket.emit("joinBranch", { username, branch_id });
