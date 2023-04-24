const pool = require('../config/db');
const typesRepository = require('../repositories/typesRepository');

exports.getAllTypes = async (req, res) => {
    try {
        const types = await typesRepository.getAllTypes();
        res.status(200).send(types[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}


exports.getNestedTypes = async (req, res) => {
    try {
        const types = await typesRepository.getNestedTypes();
        res.status(200).send(types);
    } catch (error) {
        res.status(500).send('Server error');
    }

}

