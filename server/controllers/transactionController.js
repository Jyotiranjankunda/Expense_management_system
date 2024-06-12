const transactionModel = require("../models/transactionModel.js");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, userid, type } = req.body;
    let query = { userid };

    if (frequency && frequency != "all" && frequency !== "") {
      query.date = {
        $gt: moment().subtract(Number(frequency), 'd').toDate(),
      };
    }

    if (type !== "all") {
      query.type = type
    }

    const transactions = await transactionModel.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload);

    res.status(200).send("Updated successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({
      _id: req.body.transactionId
    });
    res.status(200).send("Transaction deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = { getAllTransaction, addTransaction, editTransaction, deleteTransaction }