require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const formatMessage = require("./utils/formatMessage");
const UserRoute = require("./app/routes/Users");
const BranchRoute = require("./app/routes/Branch");
const HistoryRoute = require("./app/routes/History");
const SensorRoute = require("./app/routes/Sensor");
const AuthRoute = require("./app/routes/AuthRoutes");
const { userJoin } = require("./utils/users");

const app = express();

// bila dibutuhkan folder public untuk mengecek
app.use(express.static("public"));

app.use(cors());
app.use(express.json());

app.use(AuthRoute);
app.use(UserRoute);
app.use(BranchRoute);
app.use(HistoryRoute);
app.use(SensorRoute);

const server = app.listen(83, () => {
  console.log("Server on port 83");
});


const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("New WS Connection...");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});