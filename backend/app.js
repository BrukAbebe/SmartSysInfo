const express = require('express');
const cors = require('cors');
const systemRoutes = require('./routes/systemRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', systemRoutes);
app.use(errorHandler);

module.exports = app;