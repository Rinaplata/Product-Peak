const { response } = require("express");
const Product = require("../models/Product");
const User = require("../models/User");

const createProduct = async (req, res = response) => {
  const { name, description, url, tags } = req.body;
  try {
    const product = new Product({
      name,
      description,
      url,
      tags: tags,
      userId: res.userId,
    });

    await product.save();

    return res.status(201).json({
      ok: true,
      error: {
        message: "Product Registered",
      },
      product: {
        id: product._id,
        name: product.name,
        description: product.description,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: {
        message: "Something went worng, please contact to admin",
      },
    });
  }
};

module.exports = { createProduct };
