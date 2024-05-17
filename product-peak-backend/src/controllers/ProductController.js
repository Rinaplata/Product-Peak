const { response } = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

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

const modifyProduct = async (req, res = response) => {
  const { name, description, url, tags } = req.body;
  const filter = { _id: req.params.productId, userId: res.userId };
  try {
    const product = await Product.findOne(filter);
    if (!product) {
      return res.status(404).json({
        ok: true,
        error: {
          message: "Product Not Found",
        },
        product: {
          name: name,
        },
      });
    }
    const productToModify = {
      name,
      description,
      url,
      tags,
      updatedAt: Date.now,
    };
    // Eliminar parametros vacios
    Object.keys(productToModify).forEach(
      (k) =>
        productToModify[k] === "" ||
        (productToModify[k] === undefined && delete productToModify[k])
    );

    await Product.findOneAndUpdate(filter, productToModify);

    return res.status(200).json({
      ok: true,
      error: {
        message: "Product Modify",
      },
      productToModify,
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

const deleteProduct = async (req, res = response) => {
  const filter = { _id: req.params.productId, userId: res.userId };
  try {
    const product = await Product.findOne(filter);
    if (!product) {
      return res.status(404).json({
        ok: true,
        error: {
          message: "Product Not Found",
        },
        product: {
          _id: req.params.productId,
        },
      });
    }
    console.log(product);

    await Product.deleteOne(filter);

    return res.status(200).json({
      ok: true,
      error: {
        message: "Product Delete",
      },
      product: {
        product,
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

const findProductWithParameters = async (req, res = response) => {
  const filter = ({} = req.body);
  try {
    const product = await Product.find(filter);
    if (!product) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "Product Not Found",
        },
        product: {
          filter,
        },
      });
    }

    return res.status(200).json({
      ok: true,
      error: {
        message: "Product Found",
      },
      product,
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

const specificProduct = async (req, res = response) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({
        ok: true,
        error: {
          message: "Product Not Found",
        },
        product: {
          id: req.params.productId,
        },
      });
    }

    const productSpecific = await Product.aggregate([
      { $match: { _id: product._id } },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "productId",
          as: "ratings",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "productId",
          as: "comments",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          ratings: {
            _id: 1,
            userId: 1,
            rating: 1,
            createdAt: 1,
            updatedAt: 1,
          },
          comments: {
            _id: 1,
            userId: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      },
    ]);

    return res.status(200).json({
      ok: true,
      error: {
        message: "Product With Comments and Ratings",
      },
      product: { productSpecific },
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

module.exports = {
  createProduct,
  modifyProduct,
  deleteProduct,
  findProductWithParameters,
  specificProduct,
};
