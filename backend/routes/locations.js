const express = require('express');
const router = express.Router();
const Location = require('../models/Locations');

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find().populate('properties.crime').exec();
        res.json(locations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get locations' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { type, coordinates, properties } = req.body;
        const location = new Location({
            type,
            coordinates,
            properties,
        });
        await location.save();
        // Populate the `crime` field with the corresponding CrimeType document
        const populatedLocation = await Location.findById(location._id).populate('properties.crime').exec();
        res.status(201).json(populatedLocation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create location' });
    }
});

router.delete('/', (req, res) => {
    Location.deleteMany()
        .then(() => res.json('Locations deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;

