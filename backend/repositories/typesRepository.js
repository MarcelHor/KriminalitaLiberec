const pool = require('../config/db');

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