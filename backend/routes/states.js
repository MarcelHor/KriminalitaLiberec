const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');

router.get('/api/states', async (req, res) => {
    try {
        const data = await statesController.getAllStates();
        res.send(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
