const { response } = require("express");
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
    const productToModify = { name, description, url, tags };
    // Eliminar parametros vacios
    Object.keys(productToModify).forEach(
      (k) =>
        productToModify[k] === "" ||
        (productToModify[k] === undefined && delete productToModify[k])
    );

    await Product.findOneAndUpdate(filter, productToModify);

    return res.status(201).json({
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

module.exports = { createProduct, modifyProduct };
