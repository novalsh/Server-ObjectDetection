require('dotenv').config();
const express = require('express');
const cors = require('cors');
const UserRoute = require('./app/routes/users');
const BranchRoute = require('./app/routes/branch');
const HistoryRoute = require('./app/routes/history');
const SensorRoute = require('./app/routes/sensor');
const AuthRoute = require('./app/routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use(AuthRoute)
app.use(UserRoute)
app.use(BranchRoute)
app.use(HistoryRoute)
app.use(SensorRoute)

app.listen(3000, () => {
    console.log('Server on port 3000');
})
