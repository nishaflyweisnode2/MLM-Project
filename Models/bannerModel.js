const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
