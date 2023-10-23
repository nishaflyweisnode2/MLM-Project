const PrivacyPolicy = require('../Models/privacyPolicyModel');


const createPrivacyPolicy = async (req, res) => {
    try {
        const { content } = req.body;

        const privacyPolicy = new PrivacyPolicy({ content });
        const savedPrivacyPolicy = await privacyPolicy.save();

        res.status(201).json({
            message: 'Privacy Policy created successfully',
            data: savedPrivacyPolicy,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating Privacy Policy',
            error: error.message,
        });
    }
};

const getCurrentPrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicy = await PrivacyPolicy.findOne().sort('-createdAt');

        if (!privacyPolicy) {
            return res.status(404).json({
                message: 'Privacy Policy not found',
            });
        }

        res.status(200).json({
            message: 'Privacy Policy retrieved successfully',
            data: privacyPolicy,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving Privacy Policy',
            error: error.message,
        });
    }
};

const updatePrivacyPolicy = async (req, res) => {
    try {
        const { content } = req.body;

        const privacyPolicy = await PrivacyPolicy.findOne().sort('-createdAt');

        if (!privacyPolicy) {
            return res.status(404).json({
                message: 'Privacy Policy not found',
            });
        }

        privacyPolicy.content = content;
        const updatedPrivacyPolicy = await privacyPolicy.save();

        res.status(200).json({
            message: 'Privacy Policy updated successfully',
            data: updatedPrivacyPolicy,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating Privacy Policy',
            error: error.message,
        });
    }
};

const deletePrivacyPolicy = async (req, res) => {
    try {
        const deletedPrivacyPolicy = await PrivacyPolicy.deleteOne({});

        if (deletedPrivacyPolicy.deletedCount === 0) {
            return res.status(404).json({
                message: 'Privacy Policy not found',
            });
        }

        res.status(200).json({
            message: 'Privacy Policy deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting Privacy Policy',
            error: error.message,
        });
    }
};

module.exports = {
    createPrivacyPolicy,
    getCurrentPrivacyPolicy,
    updatePrivacyPolicy,
    deletePrivacyPolicy,
};
