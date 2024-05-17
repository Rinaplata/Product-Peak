const { response } = require("express");
const Rating = require("../models/Rating");

const createRating = async (req, res = response) => {
  const { productId, rating: ratingValue } = req.body;
  try {
    const rating = new Rating({
      productId,
      userId: res.userId,
      rating: ratingValue,
    });

    await rating.save();

    res.status(201).json({
      success: true,
      message: "Rating created successfully",
      rating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllRating = async (req, res = response) => {
  const productId = req.params.productId;

  try {
    const ratings = await Rating.find({ productId });

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
