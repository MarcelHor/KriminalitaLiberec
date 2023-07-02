const filtersRepository = require('../repositories/filtersRepository');


exports.getFilters = async (req, res) => {
    try {
        const filters = await filtersRepository.getFilters();
        res.status(200).json(filters[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.postFilter = async (req, res) => {
    try {
        const filter = await filtersRepository.postFilter(req.body.name, req.body.description, req.body.selectedCrimes, req.body.selectedStates, req.body.timeRange, req.body.dateRange);
        res.status(200).json("Filter added successfully");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

