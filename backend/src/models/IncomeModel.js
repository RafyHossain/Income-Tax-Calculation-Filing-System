const { query } = require("../database/query");

const IncomeModel = {
  async create(incomeData) {
    const {
      user_id,
      income_type,
      source_name,
      amount,
      income_date,
      description,
    } = incomeData;

    const sql = `
        INSERT INTO income(
        user_id,
        income_type,
        source_name,
        amount,
        income_date,
        description
        )
        VALUES(
        ?,          
        ?,
        ?,
        ?,
        ?,
        ?
        )
        `;

    const result = await query(sql, [
      user_id,
      income_type,
      source_name,
      amount,
      income_date,
      description,
    ]);

    return result;
  },

  async findByUserId(userId) {
    const sql = `
    SELECT
      id,
      user_id,
      income_type,
      source_name,
      amount,
      income_date,
      description,
      created_at,
      updated_at
    FROM income
    WHERE user_id = ?
    ORDER BY income_date DESC, id DESC
  `;

    const rows = await query(sql, [userId]);

    return rows;
  },

  async findById(incomeId) {
    const sql = `
        SELECT
            id,
            user_id,
            income_type,
            source_name,
            amount,
            income_date,
            description,
            created_at,
            updated_at
        FROM income
        WHERE id = ?
    `;

    const rows = await query(sql, [incomeId]);

    return rows[0];
  },

  async update(incomeId, incomeData) {
    const sql = `
        UPDATE income
        SET
            income_type = ?,
            source_name = ?,
            amount = ?,
            income_date = ?,
            description = ?
        WHERE id = ?
    `;

    const result = await query(sql, [
      incomeData.income_type,
      incomeData.source_name,
      incomeData.amount,
      incomeData.income_date,
      incomeData.description,
      incomeId,
    ]);

    return result;
  },

  async delete(incomeId) {
    const sql = `
        DELETE FROM income
        WHERE id = ?
    `;

    const result = await query(sql, [incomeId]);

    return result;
  },

  async getTotalByUserId(userId) {
    const sql = `
        SELECT
            COALESCE(SUM(amount), 0) AS total_income
        FROM income
        WHERE user_id = ?
    `;

    const rows = await query(sql, [userId]);

    return rows[0];
  },
};

module.exports = IncomeModel;
