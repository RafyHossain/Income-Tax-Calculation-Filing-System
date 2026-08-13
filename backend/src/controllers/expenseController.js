const ExpenseModel = require("../models/ExpenseModel");

const ExpenseController = {
  async createExpense(req, res) {
    try {
      const { expense_type, description, amount, expense_date } = req.body;

      if (!expense_type || !amount || !expense_date) {
        return res.status(400).json({
          success: false,
          message: "Expense type, amount and expense date are required",
        });
      }

      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be greater than 0",
        });
      }

      const user_id = req.user.id;

      const expenseData = {
        user_id,
        expense_type,
        description,
        amount,
        expense_date,
      };

      const result = await ExpenseModel.create(expenseData);

      return res.status(201).json({
        success: true,
        message: "Expense created successfully",
        data: {
          id: result.insertId,
          user_id,
          expense_type,
          description,
          amount,
          expense_date,
        },
      });
    } catch (error) {
      console.error("Create Expense Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  async getMyExpense(req, res) {
    try {
      const userId = req.user.id;

      const expenses = await ExpenseModel.findByUserId(userId);

      return res.status(200).json({
        success: true,
        message: "Expenses fetched successfully",
        data: expenses,
      });
    } catch (error) {
      console.error("Get My Expense Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  async getExpenseById(req, res) {
    try {
      const expenseId = req.params.id;

      const userId = req.user.id;

      const expense = await ExpenseModel.findById(expenseId);

      if (!expense) {
        return res.status(404).json({
          success: false,
          message: "Expense not found",
        });
      }

      if (expense.user_id !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this expense",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Expense fetched successfully",
        data: expense,
      });
    } catch (error) {
      console.error("Get Expense By ID Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  async updateExpense(req, res) {
    try {
      const expenseId = req.params.id;

      const userId = req.user.id;

      const { expense_type, description, amount, expense_date } = req.body;

      const expense = await ExpenseModel.findById(expenseId);

      if (!expense) {
        return res.status(404).json({
          success: false,
          message: "Expense not found",
        });
      }

      if (expense.user_id !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this expense",
        });
      }

      if (!expense_type || !amount || !expense_date) {
        return res.status(400).json({
          success: false,
          message: "Expense type, amount and expense date are required",
        });
      }

      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be greater than 0",
        });
      }

      const expenseData = {
        expense_type,
        description,
        amount,
        expense_date,
      };

      const result = await ExpenseModel.update(expenseId, expenseData);

      return res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: {
          id: expenseId,
          expense_type,
          description,
          amount,
          expense_date,
        },
      });
    } catch (error) {
      console.error("Update Expense Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  async deleteExpense(req, res) {
    try {
      const expenseId = req.params.id;

      const userId = req.user.id;

      const expense = await ExpenseModel.findById(expenseId);

      if (!expense) {
        return res.status(404).json({
          success: false,
          message: "Expense not found",
        });
      }

      if (expense.user_id !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this expense",
        });
      }

      const result = await ExpenseModel.delete(expenseId);

      return res.status(200).json({
        success: true,
        message: "Expense deleted successfully",
      });
    } catch (error) {
      console.error("Delete Expense Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

module.exports = ExpenseController;
