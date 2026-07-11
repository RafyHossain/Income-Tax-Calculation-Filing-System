//Query Helper
const pool=require("./connection");

const query=async(sql,params=[])=>{
    const [rows]=await pool.execute(sql,params);
    return rows;
};

module.exports={query};