const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/constants');

const genAI = new GoogleGenerativeAI(config.googleApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const getOrganizedResponse = async (query, systemInfo) => {
    try {
        const prompt = `The user asked: "${query}". Here is the system information: 
        ${JSON.stringify(systemInfo, null, 2)}.
        Provide a well-organized and summarized response of all relevant details based user asked query.`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error('Error generating organized response:', error.message);
        throw error;
    }
};


module.exports = { getOrganizedResponse };