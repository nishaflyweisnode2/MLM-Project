const Address = require('../Models/addressModel');
const mongoose = require('mongoose');
const User = require('../Models/distributorModel');



exports.createAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressData = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const address = new Address({
            userId,
            ...addressData,
        });

        await address.save();

        res.status(201).json({ status: 201, message: 'Address created successfully', data: address });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Error creating address', error: error.message });
    }
};


exports.updateAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.addressId;
        const addressData = req.body;


        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const address = await Address.findOne({ _id: addressId, userId });

        if (!address) {
            return res.status(404).json({ status: 404, message: 'Address not found' });
        }

        Object.assign(address, addressData);
        await address.save();

        res.status(200).json({ status: 200, message: 'Address updated successfully', data: address });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Error updating address', error: error.message });
    }
};


exports.getAddresses = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const addresses = await Address.find({ userId });

        res.status(200).json({ status: 200, message: 'Addresses retrieved successfully', data: addresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Error fetching addresses', error: error.message });
    }
};


exports.getAddressById = async (req, res) => {
    try {
        const addressId = req.params.addressId;

        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({ status: 404, message: 'Address not found' });
        }

        return res.status(200).json({ status: 200, message: 'Address retrieved successfully', data: address });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Error fetching address', error: error.message });
    }
};


exports.deleteAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.addressId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const address = await Address.findOneAndDelete({ _id: addressId, userId });

        if (!address) {
            return res.status(404).json({ status: 404, message: 'Address not found' });
        }

        res.status(200).json({ status: 200, message: 'Address deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Error deleting address', error: error.message });
    }
};



