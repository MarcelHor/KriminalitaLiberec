const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/api/data', async (req, res) => {
    const data = await dataController.getAllData();
    res.send(data[0]);
});

router.get('/api/data/:dateFrom/:dateTo', async (req, res) => {
        const data = await dataController.getDataByDateRange(req.params.dateFrom, req.params.dateTo);
        res.send(data[0]);
    //TODO: add error handling

});

module.exports = router;