const ContactUs = require('./contactUsModel');

const createContactUs = async (req, res) => {
  try {
    const { phone, email, whatsapp } = req.body;

    const contact = new ContactUs({ phone, email, whatsapp });
    await contact.save();

    res.status(201).json({
      message: "Contact information added successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating contact information",
      error: error.message,
    });
  }
};


const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactUs.find();
    res.status(200).json({
      message: "All contact information retrieved successfully",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving contact information",
      error: error.message,
    });
  }
};


const getContactById = async (req, res) => {
  try {
    const contact = await ContactUs.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        message: "Contact information not found",
      });
    }
    res.status(200).json({
      message: "Contact information retrieved successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving contact information",
      error: error.message,
    });
  }
};


const deleteContact = async (req, res) => {
  try {
    const contact = await ContactUs.findByIdAndRemove(req.params.id);
    if (!contact) {
      return res.status(404).json({
        message: "Contact information not found",
      });
    }
    res.status(200).json({
      message: "Contact information deleted successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting contact information",
      error: error.message,
    });
  }
};




module.exports = {
  createContactUs,
  getAllContacts,
  getContactById,
  deleteContact,
};






module.exports = {
  createContactUs,
};
