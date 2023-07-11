const History = require('../models/History');
const multer = require('multer');
const path = require('path');
const User = require('../models/Users');
const Sensor = require('../models/Sensor');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage/app/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('photo_url')

const getHistorys = async (req, res) => {
    try {
        const dataHistorys = await History.findAll(
            // get detail users
            {
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: ['password']
                        }
                    },
                ],
            }
        );
        res.json(dataHistorys);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data.' });
    }
}

const getHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const dataHistory = await History.findByPk(id);
        res.json(dataHistory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data.' });
    }
}

const getHistoryByToken = async (req, res) => {
    try {
        const loggedInAdminBranchId = req.user.branch_id;
        const dataHistory = await History.findAll({
            where: { branch_id: loggedInAdminBranchId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Sensor,
                    as: 'sensor',
                }
            ],
        });
        res.json(dataHistory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data.' });
    }
}

const createHistory = async (req, res, photo_url) => { 
    try {
        const { sensor_id, description, date, user_id, branch_id, isEmergency } = req.body;
        const dataHistory = await History.create({
            sensor_id,
            description,
            date,
            photo_url,
            user_id,
            branch_id,
            isEmergency,
        });
        res.json(dataHistory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data.' });
    }
};

module.exports = { getHistoryByToken, createHistory, getHistorys, getHistory };
