const express = require("express");
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionController");

//router object
const router = express.Router();

// routes
// add transaction
router.post('/add-transaction', addTransaction);

// get all transactions
router.post('/get-transaction', getAllTransaction);

// edit transactions
router.post('/edit-transaction', editTransaction);

// delete transactions
router.post('/delete-transaction', deleteTransaction);

module.exports = router;
