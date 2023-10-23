const Wallet = require("../Models/WalletModel");
const User = require("../Models/distributorModel");



const createWallet = async (req, res) => {
  try {
    const userId = req.params.userId;
    const amountToAdd = req.body.amount;

    if (!userId || !amountToAdd || isNaN(amountToAdd) || amountToAdd <= 0) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(400).json({ status: 400, message: "User not found" });
    }

    const wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
      const newWallet = new Wallet({
        user: userId,
        amount: amountToAdd,
        transactions: [
          {
            amount: amountToAdd,
          },
        ],
      });

      await newWallet.save();

      return res.status(200).json({ message: "Wallet created successfully", wallet: newWallet });
    } else {
      wallet.amount += amountToAdd;
      wallet.transactions.push({
        amount: amountToAdd,
      });

      await wallet.save();

      return res.status(200).json({ message: "Funds added to the wallet successfully", wallet });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};




const getWallet = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const wallet = await Wallet.findOne({ user: userId }).populate('user');

    if (!wallet) {
      return res.status(404).json({ status: 404, message: "Wallet not found" });
    }

    return res.status(200).json({ status: 200, message: "Wallet retrieved successfully", data: wallet });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



const getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find();

    return res.status(200).json({ status: 200, message: "All wallets retrieved successfully", data: wallets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



const getWalletTransactionsByDate = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;

    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const isoStartDate = convertToISODate(startDate);
    const isoEndDate = convertToISODate(endDate);

    const wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
      return res.status(404).json({ status: 404, message: "Wallet not found" });
    }

    const filteredTransactions = wallet.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= new Date(isoStartDate) && transactionDate <= new Date(isoEndDate);
    });

    return res.status(200).json({ status: 200, message: "Transactions retrieved successfully", data: filteredTransactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

function convertToISODate(dateString) {
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}T00:00:00.000Z`;
}










module.exports = {
  createWallet,
  getWallet,
  getAllWallets,
  getWalletTransactionsByDate
}