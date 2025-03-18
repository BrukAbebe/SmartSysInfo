require('dotenv').config();

module.exports = {
    googleApiKey: process.env.GOOGLE_API_KEY,
    PORT: process.env.PORT || 3000,
};