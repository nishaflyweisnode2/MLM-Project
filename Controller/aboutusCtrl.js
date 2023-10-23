const AboutUs = require('../Models/aboutusModel');

const createAboutUs = async (req, res) => {
    try {
        const { content } = req.body;

        const aboutUs = new AboutUs({ content });
        const savedAboutUs = await aboutUs.save();

        res.status(201).json({
            message: 'About Us content created successfully',
            data: savedAboutUs,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating About Us content',
            error: error.message,
        });
    }
};

const getCurrentAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findOne().sort('-createdAt');

        if (!aboutUs) {
            return res.status(404).json({
                message: 'About Us content not found',
            });
        }

        res.status(200).json({
            message: 'About Us content retrieved successfully',
            data: aboutUs,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving About Us content',
            error: error.message,
        });
    }
};

const updateAboutUs = async (req, res) => {
    try {
        const { content } = req.body;

        const aboutUs = await AboutUs.findOne().sort('-createdAt');

        if (!aboutUs) {
            return res.status(404).json({
                message: 'About Us content not found',
            });
        }

        aboutUs.content = content;
        const updatedAboutUs = await aboutUs.save();

        res.status(200).json({
            message: 'About Us content updated successfully',
            data: updatedAboutUs,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating About Us content',
            error: error.message,
        });
    }
};


const deleteAboutUs = async (req, res) => {
    try {
        const deletedAboutUs = await AboutUs.deleteOne({});

        if (deletedAboutUs.deletedCount === 0) {
            return res.status(404).json({
                message: 'About Us content not found',
            });
        }

        res.status(200).json({
            message: 'About Us content deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting About Us content',
            error: error.message,
        });
    }
};

module.exports = {
    createAboutUs,
    getCurrentAboutUs,
    updateAboutUs,
    deleteAboutUs,
};
