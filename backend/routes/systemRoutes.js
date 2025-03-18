const express = require('express');
const { handleSystemQuery } = require('../controllers/systemController');

const router = express.Router();

router.post('/ask', handleSystemQuery);

module.exports = router;