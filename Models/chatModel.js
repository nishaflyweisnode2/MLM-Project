const mongoose = require('mongoose')
const oneToOneChat = mongoose.Schema({

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  messages: [
    {
      receiverId: {
        type: String
      },
      senderId: {
        type: String
      },
      message: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }
  ],


}, { timestamps: true })


module.exports = mongoose.model("Chat", oneToOneChat);