const Order = require("../Models/orderModel");
const User = require("../Models/distributorModel");
const Cart = require("../Models/CartModel");
const Product = require("../Models/productModel");
const Wallet = require("../Models/WalletModel")
const uniqid = require("uniqid");
const Notification = require('../Models/notificationModel');

const validateMongoDbId = require("../utils/validateMongodbId");

const getOrder = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userOrders = await Order.find({ orderby: _id }).sort({ createdAt: -1 }).populate(
      "products.product"
    ).populate("address").exec();
    res.json({
      status: 200,
      message: "Get Orders Successfully",
      data: userOrders,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


const createOrder = async (req, res) => {
  const { COD, couponApplied, orderStatus } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    if (!COD) throw new Error("Create cash order failed");

    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmount = 0;

    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }
    console.log(`final Amount = ${finalAmount}`);


    const gstPercentage = 18;
    const gstAmount = (finalAmount * gstPercentage) / 100;
    lessGstfinalAmount = (finalAmount - gstAmount);
    console.log(`GST final Amount = ${lessGstfinalAmount}`)

    const costPricePercentage = 75;
    const costPriceAmount = (lessGstfinalAmount * costPricePercentage) / 100;
    console.log(`cost price amount ${costPriceAmount}`) //3075

    const OverAllMarginPercentage = 20.5;
    const OverAllMarginAmount = (finalAmount * OverAllMarginPercentage) / 100;
    console.log(`Over all Margin Amount = ${OverAllMarginAmount}`)


    const companyMarginPercentage = 4.10;
    const companyMarginAmount = (finalAmount * companyMarginPercentage) / 100;
    console.log(`company margin = ${companyMarginAmount}`)

    const balanceToDistributePercentage = 16.40;
    let balanceToDistribute = (finalAmount * balanceToDistributePercentage) / 100;
    console.log(`balance To Distribute Amount = ${balanceToDistribute}`)


    const distributorLevel = user.level;

    if (distributorLevel <= 10) {
      const levelWisePercentage = [35, 20, 10, 8, 7, 6, 5, 4, 3, 2];
      balanceToDistribute *= levelWisePercentage[distributorLevel - 1] / 100;
      console.log(`levelWisePercentage = ${levelWisePercentage[distributorLevel - 1] / 100}`)
    }

    const distributorAmount = balanceToDistribute;


    if (user.parentId) {
      const parent = await User.findById(user.parentId);
      console.log(`parent = ${parent.name}`);
      if (parent) {
        const parentWallet = await Wallet.findOne({ user: parent._id });
        if (parentWallet) {
          parentWallet.amount += distributorAmount;
          await parentWallet.save();
        } else {
          const newParentWalletEntry = new Wallet({
            user: parent._id,
            amount: distributorAmount,
          });
          await newParentWalletEntry.save();
        }
      }
    }

    user.wallet += distributorAmount;
    user.sales += finalAmount;
    await user.save();

    const address = userCart.address;

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: orderStatus,
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: orderStatus,
      distributorAmount: distributorAmount,
      address: address,
    });

    newOrder.save();

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});

    res.json({
      status: 200,
      message: "Order successfully",
      data: newOrder,
    });
    const orderNotificationMessage = `Thank you for your order! Your order with ID ${newOrder._id} has been placed successfully.`;
    const orderNotification = new Notification({
      recipient: user._id,
      content: orderNotificationMessage,
      type: 'order',
    });
    await orderNotification.save();
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};


const getOrderStatus = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({ _id: orderNumber }).populate(
      "products.product"
    ).populate('address');

    if (!order) {
      return res.status(404).json({ status: 404, message: 'Order not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Order status retrieved successfully',
      data: {
        order
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


const getTotalRevenue = async (req, res) => {
  try {
    const orders = await Order.find();

    let totalRevenue = 0;
    for (const order of orders) {
      // You need to consider how you calculate revenue based on your data model
      // For example, if the order has a `totalAmount` field, you can use that
      totalRevenue += order.paymentIntent.amount;
    }

    return res.status(200).json({ totalRevenue });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getOrderStatus,
  getTotalRevenue
};




























