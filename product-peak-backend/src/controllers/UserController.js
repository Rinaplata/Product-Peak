const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;

const createUser = async (req, res = response) => {
  const { username, email, password, bio, avatar } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "User already exists",
        },
      });
    }
    const passwordEncr = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: passwordEncr, bio, avatar });

    await user.save();

    res.json({
      ok: true,
      msg: "Registered",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[ERROR]", error);

    res.status(500).json({
      ok: false,
      error: {
        message: "Something went worng, please contact to admin",
      },
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Comparacion de contrasegna con la encriptacion
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(401).json({
      ok: false,
      error: {
        message: "Wrong Credentials",
      },
    });
  }
  const token = jwt.sign({ userId: user._id }, secret, {
    expiresIn: "1h",
  });

  res.status(200).json({
    ok: true,
    error: {
      message: "",
    },
    token,
  });
};

const renewToken = (req, res = response) => {
  const { token } = req.body;

  res.json({
    ok: true,
    msg: "renew",
    token: token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
