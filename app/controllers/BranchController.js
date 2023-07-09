const Branch = require("../models/Branch");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const getBranch = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const branches = await Branch.findByPk(id);
    res.json(branches);
  } catch (error) {
    console.log(error);
  }
};

const getBranchByToken = async (req, res) => {
  try {
    const id = req.user.branch_id;
    const branches = await Branch.findByPk(id);
    res.json(branches);
  } catch (error) {
    console.log(error);
  }
};

const getBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.json(branches);
  } catch (error) {
    console.log(error);
  }
};

const createBranch = async (req, res) => {
  try {
    const { name, city, from_active_time, to_active_time } = req.body;

    if (!name || !city || !from_active_time || !to_active_time) {
      console.log(req.body);
      return res.status(400).json({
        message: "Both name, city, from time, and active time fields are required.",
      });
    }
    const branch = await Branch.create({
      name: name,
      city: city,
      from_active_time: from_active_time,
      to_active_time: to_active_time,
    });

    res.json({
      message: "Branch created successfully.",
      data: branch,
    });
  } catch (error) {
    console.log(error);
    // You can send a more specific error message back to the client
    res.status(500).json({
      message: "An error occurred while creating the branch.",
      error: error.message,
    });
  }
};

const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { from_active_time, to_active_time } = req.body;
    const branch = await Branch.update(
      {
        from_active_time,
        to_active_time,
      },
      {
        where: { id },
      }
    );
    res.json({
      message: "Branch updated successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.destroy({
      where: { id },
    });
    res.json({
      message: "Branch deleted successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBranch,
  getBranchByToken,
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch,
};
