# Smart System Info

A real-time system monitoring tool that provides detailed insights into CPU, memory, network, user activity, and more through an intuitive chat-based interface. Designed for efficiency and ease of use, this application leverages AI to interpret queries and deliver organized, Markdown-formatted responses.

## Features

- **Interactive Chat UI**: Query system statistics (e.g., "cpu usage", "wifi connection") in a conversational format.
- **Professional Design**: Responses are formatted with Markdown for readability, including bullet lists and bolded key points.
- **Real-Time Updates**: Instantly displays queries and responses with timestamps for a seamless experience.
- **Robust Error Handling**: Provides helpful suggestions when queries don’t match system-related intents.

## Setup

### Prerequisites

- **Node.js**: Version 18.x or higher.
- **Google Generative AI API Key**: Required for intent detection (set in `backend/config/constants.js` or `.env`).
- **Git**: For cloning the repository.

### Installation

1. **Clone the Repository**:
   ```bash
    git clone https://github.com/BrukAbebe/SmartSysInfo.git
    cd SmartSysInfo

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env  # Create .env and add GOOGLE_API_KEY=your_key_here
   npm start


3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
    
    
## Usage

### Access the Application
- **Open your browser** to [http://localhost:5173](http://localhost:5173) after starting the frontend.

### Query Examples
- **CPU Usage:**  
  Type `"cpu usage"` to get a detailed breakdown of CPU load and idle time.
- **Wi-Fi Status:**  
  Type `"wifi connection"` to see network details like signal strength and IP address.
- **Active Users:**  
  Type `"what are active users of this pc"` to list logged-in users.

### Error Handling
For invalid queries (e.g., `"hello"`), the system responds with:

```bash
 I couldn’t detect a valid intent. Try asking about PC-related topics like: cpu, memory, disk, network, gpu, battery, processes, connections, thermal, power, wifi, uptime, users, device, software, apps, files, or updates.
