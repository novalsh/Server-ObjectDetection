const { error } = require("console");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const {generateToken} = require("./AuthController");

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status, condition, branch_id } = req.body;
    const passwordBcrypt = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: passwordBcrypt,
      role,
      status,
      condition,
      branch_id,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const updatedData = {
      name: name || user.name, // menggunakan nilai asli jika tidak ada pada req.body
      email: req.body.email || user.email,
      password: req.body.password || user.password,
      role: req.body.role || user.role,
      status: req.body.status || user.status,
      condition: req.body.condition || user.condition,
      branch_id: req.body.branch_id || user.branch_id,
    };

    const userUpdated = await User.update(updatedData, { where: { id } });

    const newUser = await User.findByPk(id);
    const token = generateToken({ id: newUser.id, role: newUser.role, branch_id: newUser.branch_id });

    res.json({ message: 'User berhasil diupdate', userUpdated, token })
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate user', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({
      where: { id },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser };
