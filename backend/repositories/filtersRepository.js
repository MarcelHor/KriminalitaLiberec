const pool = require('../config/db');

exports.getFilters = async () => {
    return await pool.query('SELECT * FROM filters');
}

exports.postFilter = async (name, description, selectedCrimes, selectedStates, timeRange, dateRange) => {
    return await pool.query('INSERT INTO filters (name, description, selectedCrimes, selectedStates, timeRange, dateRange) VALUES (?, ?, ?, ?, ?, ?)', [name, description, selectedCrimes, selectedStates, timeRange, dateRange]);
}