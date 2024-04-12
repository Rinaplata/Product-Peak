const { response } = require("express");
const Rating = require("../models/Rating");

const createRating = async (req, res = response ) => {
  const { productId, userId, rating } = req.body;

  try {
    const Rating = new Comment({ productId, userId, rating });
    await Rating.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Comment created successfully",
        comment,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {createRating };