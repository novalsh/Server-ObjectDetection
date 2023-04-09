const History = require('../models/History');

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

module.exports = { getHistorys, getHistory };

