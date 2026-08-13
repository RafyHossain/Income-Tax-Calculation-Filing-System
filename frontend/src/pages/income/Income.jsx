import { useEffect, useState } from "react";
import { Plus, X, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import IncomeService from "@/services/incomeService";

const incomeTypes = [
  "Employment",
  "Rent",
  "Agriculture",
  "Business",
  "Capital Gains",
  "Financial Assets",
  "Other Sources",
];

const initialFormData = {
  income_type: "",
  source_name: "",
  amount: "",
  income_date: "",
  description: "",
};

const Income = () => {
  const [incomes, setIncomes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [deletingIncomeId, setDeletingIncomeId] = useState(null);

  const [editingIncomeId, setEditingIncomeId] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  const fetchIncome = async () => {
    try {
      const response = await IncomeService.getMyIncome();

      setIncomes(response.data);
    } catch (error) {
      console.error("Get Income Error:", error);

      toast.error(error.response?.data?.message || "Failed to fetch income");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchIncome();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleEditIncome = (income) => {
    setEditingIncomeId(income.id);

    setFormData({
      income_type: income.income_type,
      source_name: income.source_name,
      amount: income.amount,
      income_date: income.income_date,
      description: income.description || "",
    });

    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);

    setEditingIncomeId(null);

    setFormData(initialFormData);
  };

  const handleSubmitIncome = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      if (editingIncomeId) {
        await IncomeService.updateIncome(editingIncomeId, formData);

        toast.success("Income updated successfully");
      } else {
        await IncomeService.createIncome(formData);

        toast.success("Income created successfully");
      }

      setFormData(initialFormData);

      setEditingIncomeId(null);

      setShowForm(false);

      await fetchIncome();
    } catch (error) {
      console.error("Income Submit Error:", error);

      toast.error(error.response?.data?.message || "Failed to save income");
    } finally {
      setSubmitting(false);
    }
  };

const handleDeleteIncome = (incomeId) => {
  toast(
    (t) => (
      <div className="w-[320px]">
        <p className="font-semibold text-slate-900">
          Delete Income?
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Are you sure you want to delete this income?
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="rounded-lg border px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={async () => {
              toast.dismiss(t.id);

              try {
                setDeletingIncomeId(incomeId);

                await IncomeService.deleteIncome(
                  incomeId
                );

                toast.success(
                  "Income deleted successfully"
                );

                await fetchIncome();
              } catch (error) {
                console.error(
                  "Delete Income Error:",
                  error
                );

                toast.error(
                  error.response?.data?.message ||
                    "Failed to delete income"
                );
              } finally {
                setDeletingIncomeId(null);
              }
            }}
            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
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
        <p className="text-slate-500">Loading income...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Income</h2>

          <p className="mt-2 text-slate-600">Manage your income records.</p>
        </div>

        <button
          type="button"
          onClick={showForm ? handleCloseForm : () => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}

          {showForm ? "Close" : "Add Income"}
        </button>
      </div>

      {/* Income Form */}

      {showForm && (
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-6 text-xl font-semibold">
            {editingIncomeId ? "Edit Income" : "Add Income"}
          </h3>

          <form onSubmit={handleSubmitIncome} className="space-y-5">
            {/* Income Type */}

            <div>
              <label
                htmlFor="income_type"
                className="mb-2 block text-sm font-medium"
              >
                Income Type
              </label>

              <select
                id="income_type"
                name="income_type"
                value={formData.income_type}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-300"
              >
                <option value="">Select income type</option>

                {incomeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Source Name */}

            <div>
              <label
                htmlFor="source_name"
                className="mb-2 block text-sm font-medium"
              >
                Source Name
              </label>

              <input
                id="source_name"
                name="source_name"
                type="text"
                value={formData.source_name}
                onChange={handleChange}
                placeholder="e.g. ABC Company"
                required
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
                placeholder="e.g. 60000"
                required
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            {/* Income Date */}

            <div>
              <label
                htmlFor="income_date"
                className="mb-2 block text-sm font-medium"
              >
                Income Date
              </label>

              <input
                id="income_date"
                name="income_date"
                type="date"
                value={formData.income_date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            {/* Description */}

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Optional description"
                rows="3"
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            {/* Form Buttons */}

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
                  : editingIncomeId
                    ? "Update Income"
                    : "Save Income"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Income Table */}

      <div className="rounded-lg border">
        {incomes.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-slate-500">No income records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50 text-left">
                  {/* Serial */}

                  <th className="px-6 py-4">SL</th>

                  <th className="px-6 py-4">Type</th>

                  <th className="px-6 py-4">Source</th>

                  <th className="px-6 py-4">Amount</th>

                  <th className="px-6 py-4">Date</th>

                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {incomes.map((income, index) => (
                  <tr key={income.id} className="border-b last:border-b-0">
                    {/* Serial */}

                    <td className="px-6 py-4 text-slate-500">{index + 1}</td>

                    {/* Type */}

                    <td className="px-6 py-4">{income.income_type}</td>

                    {/* Source */}

                    <td className="px-6 py-4">{income.source_name}</td>

                    {/* Amount */}

                    <td className="px-6 py-4 font-medium">
                      BDT {Number(income.amount).toLocaleString()}
                    </td>

                    {/* Date */}

                    <td className="px-6 py-4">{income.income_date}</td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit */}

                        <button
                          type="button"
                          onClick={() => handleEditIncome(income)}
                          title="Edit income"
                          aria-label="Edit income"
                          disabled={deletingIncomeId !== null}
                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() => handleDeleteIncome(income.id)}
                          title="Delete income"
                          aria-label="Delete income"
                          disabled={deletingIncomeId === income.id}
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Income;
