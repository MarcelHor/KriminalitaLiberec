const statesRepository = require('../repositories/statesRepository');

exports.getAllStates = async (req, res) => {
    try {
        const states = await statesRepository.getAllStates();
        res.status(200).json(states[0]);
    } catch (err) {
        res.status(500).json('Server Error');
    }
}
