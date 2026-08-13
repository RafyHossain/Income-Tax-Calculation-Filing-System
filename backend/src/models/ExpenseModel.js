const { query } = require("../database/query");

const ExpenseModel = {

    async create(expenseData) {

        const {
            user_id,
            expense_type,
            description,
            amount,
            expense_date,
        } = expenseData;

        const sql = `
            INSERT INTO expenses(
                user_id,
                expense_type,
                description,
                amount,
                expense_date
            )
            VALUES(
                ?,
                ?,
                ?,
                ?,
                ?
            )
        `;

        const result = await query(sql, [
            user_id,
            expense_type,
            description,
            amount,
            expense_date,
        ]);

        return result;
    },

    async findByUserId(userId) {

        const sql = `
            SELECT
                id,
                user_id,
                expense_type,
                description,
                amount,
                expense_date,
                created_at,
                updated_at
            FROM expenses
            WHERE user_id = ?
            ORDER BY expense_date DESC, id DESC
        `;

        const rows = await query(sql, [userId]);

        return rows;
    },

    async findById(expenseId) {

        const sql = `
            SELECT
                id,
                user_id,
                expense_type,
                description,
                amount,
                expense_date,
                created_at,
                updated_at
            FROM expenses
            WHERE id = ?
        `;

        const rows = await query(sql, [expenseId]);

        return rows[0];
    },

    async update(expenseId, expenseData) {

        const sql = `
            UPDATE expenses
            SET
                expense_type = ?,
                description = ?,
                amount = ?,
                expense_date = ?
            WHERE id = ?
        `;

        const result = await query(sql, [
            expenseData.expense_type,
            expenseData.description,
            expenseData.amount,
            expenseData.expense_date,
            expenseId,
        ]);

        return result;
    },

    async delete(expenseId) {

        const sql = `
            DELETE FROM expenses
            WHERE id = ?
        `;

        const result = await query(sql, [expenseId]);

        return result;
    },

    async getTotalByUserId(userId) {

    const sql = `
        SELECT
            COALESCE(SUM(amount), 0) AS total_expense
        FROM expenses
        WHERE user_id = ?
    `;

    const rows = await query(sql, [userId]);

    return rows[0];
},
};

module.exports = ExpenseModel;