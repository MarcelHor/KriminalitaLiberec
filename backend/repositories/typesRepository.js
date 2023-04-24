const pool = require('../config/db');

exports.getAllTypes = async () => {
    return await pool.query('select ifnull(t2.id, t1.id)     as "crime_type_id",\n' + 'ifnull(t2.name, t1.name) as "crime_type_name",\n' + 't1.id as "crime_type_parent1_id",\n' + 't1.labelas "crime_type_parent1",\n' + ' t3.idas "crime_type_parent_id",\n' + 't3.label as "crime_type_parent",\n' + 't4.id as "crime_type_sub_children_id",\n' + 't4.label as "crime_type_sub_children"\n' + 'from crime_types t1\n' + 'left join crime_types t2 on t1.parent_id1 = t2.id\n' + 'left join crime_types t3 on t1.parent_id2 = t3.id\n' + 'left join crime_types t4 on t1.parent_id3 = t4.id\n' + 'order by t1.id asc;\n');
}

exports.getNestedTypes = async () => {
    const data = await pool.query('select * from crime_types');

    const rows = data[0]

    // structure the data for react-checkbox-tree
    const nodes = [];
    const map = new Map();
    for (const row of rows) {
        map.set(row.id, {value: row.id, label: row.label, children: []});
    }
    for (const row of rows) {
        if (row.parent_id1 && !row.parent_id2 && !row.parent_id3) {
            map.get(row.parent_id1).children.push(map.get(row.id));
        }
        if (row.parent_id2 && !row.parent_id3) {
            map.get(row.parent_id2).children.push(map.get(row.id));
        }
        if (row.parent_id3) {
            map.get(row.parent_id3).children.push(map.get(row.id));
        }
        if (!row.parent_id1 && !row.parent_id2 && !row.parent_id3) {
            nodes.push(map.get(row.id));
        }
    }
    return nodes;
}