const express = require('express');
const mongoose = require('mongoose').default;
const locationsRoute = require('./routes/locations');
const crimesRoute = require('./routes/crimes');
require('dotenv/config');
const app = express();
const cors = require('cors');

//middleware
app.use(cors( {origin: 'http://127.0.0.1:5173'}, {credentials: true}, {methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}));
app.use(express.json());
app.use('/locations', locationsRoute);
app.use('/crimes', crimesRoute);

//listening
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('We are on home');
});

//connect to database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to database');
});
