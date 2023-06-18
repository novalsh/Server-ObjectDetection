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

    // Ambil data sensor berdasarkan ID
    const sensor = await Sensor.findByPk(id);

    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }

    // Hitung total sensor berdasarkan ID
    const total = await Sensor.count({ where: { id } });

    // Gabungkan data sensor dengan total sensor
    const sensorWithTotal = {
      ...sensor.toJSON(),
      total,
    };

    res.json(sensorWithTotal);
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

const createToSensor = async (req, res) => {
  try {
    const { id, branch_id, from_time, to_time, latitude, longitude, status } =
      req.body;

    if (
      !id ||
      !branch_id ||
      !from_time ||
      !to_time ||
      !latitude ||
      !longitude ||
      !status
    ) {
      return res.status(400).json({
        message: "Semua kolom harus diisi.",
      });
    }

    // Cek apakah sensor dengan ID yang diberikan sudah ada
    const existingSensor = await Sensor.findByPk(id);

    if (existingSensor) {
      // Jika ada, panggil fungsi updateSensor untuk memperbarui sensor
      await updateSensor(req, res);
      return;
    }

    // Jika tidak ada, kembalikan pesan bahwa ID tidak ditemukan
    return res.status(404).json({
      message: "ID tidak ditemukan.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat sensor.",
      error: error.message,
    });
  }
};

const updateSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      branch_id,
      from_time,
      to_time,
      latitude,
      longitude,
      status,
      conditional,
    } = req.body;

    const sensor = await Sensor.update(
      {
        branch_id,
        from_time,
        to_time,
        latitude,
        longitude,
        status,
        conditional,
      },
      {
        where: { id },
      }
    );
    res.json(sensor);
  } catch (error) {
    console.log(error);
  }
};

const updateSensorRaspberry = async (req, res) => {
  const dataSensor = req.body;

  if (dataSensor.conditional === "active") {
    try {
      res.json("udah masuk bos");
      console.log(dataSensor);
      io.on("connection", (socket) => {
        //join  with name and branch_id
        socket.on("joinBranch", ({ branch_id }) => {
          socket.join(branch_id);
          socket.broadcast
            .to(branch_id)
            .emit("dataSensor", formatMessage(dataSensor));
        });
      });
    } catch (error) {
      console.log(error);
    }
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
  createToSensor,
  updateSensor,
  updateSensorRaspberry,
  deleteSensor,
  updateAllSensorTimes,
};
