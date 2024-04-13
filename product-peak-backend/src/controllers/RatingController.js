const { response } = require("express");
const Rating = require("../models/Rating");

const createRating = async (req, res = response) => {
  const { productId, userId, rating } = req.body;

  try {
    const Rating = new Comment({ productId, userId, rating });
    await Rating.save();

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllRating = async (req, res = response) => {
  const productId = req.params.productId;

  try {
    const ratings = await ProductRating.find({ productId });

    if (ratings.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No ratings found for this product" });
    }

    const totalRatings = ratings.length;
    const totalScore = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalScore / totalRatings;

    res.status(200).json({ success: true, averageRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createRating, getAllRating };
