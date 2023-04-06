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

const getNestedTypes = async () => {
    const rows = await pool.query('select ifnull(t2.name, t1.name) as "crime_type",\n' +
        '       t1.label as "crime_type_parent1",\n' +
        '       t3.label as "crime_type_parent2",\n' +
        '       t4.label as "crime_type_parent3"\n' +
        'from crime_types t1\n' +
        '         left join crime_types t2 on t1.parent_id1 = t2.id\n' +
        '         left join crime_types t3 on t1.parent_id2 = t3.id\n' +
        '         left join crime_types t4 on t1.parent_id3 = t4.id\n' +
        'order by t1.id asc');



    const nestedData = rows[0].reduce((acc, cur) => {
        let category = acc.find(item => item.name === cur.crime_type);
        if (!category) {
            category = {name: cur.crime_type, children: []};
            acc.push(category);
        }

        let parent2 = null;
        if (cur.crime_type_parent2) {
            let parent2Name = cur.crime_type_parent2;
            let parent1Name = cur.crime_type_parent1;
            let existingParent2 = category.children.find(item => item.name === parent2Name);
            if (existingParent2) {
                parent2 = existingParent2;
            } else {
                parent2 = {name: parent2Name, children: []};
                category.children.push(parent2);
            }

            let parent1 = parent2.children.find(item => item.name === parent1Name);
            if (!parent1) {
                parent1 = {name: parent1Name, children: []};
                parent2.children.push(parent1);
            }

            let parent3 = null;
            if (cur.crime_type_parent3) {
                let parent3Name = cur.crime_type_parent3;
                parent3 = parent1.children.find(item => item.name === parent3Name);
                if (!parent3) {
                    parent3 = {name: parent3Name, children: []};
                    parent1.children.push(parent3);
                }
            }

            parent2 = parent3 || parent1;
        }

        if (!parent2) {
            let parent1 = category.children.find(item => item.name === cur.crime_type_parent1);
            if (!parent1) {
                parent1 = {name: cur.crime_type_parent1, children: []};
                category.children.push(parent1);
            }

            let parent3 = null;
            if (cur.crime_type_parent3) {
                let parent3Name = cur.crime_type_parent3;
                parent3 = parent1.children.find(item => item.name === parent3Name);
                if (!parent3) {
                    parent3 = {name: parent3Name, children: []};
                    parent1.children.push(parent3);
                }
            }

            parent2 = parent3 || parent1;
        }

        return acc;
    }, []);

    return nestedData;
}


module.exports = {
    getAllTypes
    , getNestedTypes
}