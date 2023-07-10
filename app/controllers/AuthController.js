const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(user.role === 'security'){
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { id, name, role, branch_id } = user;
    const modifiedUser = { id, name, email, role, branch_id };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, branch_id: user.branch_id }, jwtSecret, {
      expiresIn: '1h',
    });

    res.json({ token, user:modifiedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginWithMobile = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Periksa role user
    if (user.role !== 'security') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const { id, name, role, branch_id } = user;
    const modifiedUser = { id, name, email, role, branch_id };

    // Validasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id, role: user.role, branch_id: user.branch_id }, jwtSecret, {
      expiresIn: '1h',
    });

    res.json({ token, user: modifiedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

module.exports = {
  login,
  loginWithMobile,
  protect,
  generateToken,
};