const Chat = require('../Models/chatModel');


const createChat = async (req, res) => {
    try {
        const { participants } = req.body;

        const chat = new Chat({ participants });
        await chat.save();

        res.status(201).json({ message: 'Chat created successfully', data: chat });
    } catch (error) {
        res.status(500).json({ message: 'Error creating chat', error: error.message });
    }
};


const sendMessage = async (req, res) => {
    try {
        const { sender, content } = req.body;
        const chatId = req.params.chatId;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        chat.messages.push({ sender, content });
        await chat.save();

        res.status(200).json({ message: 'Message sent successfully', data: chat });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
};



const getChatMessages = async (req, res) => {
    try {
        const chatId = req.params.chatId;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.status(200).json({ message: 'Chat messages retrieved successfully', data: chat.messages });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chat messages', error: error.message });
    }
};



module.exports = {
    createChat,
    sendMessage,
    getChatMessages,
};
