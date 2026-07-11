const { query } = require("../database/query");

class UserModel {

    async findByEmail(email) {

        const sql = `
            SELECT *
            FROM users
            WHERE email = ?
            LIMIT 1
        `;

        const users = await query(sql, [email]);

        return users[0] || null;
    }

    async findByphone(phone){
        const sql=`
        SELECT*
        FROM users
        WHERE phone=?
        LIMIT 1
        
        `;
        const user=await query(sql,[phone]);
        return user [0] || null;
    }

}

module.exports = new UserModel();