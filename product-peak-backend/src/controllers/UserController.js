const { response } = require('express');
const User = require('../models/User')

const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET;

const createUser = async (req, res = response) => {
  const { username, email, password, bio, avatar } = req.body;

  const token = jwt.sign({
    email, password
  }, secret, { expiresIn: '1h' });

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        error: {
          message: 'User already exists'
        }
      });
    }

    user = new User({ username, email, password, bio, avatar });

    await user.save();

    res.json({
      ok: true,
      msg: 'registered',
      user: {
        id: user.id, email: user.email, 
      },
      token
    });
  } catch (error) {
    console.error('[ERROR]', error);

    res.status(500).json({
      ok: false,
      error: {
        message: 'Something went worng, please contact to admin'
      }
    })
  }
};

const loginUser = async (req, res = response, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email });

  if (!user || user.password != password) {
    return res.status(400).json({
      ok: false,
      error: {
        message: 'Wrong Credentials'
      }
    });
  }

  const token = jwt.sign({ userId: user._id }, secret, {
    expiresIn: '1h',
    });
  
    res.status(200).json({ token });
  
}

const renewToken = (req, res = response) => {
  const { token } = req.body;

  res.json({
    ok: true,
    msg: 'renew',
    token: token
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken
};