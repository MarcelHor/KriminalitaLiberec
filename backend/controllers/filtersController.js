const filtersRepository = require('../repositories/filtersRepository');


exports.getFilters = async (req, res) => {
    try {
        const filters = await filtersRepository.getFilters();
        res.status(200).json(filters[0]);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

exports.postFilter = async (req, res) => {
    try {
        if (!req.body.name || !req.body.description || !req.body.selectedCrimes || !req.body.selectedStates || !req.body.timeRange || !req.body.dateRange || !req.body.heatMap) {
            res.status(400).json({message: 'Bad request'});
        }
        await filtersRepository.postFilter(req.body.name, req.body.description, req.body.selectedCrimes, req.body.selectedStates, req.body.timeRange, req.body.dateRange, req.body.heatMap);
        res.status(200).json({message: 'Filter added'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

exports.deleteFilter = async (req, res) => {
    try {
        const filter = await filtersRepository.deleteFilter(req.params.id);
        if (filter[0].affectedRows === 0) {
            res.status(404).json({message: 'Filter not found'});
        }
        res.status(200).json({message: 'Filter deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
