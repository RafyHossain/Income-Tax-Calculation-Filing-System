const express = require("express");

const router = express.Router();

const ExpenseController = require("../controllers/expenseController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, ExpenseController.createExpense);
router.get("/", verifyToken, ExpenseController.getMyExpense);
router.get("/:id", verifyToken, ExpenseController.getExpenseById);
router.put("/:id", verifyToken, ExpenseController.updateExpense);
router.delete("/:id", verifyToken, ExpenseController.deleteExpense);

module.exports = router;
