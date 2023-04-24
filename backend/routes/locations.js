const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/api/locations/:dateFrom/:dateTo', dataController.getLocationsByDateRangeSkeleton);

router.get('/api/locations/:ids', dataController.getLocationsOnClick);

module.exports = router;