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
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String,
            required: true
        },
        resolvedOptions: {
            type: String,
            required: true
        },
    }
});


const Location = mongoose.model('Locations', LocationSchema);
module.exports = Location;