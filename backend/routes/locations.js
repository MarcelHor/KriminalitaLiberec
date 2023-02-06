const express = require('express');
const router = express.Router();
const Location = require('../models/Locations');

router.get('/', (req, res) => {
    Location.find()
        .then(locations => res.json(locations))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {
    const newLocation = new Location({
        type: req.body.type,
        coordinates: req.body.coordinates,
        description: req.body.description
    });

    newLocation.save()
        .then(() => res.json('Location added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;

