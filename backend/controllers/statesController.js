const pool= require('../db');

const getAllStates = async () => {
    const rows = await pool.query('select * from states');
    return rows[0];
}

module.exports = {
    getAllStates
}