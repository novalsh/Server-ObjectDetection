const formatMessage = require("../../utils/formatMessage");
const Sensor = require("../models/Sensor");

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

const getSensorByToken = async (req, res) => {
  try {
    const loggedInAdminBranchId = req.user.branch_id;
    const sensor = await Sensor.findAll({
      where: { branch_id: loggedInAdminBranchId },
    });
    res.json(sensor);
  } catch (error) {
    console.log(error);
  }
};

const createSensor = async (req, res) => {
  try {
    const {
      branch_id,
      from_time,
      to_time,
      latitude,
      longitude,
      status,
      conditional,
    } = req.body;

    if (
      !branch_id ||
      !from_time ||
      !to_time ||
      !latitude ||
      !longitude ||
      !status ||
      !conditional
    ) {
      return res.status(400).json({
        message: "All fields are required.",
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
      message: "An error occurred while creating the sensor.",
      error: error.message,
    });
  }
};

const updateSensor = async (req, res) => {
  // socket ngetrigger krim data ke client(hp)
  const dataEmergency = req.body.status;
  try {
    socket.broadcast
      .to(user.branch_id)
      .emit("dataEmergency", formatMessage(`${user.username} Butuh Bantuan`));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the sensor" });
  }
};

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

const updateAllSensorTimes = async (req, res) => {
  try {
    const { from_time, to_time } = req.body;
    const loggedInAdminBranchId = req.user.branch_id;
    console.log(req.user);

    const [affectedRows] = await Sensor.update(
      {
        from_time,
        to_time,
      },
      {
        where: { branch_id: loggedInAdminBranchId },
      }
    );

    res.json({
      message: `Updated ${affectedRows} sensor(s)`,
      from_time,
      to_time,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the sensors" });
  }
};

module.exports = {
  getSensor,
  getSensors,
  getSensorByToken,
  createSensor,
  updateSensor,
  deleteSensor,
  updateAllSensorTimes,
};
