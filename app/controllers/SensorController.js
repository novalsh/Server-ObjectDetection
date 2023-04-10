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

const createSensor = async (req, res) => {
  try {
    const { branch_id, from_time, to_time, latitude, longitude, status, conditional } = req.body;

    if (!branch_id || !from_time || !to_time || !latitude || !longitude || !status || !conditional) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }

    const sensor = await Sensor.create({
      branch_id,
      from_time,
      to_time,
      latitude,
      longitude,
      status,
      conditional,
    });

    res.status(201).json(sensor);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'An error occurred while creating the sensor.',
      error: error.message,
    });
  }
};

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