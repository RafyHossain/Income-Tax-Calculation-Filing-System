import { useEffect, useState } from "react";
import {
  Plus,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import ExpenseService from "@/services/expenseService";

const expenseTypes = [
  "Food",
  "Housing",
  "Transportation",
  "Education",
  "Medical",
  "Utility",
  "Business",
  "Other",
];

const initialFormData = {
  expense_type: "",
  description: "",
  amount: "",
  expense_date: "",
};

const Expense = () => {
  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [editingExpenseId, setEditingExpenseId] =
    useState(null);

  const [deletingExpenseId, setDeletingExpenseId] =
    useState(null);

  const [formData, setFormData] =
    useState(initialFormData);

  const fetchExpense = async () => {
    try {
      const response =
        await ExpenseService.getMyExpense();

      setExpenses(response.data);
    } catch (error) {
      console.error(
        "Get Expense Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch expenses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExpense();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleEditExpense = (expense) => {
    setEditingExpenseId(expense.id);

    setFormData({
      expense_type: expense.expense_type,
      description: expense.description || "",
      amount: expense.amount,
      expense_date: expense.expense_date,
    });

    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);

    setEditingExpenseId(null);

    setFormData(initialFormData);
  };

  const handleSubmitExpense = async (event) => {
    event.preventDefault();

    if (
      !formData.expense_type ||
      !formData.amount ||
      !formData.expense_date
    ) {
      toast.error(
        "Expense type, amount and expense date are required"
      );

      return;
    }

    if (Number(formData.amount) <= 0) {
      toast.error(
        "Amount must be greater than 0"
      );

      return;
    }

    try {
      setSubmitting(true);

      if (editingExpenseId) {
        await ExpenseService.updateExpense(
          editingExpenseId,
          formData
        );

        toast.success(
          "Expense updated successfully"
        );
      } else {
        await ExpenseService.createExpense(
          formData
        );

        toast.success(
          "Expense created successfully"
        );
      }

      setFormData(initialFormData);

      setEditingExpenseId(null);

      setShowForm(false);

      await fetchExpense();
    } catch (error) {
      console.error(
        "Expense Submit Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to save expense"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteExpense = (expenseId) => {
    toast(
      (t) => (
        <div className="w-[320px]">
          <p className="font-semibold text-slate-900">
            Delete Expense?
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Are you sure you want to delete
            this expense?
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() =>
                toast.dismiss(t.id)
              }
              className="rounded-lg border px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={async () => {
                toast.dismiss(t.id);

                try {
                  setDeletingExpenseId(
                    expenseId
                  );

                  await ExpenseService.deleteExpense(
                    expenseId
                  );

                  toast.success(
                    "Expense deleted successfully"
                  );

                  await fetchExpense();
                } catch (error) {
                  console.error(
                    "Delete Expense Error:",
                    error
                  );

                  toast.error(
                    error.response?.data
                      ?.message ||
                      "Failed to delete expense"
                  );
                } finally {
                  setDeletingExpenseId(null);
                }
              }}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">
          Loading expenses...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold">
            Expense
          </h2>

          <p className="mt-2 text-slate-600">
            Manage your expense records.
          </p>
        </div>

        <button
          type="button"
          onClick={
            showForm
              ? handleCloseForm
              : () => setShowForm(true)
          }
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {showForm ? (
            <X className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}

          {showForm
            ? "Close"
            : "Add Expense"}
        </button>

      </div>


      {/* Expense Form */}

      {showForm && (
        <div className="rounded-lg border bg-white p-6">

          <h3 className="mb-6 text-xl font-semibold">
            {editingExpenseId
              ? "Edit Expense"
              : "Add Expense"}
          </h3>

          <form
            onSubmit={handleSubmitExpense}
            className="space-y-5"
          >

            {/* Expense Type */}

            <div>
              <label
                htmlFor="expense_type"
                className="mb-2 block text-sm font-medium"
              >
                Expense Type
              </label>

              <select
                id="expense_type"
                name="expense_type"
                value={formData.expense_type}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-300"
              >
                <option value="">
                  Select expense type
                </option>

                {expenseTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>


            {/* Description */}

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. Monthly grocery"
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>


            {/* Amount */}

            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium"
              >
                Amount
              </label>

              <input
                id="amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g. 5000"
                required
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>


            {/* Expense Date */}

            <div>
              <label
                htmlFor="expense_date"
                className="mb-2 block text-sm font-medium"
              >
                Expense Date
              </label>

              <input
                id="expense_date"
                name="expense_date"
                type="date"
                value={formData.expense_date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>


            {/* Buttons */}

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={handleCloseForm}
                disabled={submitting}
                className="rounded-lg border px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Saving..."
                  : editingExpenseId
                    ? "Update Expense"
                    : "Save Expense"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* Expense Table */}

      <div className="rounded-lg border">

        {expenses.length === 0 ? (

          <div className="p-6 text-center">

            <p className="text-slate-500">
              No expense records found.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b bg-slate-50 text-left">

                  <th className="px-6 py-4">
                    SL
                  </th>

                  <th className="px-6 py-4">
                    Type
                  </th>

                  <th className="px-6 py-4">
                    Description
                  </th>

                  <th className="px-6 py-4">
                    Amount
                  </th>

                  <th className="px-6 py-4">
                    Date
                  </th>

                  <th className="px-6 py-4 text-center">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {expenses.map(
                  (expense, index) => (

                    <tr
                      key={expense.id}
                      className="border-b last:border-b-0"
                    >

                      {/* Serial */}

                      <td className="px-6 py-4 text-slate-500">
                        {index + 1}
                      </td>


                      {/* Type */}

                      <td className="px-6 py-4">
                        {expense.expense_type}
                      </td>


                      {/* Description */}

                      <td className="px-6 py-4">
                        {expense.description ||
                          "-"}
                      </td>


                      {/* Amount */}

                      <td className="px-6 py-4 font-medium text-red-600">
                        BDT{" "}
                        {Number(
                          expense.amount
                        ).toLocaleString()}
                      </td>


                      {/* Date */}

                      <td className="px-6 py-4">
                        {expense.expense_date}
                      </td>


                      {/* Actions */}

                      <td className="px-6 py-4">

                        <div className="flex items-center justify-center gap-2">

                          {/* Edit */}

                          <button
                            type="button"
                            onClick={() =>
                              handleEditExpense(
                                expense
                              )
                            }
                            title="Edit expense"
                            aria-label="Edit expense"
                            disabled={
                              deletingExpenseId !==
                              null
                            }
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>


                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteExpense(
                                expense.id
                              )
                            }
                            title="Delete expense"
                            aria-label="Delete expense"
                            disabled={
                              deletingExpenseId ===
                              expense.id
                            }
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default Expense;