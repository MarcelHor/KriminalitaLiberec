const express = require('express');
const router = express.Router();
const typesController = require('../controllers/typesController');

router.get('/api/types', async (req, res) => {
    try {
        const data = await typesController.getAllTypes();
        res.send(data[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.get('/api/types/nested', async (req, res) => {
    try {
        const data = await typesController.getNestedTypes();
        res.send(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;