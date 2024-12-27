const { Account } = require("../models/db");

const mongoose = require("mongoose");

// Get account balance
const balance = async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ msg: "Account not found" });
    }
    res.json({ balance: account.balance });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

// Transfer funds
const transfer = async (req, res) => {
  const { amount, to } = req.body;

  try {
    // Sender's account
    const senderAccount = await Account.findOne({ userId: req.userId });
    if (!senderAccount) {
      return res.status(400).json({ msg: "Sender account not found" });
    }

    // Check if sender has sufficient balance
    if (senderAccount.balance < amount) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    // Deduct amount from sender's account
    senderAccount.balance -= amount;
    await senderAccount.save(); // Save the updated sender account

    // Add amount to recipient's account
    const recipientAccount = await Account.findOne({ userId: to });
    if (!recipientAccount) {
      return res.status(400).json({ msg: "Recipient account not found" });
    }

    recipientAccount.balance += amount;
    await recipientAccount.save(); // Save the updated recipient account

    res.status(200).json({ msg: "Transfer successful" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
module.exports = { balance, transfer };
