const formatMessage = require("../../utils/formatMessage");
const Sensor = require("../models/Sensor");
// const io = require("../../index");

const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = require("http").Server(app);
const io = new Server(server);

const getSensor = async (req, res) => {
  try {
    const { id } = req.params;

    // Ambil data sensor berdasarkan ID/Branch Id
    const sensor = await Sensor.findByPk(id);
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    return res.json(sensor);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getSensorByBranchId = async (req, res) => {
  try {
    const { id } = req.params;

    // Ambil data sensor berdasarkan Branch Id
    const sensor = await Sensor.findAll({
      where: { branch_id: id },
    });
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    return res.json(sensor);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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
      code,
      branch_id,
      latitude,
      longitude,
      isOn,
    } = req.body;

    if (
      !code ||
      !branch_id ||
      !latitude ||
      !longitude ||
      !isOn
    ) {
      return res.status(400).json({
        message: "Code, Branch Id, Latitude, and Logitude fields are required.",
      });
    }

    // check code sensor is exist
    const existingSensor = await Sensor.findOne({
      where: { code },
    });

    if (existingSensor) {
      return res.status(400).json({
        message: "Code sensor already exist.",
      });
    }

    const sensor = await Sensor.create({
      code,
      branch_id,
      latitude,
      longitude,
      isOn,
    });

    res.status(201).json({
      message: "Sensor created successfully.",
      data: sensor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while creating the sensor.",
      error: error.message,
    });
  }
};

const updateSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code,
      branch_id,
      latitude,
      longitude,
      isOn,
    } = req.body;

    // Cek apakah sensor dengan ID yang diberikan ada
    const sensor = await Sensor.findByPk(id);
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }

    // Cek apakah code sensor yang diberikan sudah ada
    const existingSensor = await Sensor.findOne({
      where: { code },
    });

    if (existingSensor && existingSensor.id !== Number(id)) {
      return res.status(400).json({
        message: "Code sensor already exist.",
      });
    }
    const sensorUpdate = await Sensor.update(
      {
        code,
        branch_id,
        latitude,
        longitude,
        isOn,
      },
      {
        where: { id },
      }
    );
    res.status(200).json({
      message: 'Sensor updated successfully.',
    });
  } catch (error) {
    console.log(error);
  }
};

const updateSensorRaspberry = async (req, res) => {
  const { code, branch_id, latitude, longitude, isDetected } = req.body;

  // check id sensor in current branch
  const sensor = await Sensor.findOne({
    where: { code, branch_id },
  });
  if (!sensor) {
    return res.status(404).json({ message: "Sensor not found" });
  }

  try {
    // save data sensor
    const dataSensor = await Sensor.update(
      {
        latitude,
        longitude,
        isDetected,
      },
      {
        where: { code, branch_id },
      }
    );
    res.json({
      message: "Sensor updated successfully"
    });
    console.log(dataSensor);
    io.on('connection', (socket) => {
      //join with name and branch_id
      socket.on('joinBranch', ({ branch_id }) => {
        socket.join(branch_id);
        socket.broadcast.to(branch_id).emit('dataSensor', formatMessage(dataSensor));
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await Sensor.destroy({
      where: { id },
    });
    res.json({
      message: 'Sensor deleted successfully.',
    });
  } catch (error) {
    console.log(error);
  }
};

// const updateAllSensorTimes = async (req, res) => {
//   try {
//     const { from_time, to_time } = req.body;
//     const loggedInAdminBranchId = req.user.branch_id;
//     console.log(req.user);

//     const [affectedRows] = await Sensor.update(
//       {
//         from_time,
//         to_time,
//       },
//       {
//         where: { branch_id: loggedInAdminBranchId },
//       }
//     );

//     res.json({
//       message: `Updated ${affectedRows} sensor(s)`,
//       from_time,
//       to_time,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while updating the sensors" });
//   }
// };

module.exports = {
  getSensor,
  getSensors,
  getSensorByToken,
  createSensor,
  // createToSensor,
  updateSensor,
  updateSensorRaspberry,
  deleteSensor,
  getSensorByBranchId
  // updateAllSensorTimes,
};
