const locationsRepository = require('../repositories/locationsRepository');

exports.getLocationsByDateRangeSkeleton = async (req, res) => {
    try {
        const data = await locationsRepository.getLocationsByDateRange(req.params.dateFrom, req.params.dateTo);
        res.send(data[0]);
    } catch (error) {
        res.status(500).send('Server error');
    }

}

exports.getLocationsOnClick = async (req, res) => {
    try {
        const data = await locationsRepository.getLocationsOnClick(req.params.ids);
        res.send(data[0]);
    } catch (error) {
        res.status(500).send('Server error');
    }
}



