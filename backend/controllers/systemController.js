const { determineIntent } = require('../services/intentService');
const { getSystemInfo } = require('../services/systemInfoService');
const { getOrganizedResponse } = require('../services/geminiService');

const handleSystemQuery = async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'Query is required.' });
        }
        const intentResult = await determineIntent(query);

        if (!intentResult.intent) {
            return res.status(200).json({ message: intentResult.message });
        }

        const systemInfo = await getSystemInfo(intentResult.intent);

        const organizedResponse = await getOrganizedResponse(query, systemInfo);
        console.log(organizedResponse);

        res.json({ intent: intentResult.intent, systemInfo, organizedResponse });
    } catch (error) {
        res.status(500).json({ error: `Failed to process query: ${error.message}` });
    }
};

module.exports = { handleSystemQuery };