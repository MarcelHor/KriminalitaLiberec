const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');

router.get('/api/states', statesController.getAllStates);

module.exports = router;
