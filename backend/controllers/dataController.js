const pool = require('../db');

const getAllData = async () => {
    const rows = await pool.query('SELECT crimes.x,\n' +
        '       crimes.y,\n' +
        '       crimes.date,\n' +
        '       r.label                                 AS relevance_name,\n' +
        '       s.label                                 AS state_name,\n' +
        '       IF(t2.label IS NULL, t1.name, t1.label) AS crime_type,\n' +
        '       t2.name                                 as crime_type2,\n' +
        '       t3.label                                as crime_type3,\n' +
        '       t4.label                                as crime_type4\n' +
        'FROM crimes\n' +
        '         INNER JOIN crime_types t1 ON crimes.crime_types_id = t1.id\n' +
        '         LEFT JOIN crime_types t2 ON t1.parent_id1 = t2.id\n' +
        '         LEFT JOIN crime_types t3 ON t1.parent_id2 = t3.id\n' +
        '         LEFT JOIN crime_types t4 ON t1.parent_id3 = t4.id\n' +
        '         INNER JOIN relevance r ON crimes.relevance_id = r.id\n' +
        '         INNER JOIN states s ON crimes.states_id = s.id\n' +
        'WHERE y >= 50.7205\n' +
        '  AND y <= 50.8125\n' +
        '  AND x >= 15.0000\n' +
        '  AND x <= 15.1283\n' +
        'order by crimes.id asc;');
    return rows;
}

const getDataByDateRange = async (dateFrom, dateTo) => {
    const rows = await pool.query('SELECT crimes.x,\n' +
        '       crimes.y,\n' +
        '       crimes.date,\n' +
        '       r.label                                 AS relevance_name,\n' +
        '       s.label                                 AS state_name,\n' +
        '       IF(t2.label IS NULL, t1.name, t1.label) AS crime_type,\n' +
        '       t2.name                                 as crime_type2,\n' +
        '       t3.label                                as crime_type3,\n' +
        '       t4.label                                as crime_type4\n' +
        'FROM crimes\n' +
        '         INNER JOIN crime_types t1 ON crimes.crime_types_id = t1.id\n' +
        '         LEFT JOIN crime_types t2 ON t1.parent_id1 = t2.id\n' +
        '         LEFT JOIN crime_types t3 ON t1.parent_id2 = t3.id\n' +
        '         LEFT JOIN crime_types t4 ON t1.parent_id3 = t4.id\n' +
        '         INNER JOIN relevance r ON crimes.relevance_id = r.id\n' +
        '         INNER JOIN states s ON crimes.states_id = s.id\n' +
        'WHERE y >= 50.7205\n' +
        '  AND y <= 50.8125\n' +
        '  AND x >= 15.0000\n' +
        '  AND x <= 15.1283\n' +
        '  AND crimes.date >= ?\n' +
        '  AND crimes.date <= ?\n' +
        'order by crimes.id asc;', [dateFrom, dateTo]);
    return rows;
}


module.exports = {
    getAllData,
    getDataByDateRange
}


