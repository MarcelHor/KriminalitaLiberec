const mongoose = require('mongoose').default;
const schema = mongoose.Schema;

const CrimeSchema = new schema({
    _id: {
        type: String,
        required: true,
    },    name: {
        type: String,
    },
    description: {
        type: String,
    },
});

const CrimeType = mongoose.model('CrimeType', CrimeSchema);
module.exports = CrimeType;
