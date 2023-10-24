const Coupon = require("../Models/CouponModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const Notification = require('../Models/notificationModel');
const User = require("../Models/distributorModel");


const createCoupon = async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);

    const users = await User.find({});

    for (const user of users) {
      const notification = new Notification({
        recipient: user._id,
        content: `New coupon "${newCoupon.name}" is available!`,
        type: 'coupon',
      });


      await notification.save();
    }

    res.status(201).json({ status: 201, coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ message: 'Error creating coupon', error: error.message });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
};
const updateCoupon = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
};
const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
};
const getCoupon = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getAcoupon = await Coupon.findById(id);
    res.json(getAcoupon);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon,
};