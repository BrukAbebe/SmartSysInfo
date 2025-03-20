const app = require('./app');
const config = require('./config/constants');

app.listen(config.PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server running at http://localhost:${config.PORT}`);
    }
});
