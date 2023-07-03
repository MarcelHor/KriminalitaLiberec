const express = require('express');
const router = express.Router();
const filtersController = require('../controllers/filtersController');

router.get('/api/filters', filtersController.getFilters);

router.post('/api/filters', filtersController.postFilter);

router.delete('/api/filters/:id', filtersController.deleteFilter);

module.exports = router;

