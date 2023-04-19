const Branch = require("../models/Branch");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const getBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branches = await Branch.findByPk(id);
    res.json(branches);
  } catch (error) {
    console.log(error);
  }
};

const getBranchByToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.decode(token);
    const id = decoded.branch_id;
    const idbranch = parseInt(id);
    const branches = await Branch.findByPk(idbranch);
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
    const { name, location } = req.body;

    if (!name || !location) {
      console.log(req.body);
      return res.status(400).json({
        message: "Both name and location fields are required.",
      });
    }
    const branch = await Branch.create({
      name: name,
      location: location,
    });

    res.json(branch);
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
    const { name, location } = req.body;
    const branch = await Branch.update(
      {
        name,
        location,
      },
      {
        where: { id },
      }
    );
    res.json(branch);
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
    res.json(branch);
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
