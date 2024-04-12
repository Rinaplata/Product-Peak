const { Router } = require("express");
const router = Router();

const {
  createUser,
  loginUser,
  renewToken,
} = require("../controllers/UserController");
const {
  signUpValidator,
  logInValidator,
} = require("../validators/UserValidator");
const { validateFields } = require("../middlewares/validateFields");

// Create a new user
router.post("/signUp", signUpValidator(), createUser);

// login

router.post("/logIn", [logInValidator(), validateFields], loginUser);

router.get("/renew", renewToken);

module.exports = router;
