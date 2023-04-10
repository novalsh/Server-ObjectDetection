const User = require('../models/Users');
const bcrypt = require('bcrypt');

const getUser = async (req, res, ) => {
 const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        res.json(user);
    } catch (error) {
        console.log(error);
    }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status, condition, branch_id } = req.body;

    const passwordByrypt = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password : passwordByrypt,
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
    const { name, email, password } = req.body;
    const user = await User.update(
      {
        name,
        email,
        password,
      },
      {
        where: { id },
      }
    );
    res.json(user);
  } catch (error) {
    console.log(error);
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