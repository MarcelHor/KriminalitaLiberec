const pool = require('../config/db');

exports.getFilters = async () => {
    return await pool.query('SELECT * FROM filters');
}

exports.postFilter = async (name, description, selectedCrimes, selectedStates, timeRange, dateRange, heatMap) => {
    return await pool.query('INSERT INTO filters (name, description, selectedCrimes, selectedStates, timeRange, dateRange, heatMap) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, description, selectedCrimes, selectedStates, timeRange, dateRange, heatMap]);
}

exports.deleteFilter = async (id) => {
    return await pool.query('DELETE FROM filters WHERE id = ?', [id]);
}