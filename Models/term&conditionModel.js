const mongoose = require('mongoose');

const termsAndConditionsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('TermsAndConditions', termsAndConditionsSchema);
