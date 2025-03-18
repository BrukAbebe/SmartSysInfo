const config = require('../config/constants');
const { GoogleGenerativeAI } = require('@google/generative-ai');


const genAI = new GoogleGenerativeAI(config.googleApiKey);


const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const determineIntent = async (query) => {
    try {

        const prompt = `Classify the following query into one of these intents: cpu, memory, disk, network, gpu, battery, processes, connections. Query: ${query}. Respond with only the intent. Examples:
- Query: "What's my CPU usage?" → cpu
- Query: "How much RAM do I have?" → memory
- Query: "Show me disk information." → disk
- Query: "What's my network speed?" → network
- Query: "Tell me about my GPU." → gpu
- Query: "What's my battery level?" → battery
- Query: "List running processes." → processes
- Query: "Show active network connections." → connections`;

   
        const result = await model.generateContent(prompt);
        const response = result.response.text().trim().toLowerCase();

        console.log('Raw Response:', response);

       
        const validIntents = ['cpu', 'memory', 'disk', 'network', 'gpu', 'battery', 'processes', 'connections'];
        if (!validIntents.includes(response)) {
            
            if (query.toLowerCase().includes('cpu')) {
                intent = 'cpu';
            } else if (query.toLowerCase().includes('memory') || query.toLowerCase().includes('ram')) {
                intent = 'memory';
            } else if (query.toLowerCase().includes('disk') || query.toLowerCase().includes('storage')) {
                intent = 'disk';
            } else {
                throw new Error(`Invalid intent detected: ${response}`);
            }
        } else {
            intent = response;
        }

        return intent;
    } catch (error) {
        console.error('Error determining intent:', error.message);
        throw error;
    }
};

module.exports = { determineIntent };