const pool = require('../db');

const getAllTypes = async () => {
    const rows = await pool.query('SELECT IF(t2.label IS NULL, t1.name, t1.label) AS crime_type, t2.name, t3.label, t4.label\n' +
        'FROM crime_types t1\n' +
        '         LEFT JOIN crime_types t2 ON t1.parent_id1 = t2.id\n' +
        '         LEFT JOIN crime_types t3 ON t1.parent_id2 = t3.id\n' +
        '         LEFT JOIN crime_types t4 ON t1.parent_id3 = t4.id');
    return rows;
}

module.exports = {
    getAllTypes
}