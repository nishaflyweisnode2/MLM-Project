const Product = require("../Models/productModel");
const slugify = require("slugify");
const User = require("../Models/distributorModel")


const createProduct = async (req, res) => {
  try {
    const { title, ...productData } = req.body;

    let images = [];
    if (req.files) {
      for (let j = 0; j < req.files.length; j++) {
        let obj = {
          url: req.files[j].path,
        };
        images.push(obj);
      }
    }

    const slug = slugify(title);
    const newProduct = new Product({
      title,
      slug,
      ...productData,
      image: images,
    });

    await newProduct.save();

    res.status(200).json({
      status: 200,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


const getaProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json({
      status: 200,
      message: "Product found successfully",
      data: findProduct
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.status(200).json({ status: 200, message: "All Product Found", data: product });
  } catch (error) {
    throw new Error(error);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    const updatedProductData = { ...existingProduct.toObject(), ...req.body };

    if (req.body.title) {
      updatedProductData.slug = slugify(req.body.title);
    }

    // if (req.files) {
    //   for (let j = 0; j < req.files.length; j++) {
    //     const newImage = { url: req.files[j].path };
    //     updatedProductData.image.push(newImage);
    //   }
    // }

    if (req.files) {
      updatedProductData.image = req.files.map((file) => ({ url: file.path }));
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, {
      new: true,
    });

    res.json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        status: 404,
        message: "Product not found"
      });
    }
    res.json({
      status: 200,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Product could not be deleted",
      error: error.message
    });
  }
};

// const addToWishlist = async (req, res) => {
//   const userId = req.user._id;
//   const prodId = req.body._id;
//   console.log(userId, prodId);
//   try {
//     const user = await User.findById({ _id: userId, });
//     if (!user) {
//       return res.status(404).json({
//         status: 404,
//         message: "User not found"
//       });
//     }

//     const alreadyAdded = user.wishlist.includes(prodId);
//     if (alreadyAdded) {
//       await User.findByIdAndUpdate(userId, {
//         $pull: { wishlist: prodId }
//       });
//     } else {
//       await User.findByIdAndUpdate(userId, {
//         $push: { wishlist: prodId }
//       });
//     }

//     const updatedUser = await User.findById(userId);
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: "An error occurred",
//       error: error.message
//     });
//   }
// };

const addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const prodId = req.params._id;
  console.log(userId, prodId);
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found"
      });
    }

    const alreadyAdded = user.wishlist.includes(prodId);

    if (alreadyAdded) {
      await User.findByIdAndUpdate(userId, {
        $pull: { wishlist: prodId }
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { wishlist: prodId }
      });
    }

    const updatedUser = await User.findById(userId);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred",
      error: error.message
    });
  }
};

const getLatestProduct = async (req, res) => {
  try {
    const latestProduct = await Product.find().sort({ createdAt: -1 });

    if (!latestProduct) {
      return res.status(404).json({ status: 404, message: 'No products found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Latest added product retrieved successfully',
      data: latestProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const rateProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { star, comment } = req.body;

    if (star < 0) {
      return res.status(400).json({ status: 400, message: "Rating cannot be negative" });
    }

    if (star > 5) {
      return res.status(400).json({ status: 400, message: "Rating cannot be greater than 5" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    product.ratings.push({
      star,
      comment,
      postedby: userId,
    });

    const totalRatings = product.ratings.length;
    const totalStars = product.ratings.reduce((acc, rating) => acc + rating.star, 0);
    const averageRating = totalRatings > 0 ? totalStars / totalRatings : 0;

    product.totalRating = totalRatings;
    product.averageRating = averageRating;

    await product.save();

    return res.status(200).json({
      status: 200,
      message: "Product rated successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getProductRatings = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    return res.status(200).json({
      status: 200,
      message: "Product ratings retrieved successfully",
      totalRating: product.totalRating,
      averageRating: product.averageRating,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getProductRatingByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    const userRatings = product.ratings.filter((rating) => rating.postedby.toString() === userId);

    if (userRatings.length === 0) {
      return res.status(404).json({ status: 404, message: "User has not rated this product" });
    }

    return res.status(200).json({
      status: 200,
      message: "User ratings for the product retrieved successfully",
      data: userRatings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { star, comment } = req.body;

    if (star < 0) {
      return res.status(400).json({ status: 400, message: "Rating cannot be negative" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    const userRatingIndex = product.ratings.findIndex((rating) => rating.postedby.toString() === userId);

    if (userRatingIndex === -1) {
      return res.status(404).json({ status: 404, message: "User rating not found for this product" });
    }

    product.ratings[userRatingIndex] = {
      star,
      comment,
      postedby: userId,
    };

    const totalRatings = product.ratings.length;
    const totalStars = product.ratings.reduce((acc, rating) => acc + rating.star, 0);
    const averageRating = totalRatings > 0 ? totalStars / totalRatings : 0;

    product.totalRating = totalRatings;
    product.averageRating = averageRating;

    await product.save();

    return res.status(200).json({
      status: 200,
      message: "Product rating updated successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    const userRatingIndex = product.ratings.findIndex((rating) => rating.postedby.toString() === userId);

    if (userRatingIndex === -1) {
      return res.status(404).json({ status: 404, message: "User rating not found for this product" });
    }

    product.ratings.splice(userRatingIndex, 1);

    const totalRatings = product.ratings.length;
    const totalStars = product.ratings.reduce((acc, rating) => acc + rating.star, 0);
    const averageRating = totalRatings > 0 ? totalStars / totalRatings : 0;

    product.totalRating = totalRatings;
    product.averageRating = averageRating;

    await product.save();

    return res.status(200).json({
      status: 200,
      message: "Product rating deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  getLatestProduct,
  rateProduct,
  getProductRatings,
  getProductRatingByUser,
  updateRating,
  deleteRating,
}

