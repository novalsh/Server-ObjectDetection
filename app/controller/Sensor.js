import Sensor from "../models/Sensor";

export const getSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await Sensor.findByPk(id);
    res.json(sensor);
  } catch (error) {
    console.log(error);
  }
};

export const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.findAll();
    res.json(sensors);
  } catch (error) {
    console.log(error);
  }
};

export const createSensor = async (req, res) => {};

export const updateSensor = async (req, res) => {};

export const deleteSensor = async (req, res) => {
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