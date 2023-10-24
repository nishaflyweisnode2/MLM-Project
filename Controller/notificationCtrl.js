const Notification = require('../Models/notificationModel');


const createNotification = async (req, res) => {
    try {
        const { recipient, content } = req.body;

        const notification = new Notification({ recipient, content });
        await notification.save();

        res.status(201).json({ message: 'Notification created successfully', data: notification });
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification', error: error.message });
    }
};

const markNotificationAsRead = async (req, res) => {
    try {
        const notificationId = req.params.notificationId;

        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { status: 'read' },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification marked as read', data: notification });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as read', error: error.message });
    }
};

const getNotificationsForUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const notifications = await Notification.find({ recipient: userId });

        res.status(200).json({ message: 'Notifications retrieved successfully', data: notifications });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notifications', error: error.message });
    }
};

module.exports = {
    createNotification,
    markNotificationAsRead,
    getNotificationsForUser,
};
