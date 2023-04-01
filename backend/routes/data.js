const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/', (req, res) => {
    res.send('Welcome to the liberec crime location data API');
});

router.get('/api/data', async (req, res) => {
    try {
        const data = await dataController.getAllData();
        res.send(data[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.get('/api/data/:dateFrom/:dateTo', async (req, res) => {
    try {
        const data = await dataController.getDataByDateRange(req.params.dateFrom, req.params.dateTo);
        res.send(data[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;