const pool = require('../db');

const getAllData = async () => {
    const rows = await pool.query('SELECT crimes.x,\n' +
        '       crimes.y,\n' +
        '       crimes.date,\n' +
        '       r.label as "relevance",\n' +
        '       s.label as "state",\n' +
        '      ifnull(t2.name, t1.name) as "crime_type",\n' +
        '       t1.label as "crime_type_parent1",\n' +
        '       t3.label as "crime_type_parent2",\n' +
        '       t4.label as "crime_type_parent3"\n' +
        'FROM crimes\n' +
        '         INNER JOIN crime_types t1 ON crimes.crime_types_id = t1.id\n' +
        '         LEFT JOIN crime_types t2 ON t1.parent_id1 = t2.id\n' +
        '         LEFT JOIN crime_types t3 ON t1.parent_id2 = t3.id\n' +
        '         LEFT JOIN crime_types t4 ON t1.parent_id3 = t4.id\n' +
        '         INNER JOIN relevance r ON crimes.relevance_id = r.id\n' +
        '         INNER JOIN states s ON crimes.states_id = s.id\n' +
        'order by crimes.id asc');
    return rows;
}

const getDataByDateRange = async (dateFrom, dateTo) => {
    const rows = await pool.query('SELECT crimes.x,\n' +
        '       crimes.y,\n' +
        '       crimes.date,\n' +
        '       r.label as "relevance",\n' +
        '       s.label as "state",\n' +
        '      ifnull(t2.name, t1.name) as "crime_type",\n' +
        '       t1.label as "crime_type_parent1",\n' +
        '       t3.label as "crime_type_parent2",\n' +
        '       t4.label as "crime_type_parent3"\n' +
        'FROM crimes\n' +
        '         INNER JOIN crime_types t1 ON crimes.crime_types_id = t1.id\n' +
        '         LEFT JOIN crime_types t2 ON t1.parent_id1 = t2.id\n' +
        '         LEFT JOIN crime_types t3 ON t1.parent_id2 = t3.id\n' +
        '         LEFT JOIN crime_types t4 ON t1.parent_id3 = t4.id\n' +
        '         INNER JOIN relevance r ON crimes.relevance_id = r.id\n' +
        '         INNER JOIN states s ON crimes.states_id = s.id\n' +
        'WHERE crimes.date BETWEEN ? AND ?\n' +
        'order by crimes.id asc', [dateFrom, dateTo]
    );
    return rows;
}


module.exports = {
    getAllData,
    getDataByDateRange
}


