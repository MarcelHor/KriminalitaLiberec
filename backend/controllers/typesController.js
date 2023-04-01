const pool = require('../db');

const getAllTypes = async () => {
    const rows = await pool.query('select ifnull(t2.name, t1.name) as "crime_type",\n' +
        '       t1.label as "crime_type_parent1",\n' +
        '       t3.label as "crime_type_parent2",\n' +
        '       t4.label as "crime_type_parent3"\n' +
        'from crime_types t1\n' +
        '         left join crime_types t2 on t1.parent_id1 = t2.id\n' +
        '         left join crime_types t3 on t1.parent_id2 = t3.id\n' +
        '         left join crime_types t4 on t1.parent_id3 = t4.id\n' +
        'order by t1.id asc');
    return rows;
}


module.exports = {
    getAllTypes
}