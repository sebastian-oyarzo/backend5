const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const router = require('./routes/routes');

const { PORT } = process.env;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/', router);

app.listen(PORT, async () => {
    console.log(`servidor iniciado en puerto ${PORT}`);
});