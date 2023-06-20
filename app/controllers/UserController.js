const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { generateToken } = require("./AuthController");
const Branch = require("../models/Branch");
const {
  validateEmail,
  validateStatus,
  validateCondition,
  validateRole,
  errorResponse,
} = require("../../helper/responseUser");

const testAPI = async (req, res) => {
  const userData = await User.findAll();
  res.json(userData);
};

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

const getUserByToken = async (req, res) => {
  try {
    const loggedInAdminBranchId = req.user.branch_id;
    const user = await User.findAll({
      where: { branch_id: loggedInAdminBranchId },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status, condition, branch_id } =
      req.body;
    const passwordBcrypt = await bcrypt.hash(password, 10);

    // Validation
    if (!validateEmail(email)) {
      return errorResponse(res, "Email tidak valid", 400);
    }

    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      return errorResponse(res, "Email sudah terdaftar", 400);
    }

    if (!validateStatus(status)) {
      return errorResponse(res, "Status tidak valid", 400);
    }

    if (!validateCondition(condition)) {
      return errorResponse(res, "Kondisi tidak valid", 400);
    }

    if (!validateRole(role)) {
      return errorResponse(res, "Role tidak valid", 400);
    }

    const branch = await Branch.findByPk(branch_id);
    if (!branch) {
      return errorResponse(res, "Branch tidak ditemukan", 404);
    }

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
    const { name, email, password, role, status, condition, branch_id } =
      req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return errorResponse(res, "User tidak ditemukan", 404);
    }

    if (email && !validateEmail(email)) {
      return errorResponse(res, "Email tidak valid", 400);
    }

    if (email && email !== user.email) {
      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        return errorResponse(res, "Email sudah terdaftar", 400);
      }
    }

    if (status && !validateStatus(status)) {
      return errorResponse(res, "Status tidak valid", 400);
    }

    if (condition && !validateCondition(condition)) {
      return errorResponse(res, "Kondisi tidak valid", 400);
    }

    if (role && !validateRole(role)) {
      return errorResponse(res, "Role tidak valid", 400);
    }

    if (branch_id) {
      const branch = await Branch.findByPk(branch_id);
      if (!branch) {
        return errorResponse(res, "Branch tidak ditemukan", 404);
      }
    }

    const updatedData = {
      name: name || user.name, // menggunakan nilai asli jika tidak ada pada req.body
      email: email || user.email,
      password: password || user.password,
      role: role || user.role,
      status: status || user.status,
      condition: condition || user.condition,
      branch_id: branch_id || user.branch_id,
    };

    const userUpdated = await User.update(updatedData, { where: { id } });
    const newUser = await User.findByPk(id);

    res.json({
      message: "User updated successfully.",
      user: newUser,
    });
  } catch (error) {
    return errorResponse(res, "Terjadi kesalahan saat mengupdate user", 500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({
      where: { id },
    });
    res.json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByToken,
};
