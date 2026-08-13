import axiosPublic from "@/lib/axiosPublic";

const ExpenseService = {
  async getMyExpense() {
    const response = await axiosPublic.get("/expense");

    return response.data;
  },

  async createExpense(expenseData) {
    const response = await axiosPublic.post("/expense", expenseData);

    return response.data;
  },

  async updateExpense(expenseId, expenseData) {
    const response = await axiosPublic.put(
      `/expense/${expenseId}`,
      expenseData,
    );

    return response.data;
  },

  async deleteExpense(expenseId) {
    const response = await axiosPublic.delete(`/expense/${expenseId}`);

    return response.data;
  },
};

export default ExpenseService;
