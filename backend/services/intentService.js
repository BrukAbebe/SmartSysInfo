const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/constants');

const genAI = new GoogleGenerativeAI(config.googleApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const determineIntent = async (query) => {
    try {
        const prompt = `Extract all relevant intents from the following query: 
        "${query}" and categorize them into one or more of the following: 
        cpu, memory, disk, network, gpu, battery, processes, connections, 
        thermal, power, wifi, uptime, users, device, software, apps, files, updates.
        Respond with a comma-separated list of valid intents. If no intent is clear, return an empty string.`;

        const result = await model.generateContent(prompt);
        const response = result.response.text().trim().toLowerCase();

        const validIntents = [
            'cpu', 'memory', 'disk', 'network', 'gpu', 'battery', 'processes',
            'connections', 'thermal', 'power', 'wifi', 'uptime', 'users', 'device',
            'software', 'apps', 'files', 'updates'
        ];

        const detectedIntents = response.split(',').map(intent => intent.trim()).filter(intent => validIntents.includes(intent));

        if (detectedIntents.length === 0) {
            return {
                intent: null,
                message: 'I couldn’t detect a valid intent. Try asking about PC-related topics like: cpu, memory, disk, network, gpu, battery, processes, connections, thermal, power, wifi, uptime, users, device, software, apps, files, or updates.'
            };
        }

        return { intent: detectedIntents, message: null };
    } catch (error) {
        return {
            intent: null,
            message: 'Something went wrong while processing your query. Please try asking about system topics like cpu, memory, disk, network, etc.'
        };
    }
};

module.exports = { determineIntent };