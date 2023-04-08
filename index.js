import express from 'express';
import cors from 'cors';
import UserRoute from './routes/Users';
import BranchRoute from './routes/Branch';
import HistoryRoute from './routes/History';
import SensorRoute from './routes/Sensor';

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute)
app.use(BranchRoute)
app.use(HistoryRoute)
app.use(SensorRoute)

app.listen(1000, () => {
    console.log('Server on port 1000');
})
