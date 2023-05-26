require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const formatMessage = require("./utils/formatMessage");
const UserRoute = require("./app/routes/Users");
const BranchRoute = require("./app/routes/Branch");
const HistoryRoute = require("./app/routes/History");
const SensorRoute = require("./app/routes/Sensor");
// const AuthRoute = require("./app/routes/Auth");
const { userJoin } = require("./utils/users");

const app = express();
const server = require("http").Server(app);
const io = new Server(server);

module.exports = io;

// bila dibutuhkan folder public untuk mengecek
app.use(express.static("public"));

app.use(cors());
app.use(express.json());

app.use(require("./app/routes/Auth"));
app.use(UserRoute);
app.use(BranchRoute);
app.use(HistoryRoute);
app.use(SensorRoute);

io.on("connection", socket => {

  //join  with name and branch_id
  socket.on("joinBranch", ({ username, branch_id }) => {
    const user = userJoin(socket.id, username, branch_id);

    console.log(user);

    socket.join(user.branch_id);

    socket.on("kirim-pesan", pesan => {
      console.log(pesan)
      socket.broadcast.to(user.branch_id).emit("pesan-baru", pesan)
      // disini
    });

    io.to(user.branch_id).emit(
      "pesan",
      "Selamat Datang di " + user.branch_id
    );

    socket.broadcast
      .to(user.branch_id)
      .emit(
        "pesan",
        formatMessage("ChatBot Admin", `${user.username} has joined the chat`)
      );

    // Runs when client disconnects
    socket.on("disconnect", () => {
      io.emit(
        "pesan",
        formatMessage("ChatBot Admin", `${user.username} has left the chat`)
      );
    });
  });

  socket.emit("pesan", formatMessage("ChatBot Admin", "Welcome to ChatCord"));
});

server.listen(3000, () => {
  console.log("Server on port 3000");
});
