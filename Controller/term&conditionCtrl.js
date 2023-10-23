const TermsAndConditions = require('../Models/term&conditionModel');

const createTermsAndConditions = async (req, res) => {
    try {
        const { content } = req.body;

        const termsAndConditions = new TermsAndConditions({ content });
        const savedTermsAndConditions = await termsAndConditions.save();

        res.status(201).json({
            message: 'Terms & Conditions content created successfully',
            data: savedTermsAndConditions,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating Terms & Conditions content',
            error: error.message,
        });
    }
};

const getCurrentTermsAndConditions = async (req, res) => {
    try {
        const termsAndConditions = await TermsAndConditions.findOne().sort('-createdAt');

        if (!termsAndConditions) {
            return res.status(404).json({
                message: 'Terms & Conditions content not found',
            });
        }

        res.status(200).json({
            message: 'Terms & Conditions content retrieved successfully',
            data: termsAndConditions,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving Terms & Conditions content',
            error: error.message,
        });
    }
};

const updateTermsAndConditions = async (req, res) => {
    try {
        const { content } = req.body;

        const termsAndConditions = await TermsAndConditions.findOne().sort('-createdAt');

        if (!termsAndConditions) {
            return res.status(404).json({
                message: 'Terms & Conditions content not found',
            });
        }

        termsAndConditions.content = content;
        const updatedTermsAndConditions = await termsAndConditions.save();

        res.status(200).json({
            message: 'Terms & Conditions content updated successfully',
            data: updatedTermsAndConditions,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating Terms & Conditions content',
            error: error.message,
        });
    }
};

const deleteTermsAndConditions = async (req, res) => {
    try {
        const deletedTermsAndConditions = await TermsAndConditions.deleteOne({});

        if (deletedTermsAndConditions.deletedCount === 0) {
            return res.status(404).json({
                message: 'Terms & Conditions content not found',
            });
        }

        res.status(200).json({
            message: 'Terms & Conditions content deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting Terms & Conditions content',
            error: error.message,
        });
    }
};

module.exports = {
    createTermsAndConditions,
    getCurrentTermsAndConditions,
    updateTermsAndConditions,
    deleteTermsAndConditions,
};
