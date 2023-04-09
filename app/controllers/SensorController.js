const Sensor = require('../models/Sensor');

const getSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await Sensor.findByPk(id);
    res.json(sensor);
  } catch (error) {
    console.log(error);
  }
};

const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.findAll();
    res.json(sensors);
  } catch (error) {
    console.log(error);
  }
};

const createSensor = async (req, res) => { };

const updateSensor = async (req, res) => { };

const deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await Sensor.destroy({
      where: { id },
    });
    res.json(sensor);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getSensor, getSensors, createSensor, updateSensor, deleteSensor };
