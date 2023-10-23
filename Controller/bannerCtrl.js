const Banner = require('../Models/bannerModel');


const createBanner = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ status: 400, error: "Image file is required" });
        }

        const banner = new Banner({ name, image: req.file.path, description });
        await banner.save();

        res.status(201).json({
            message: 'Banner created successfully',
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating banner',
            error: error.message,
        });
    }
};

const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({
            message: 'All banners retrieved successfully',
            data: banners,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving banners',
            error: error.message,
        });
    }
};

const getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({
                message: 'Banner not found',
            });
        }
        res.status(200).json({
            message: 'Banner retrieved successfully',
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving banner',
            error: error.message,
        });
    }
};

const updateBanner = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const { name, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ status: 400, error: "Image file is required" });
        }

        const updatedBanner = await Banner.findByIdAndUpdate(
            bannerId,
            { name, image: req.file.path, description },
            { new: true }
        );

        if (!updatedBanner) {
            return res.status(404).json({
                message: 'Banner not found',
            });
        }

        res.status(200).json({
            message: 'Banner updated successfully',
            data: updatedBanner,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating banner',
            error: error.message,
        });
    }
};

const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndRemove(req.params.id);
        if (!banner) {
            return res.status(404).json({
                message: 'Banner not found',
            });
        }
        res.status(200).json({
            message: 'Banner deleted successfully',
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting banner',
            error: error.message,
        });
    }
};

module.exports = {
    createBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
};
