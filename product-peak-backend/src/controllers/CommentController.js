const { response } = require('express');
const Comment = require('../models/Comment');

const createComment = async (req, res) => {
    const { productId, userId, content } = req.body;
  
    try {
      const comment = new Comment({ productId, userId, content });
      await comment.save();
      
      res.status(201).json({ success: true, message: 'Comment created successfully', comment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  
  
  module.exports = { createComment };