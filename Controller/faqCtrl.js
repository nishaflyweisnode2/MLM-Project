const FAQ = require('../Models/faqModel');

// Create a new FAQ
const createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;

        const faq = new FAQ({
            question,
            answer,
        });

        const savedFAQ = await faq.save();

        res.status(201).json({
            message: 'FAQ created successfully',
            data: savedFAQ,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating FAQ',
            error: error.message,
        });
    }
};

const getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();

        res.status(200).json({
            message: 'All FAQs retrieved successfully',
            data: faqs,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving FAQs',
            error: error.message,
        });
    }
};


const updateFAQ = async (req, res) => {
    try {
        const faqId = req.params.id;
        const { question, answer } = req.body;

        const updatedFAQ = await FAQ.findByIdAndUpdate(faqId, { question, answer }, { new: true });

        if (!updatedFAQ) {
            return res.status(404).json({
                message: 'FAQ not found',
            });
        }

        res.status(200).json({
            message: 'FAQ updated successfully',
            data: updatedFAQ,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating FAQ',
            error: error.message,
        });
    }
};


const deleteFAQ = async (req, res) => {
    try {
        const faqId = req.params.id;

        const deletedFAQ = await FAQ.findByIdAndRemove(faqId);

        if (!deletedFAQ) {
            return res.status(404).json({
                message: 'FAQ not found',
            });
        }

        res.status(200).json({
            message: 'FAQ deleted successfully',
            data: deletedFAQ,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting FAQ',
            error: error.message,
        });
    }
};


module.exports = {
    createFAQ,
    getAllFAQs,
    updateFAQ,
    deleteFAQ
};
