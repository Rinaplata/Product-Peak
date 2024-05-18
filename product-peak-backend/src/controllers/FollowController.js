const { response } = require("express");
const mongoose = require("mongoose");
const Follower = require("../models/Follower");
const User = require("../models/User");
const Product = require("../models/Product");

const followUser = async (req, res = response) => {
  const { userIdToFollow } = req.body;
  try {
    const userToFollow = await User.findById(userIdToFollow);
    const userGoingToFollow = new mongoose.Types.ObjectId(res.userId);

    if (!userToFollow) {
      res.status(404).json({
        success: false,
        message: "The user you are trying to follow does not exist",
      });
    }

    if (userGoingToFollow.equals(userToFollow._id)) {
      res.status(400).json({
        success: false,
        message: "You can't follow yourself",
      });
    }

    const following = await Follower.findOne({
      follow: userGoingToFollow,
      target: userToFollow._id,
    });

    if (!following) {
      const follower = new Follower({
        follow: userGoingToFollow,
        target: userToFollow._id,
      });
      await follower.save();
      return res.status(201).json({
        success: true,
        message: "Follower Registered",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "You already follow this user",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const followList = async (req, res = response) => {
  const filterFollow = {
    follow: new mongoose.Types.ObjectId(req.params.userId),
  };
  const filterFollowing = {
    target: new mongoose.Types.ObjectId(req.params.userId),
  };
  try {
    const userFollowingList = await Follower.aggregate([
      {
        $match: filterFollow,
      },
      {
        $project: {
          following: "$target",
        },
      },
    ]);
    const userFollowersList = await Follower.aggregate([
      {
        $match: filterFollowing,
      },
      {
        $project: {
          followers: "$follow",
        },
      },
    ]);

    if (!userFollowingList) {
      res.status(404).json({
        success: false,
        message: "The user don't have following",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Follower List",
      followings: {
        userFollowingList,
        userFollowersList,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const findFollowerProduct = async (req, res = response) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(res.userId);

    const followersDocs = await Follower.find({ follow: userObjectId });

    const followedUserIds = followersDocs.flatMap((doc) => doc.target);

    if (followedUserIds.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found, you do not follow any user",
      });
    }
    const filter = ({} = req.body);

    const product = await Product.aggregate([
      { $match: { userId: { $in: followedUserIds } } },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "productId",
          as: "ratings",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$ratings.rating" },
        },
      },
      { $match: filter },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          url: 1,
          tags: 1,
          userId: 1,
          averageRating: 1,
        },
      },
    ]);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
        product: {
          filter,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Found",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { followUser, followList, findFollowerProduct };
