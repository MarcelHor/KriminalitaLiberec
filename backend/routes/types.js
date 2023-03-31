const express = require('express');
const router = express.Router();
const typesController = require('../controllers/typesController');

router.get('/api/types', async (req, res) => {
    const data = await typesController.getAllTypes();
    res.send(data[0]);
});

module.exports = router;