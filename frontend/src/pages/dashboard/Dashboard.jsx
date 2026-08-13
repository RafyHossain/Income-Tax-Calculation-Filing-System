import { useEffect, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import FinancialService from "@/services/financialService";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [
        summaryResponse,
        incomeResponse,
        expenseResponse,
      ] = await Promise.all([
        FinancialService.getFinancialSummary(),
        FinancialService.getIncome(),
        FinancialService.getExpense(),
      ]);

      setSummary(summaryResponse.data);
      setIncomes(incomeResponse.data);
      setExpenses(expenseResponse.data);
    } catch (error) {
      console.error(
        "Dashboard Data Fetch Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h2 className="text-3xl font-bold">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-600">
          Welcome to your Income Tax Dashboard.
        </p>
      </div>

      {/* Financial Summary */}

      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Income */}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-sans text-lg font-semibold tracking-normal normal-case">
                Total Income
              </CardTitle>

              <ArrowUpCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              BDT{" "}
              {Number(
                summary.totalIncome
              ).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Total Expense */}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-sans text-lg font-semibold tracking-normal normal-case">
                Total Expense
              </CardTitle>

              <ArrowDownCircle className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              BDT{" "}
              {Number(
                summary.totalExpense
              ).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Net Balance */}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-sans text-lg font-semibold tracking-normal normal-case">
                Net Balance
              </CardTitle>

              <Wallet className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              BDT{" "}
              {Number(
                summary.netBalance
              ).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Income & Expense */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Income */}

        <Card>
          <CardHeader>
            <CardTitle className="font-sans text-lg font-semibold tracking-normal normal-case">
              Recent Income
            </CardTitle>
          </CardHeader>

          <CardContent>
            {incomes.length === 0 ? (
              <p className="text-sm text-slate-500">
                No income records found.
              </p>
            ) : (
              <div className="space-y-4">
                {incomes.slice(0, 5).map((income) => (
                  <div
                    key={income.id}
                    className="flex items-center justify-between border-b pb-3 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">
                        {income.source_name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {income.income_type}
                      </p>
                    </div>

                    <p className="font-semibold text-green-600">
                      + BDT{" "}
                      {Number(
                        income.amount
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Expenses */}

        <Card>
          <CardHeader>
            <CardTitle className="font-sans text-lg font-semibold tracking-normal normal-case">
              Recent Expenses
            </CardTitle>
          </CardHeader>

          <CardContent>
            {expenses.length === 0 ? (
              <p className="text-sm text-slate-500">
                No expense records found.
              </p>
            ) : (
              <div className="space-y-4">
                {expenses.slice(0, 5).map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between border-b pb-3 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">
                        {expense.expense_type}
                      </p>

                      <p className="text-sm text-slate-500">
                        {expense.expense_date}
                      </p>
                    </div>

                    <p className="font-semibold text-red-600">
                      - BDT{" "}
                      {Number(
                        expense.amount
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;