const mongoose = require('mongoose').default;
const schema = mongoose.Schema;

const LocationSchema = new schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    },
    properties: {
        date: {
            type: Date,
            default: Date.now
        },
        crime: {
            type: String,
            ref: 'CrimeType'
        }
    }
});

const Location = mongoose.model('Locations', LocationSchema);
module.exports = Location;