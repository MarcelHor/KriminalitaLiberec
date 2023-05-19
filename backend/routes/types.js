const express = require('express');
const router = express.Router();
const typesController = require('../controllers/typesController');

router.get('/api/types/nested', typesController.getNestedTypes);

module.exports = router;