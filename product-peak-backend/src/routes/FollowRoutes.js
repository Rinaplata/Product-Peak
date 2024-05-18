const { Router } = require("express");
const router = Router();

const {
  followUser,
  followList,
  findFollowerProduct,
} = require("../controllers/FollowController");
const { reporterResult } = require("../validators/ValidatorResult");
const verifyToken = require("../middlewares/authJWT");

// New Follow User
router.post("", verifyToken, followUser);
// Get Follow User
router.get("/user/:userId", verifyToken, followList);
// Find Follower Product
router.get("/product", verifyToken, findFollowerProduct);

module.exports = router;
