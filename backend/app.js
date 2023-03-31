const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/data');
const typesRouter = require('./routes/types');

//middleware
app.use(cors({origin: 'http://127.0.0.1:5173'}, {credentials: true}, {methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use('/', typesRouter);


//listening
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



