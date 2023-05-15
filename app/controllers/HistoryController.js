const History = require('../models/History');
const multer = require('multer');
const path = require('path');

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
        const dataHistorys = await History.findAll();
        res.json(dataHistorys);
    } catch (error) {
        console.log(error);
    }
}

const getHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const dataHistory = await History.findByPk(id);
        res.json(dataHistory);
    } catch (error) {
        console.log(error);
    }
}

const getHistoryByToken = async (req, res) => {
    try {
        const loggedInAdminBranchId = req.user.branch_id;
        const dataHistory = await History.findAll({
            where: { branch_id: loggedInAdminBranchId },
        });
        res.json(dataHistory);
    } catch (error) {
        console.log(error);
    }
}

const createHistory = async (req, res) => {
    try {
      const { name, description, date, photo_url, user_id, branch_id } = req.body;
      const dataHistory = await History.create({
        name,
        description,
        date,
        photo_url,
        user_id,
        branch_id,
        status: 'aman' // status default adalah 'aman'
      });
      res.json(dataHistory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data.' });
    }
};

module.exports = { getHistoryByToken, createHistory, upload, getHistorys, getHistory};
