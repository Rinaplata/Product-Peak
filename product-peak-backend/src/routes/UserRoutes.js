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
const { reporterResult } = require("../validators/ValidatorResult");
const { validateFields } = require("../middlewares/validateFields");

// Create a new user
router.post("/signUp", [signUpValidator(), reporterResult], createUser);

// login

router.post(
  "/logIn",
  [logInValidator(), reporterResult, validateFields],
  loginUser
);

router.get("/renew", renewToken);

module.exports = router;
