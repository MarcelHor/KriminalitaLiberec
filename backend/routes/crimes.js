const express = require('express');
const router = express.Router();
const Crime = require('../models/Crimes');

router.get('/', (req, res) => {
    Crime.find()
        .then(crimes => res.json(crimes))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get all unique crime names
router.get('/names', (req, res) => {
    Crime.find().distinct('name')
        .then(crimes => res.json(crimes))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/', (req, res) => {
    const { _id, name, description } = req.body;
    const newCrime = new Crime({
        _id,
        name,
        description,
    });

    newCrime.save((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating new crime.');
        }
        return res.status(200).json(newCrime);
    });
});

router.delete('/', (req, res) => {
    Crime.deleteMany()
        .then(() => res.json('Crimes deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;


