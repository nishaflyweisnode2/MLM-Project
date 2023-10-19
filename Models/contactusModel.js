const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;
