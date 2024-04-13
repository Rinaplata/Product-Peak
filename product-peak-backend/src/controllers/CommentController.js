const { response } = require("express");
const Comment = require("../models/Comment");

const createComment = async (req, res = response ) => {
  const { productId, userId, content } = req.body;

  try {
    const comment = new Comment({ productId, userId, content });
    await comment.save();

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

const getAllComment = async (req, res = response ) => {
  const { productId  } = req.body;

  try {
    const comment = await Comment.find({ productId });
    if (!comment || comment.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Comments found for this product" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Comments found for this product",
        comment,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createComment, getAllComment };
