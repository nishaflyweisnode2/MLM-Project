const mongoose = require("mongoose");


var userSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    city: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    userType: {
      type: String,
      default: "Distributor",
      enum: ["Distributor", "subDistributor", "Admin"]
    },
    address: {
      type: String,
    },
    pincode: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Trans", "Other"]
    },
    gstin: {
      type: String,
    },
    network: {
      type: String,
      enum: ["My Kutumbhakam 1",
        "My Kutumbhakam 2"]
    },
    dateOfBirth: {
      type: String,
    },
    sales: {
      type: Number,
      default: 0
    }, // Total sales made by the distributor
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: {
      type: Array,
      default: [],
    },
    teamMembers: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    active: {
      type: Boolean, default: true
    },
    kycStatus: {
      type: Boolean, default: false
    },
    uniqueId: {
      type: String
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Distributor'
    },
    level: {
      type: Number,
      default: 1
    },
    leader: {
      type: Boolean,
      default: false,
    },
    Kutumbh: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'subDistributor'
    }],
    bankDetails: {
      bankName: {
        type: String,
      },
      accountNumber: {
        type: String,
      },
      ifscCode: {
        type: String,
      },
      location: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.getDirectChildren = async function () {
  const children = await this.model("User").find({ parentId: this._id });
  return children;
};


userSchema.methods.getLeafNodes = async function () {
  const leafNodes = await this.model("User").find({ parentId: this._id, Kutumbh: [] });
  return leafNodes;
};


userSchema.methods.getSiblings = async function () {
  const siblings = await this.model("User").find({ parentId: this.parentId, _id: { $ne: this._id } });
  return siblings;
};


module.exports = mongoose.model("User", userSchema);

