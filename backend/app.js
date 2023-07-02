const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/locations');
const typesRouter = require('./routes/types');
const statesRouter = require('./routes/states');
const filtersRouter = require('./routes/filters');



//middleware
app.use(cors({origin: 'http://127.0.0.1:5173'}, {credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use('/', typesRouter);
app.use('/' , statesRouter);
app.use('/', filtersRouter);

router.get('/', (req, res) => {
    res.send('Welcome to the Liberec crime data API');
});

//listening
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



