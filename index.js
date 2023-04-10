require('dotenv').config();
const express = require('express');
const cors = require('cors');
const UserRoute = require('./app/routes/Users');
const BranchRoute = require('./app/routes/Branch');
const HistoryRoute = require('./app/routes/History');
const SensorRoute = require('./app/routes/Sensor');



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
