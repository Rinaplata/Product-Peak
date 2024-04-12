const { body } = require("express-validator");

const signUpValidator = () => {
  return [
    body("username", "Username is mandatory").not().isEmpty(),
    body("email", "Email is mandatory").isEmail(),
    body("password", "Password min length is 6").isLength({ min: 6 }),
    body("bio", "Bio max length is 1000").isLength({ max: 1000 }),
    body("avatar", "Avatar is mandatory").not().isEmpty(),
  ];
};

const logInValidator = () => {
  return [
    body("email", "Email is mandatory").isEmail(),
    body("password", "Password is mandatory").not().isEmpty(),
  ];
};

module.exports = { signUpValidator, logInValidator };
