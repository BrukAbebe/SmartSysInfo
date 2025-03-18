const app = require('./app');
const config = require('./config/constants');

app.listen(config.PORT, () => {
    console.log(`Server running at http://localhost:${config.PORT}`);
});