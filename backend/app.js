const express = require('express');
const cors = require('cors');
const systemRoutes = require('./routes/systemRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', systemRoutes);
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Fetch system information (CPU, memory, disk, network, GPU, battery, processes, connections).'
    });
});

app.use(errorHandler);

module.exports = app;