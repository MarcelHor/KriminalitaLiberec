const pool = require("../config/db");

exports.getAllStates = async () => {
    return await pool.query('select * from states');
}