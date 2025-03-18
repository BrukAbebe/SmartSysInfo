const si = require('systeminformation');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');


const getThermalInfo = async () => {
    const temps = await si.cpuTemperature();
    return {
        cpuTemp: temps.main ? `${temps.main}°C` : 'Unknown',
        gpuTemp: temps.gpu ? `${temps.gpu}°C` : 'Unknown'
    };
};

const getPowerInfo = async () => {
    const battery = await si.battery();
    return {
        health: battery.percent + '%',
        cycleCount: battery.cycleCount || 'Unknown',
        powerSource: battery.acConnected ? 'Plugged In' : 'Battery'
    };
};

const getWifiInfo = async () => {
    const wifi = await si.wifiNetworks();
    return wifi.length ? { ssid: wifi[0].ssid, signal: wifi[0].quality + '%' } : 'Unknown';
};

const getUptime = async () => {
    return { uptime: si.time().uptime + ' seconds' };
};

const getActiveUsers = async () => {
    const users = await si.users();
    return users.length ? users.map(user => ({ user: user.user, terminal: user.tty })) : 'No active users';
};

// Device Info
const getDeviceInfo = async () => {
    const system = await si.system();
    return { system };
};

// Installed Software (Windows)
const getInstalledSoftware = async () => {
    if (process.platform === 'win32') {
        return new Promise((resolve, reject) => {
            exec('wmic product get name', (error, stdout, stderr) => {
                if (error || stderr) {
                    reject('Failed to retrieve installed software');
                }
                resolve(stdout.split('\n').filter(item => item.trim() !== '').slice(1));
            });
        });
    } else {
        return 'Installed software listing not supported on this platform yet.';
    }
};

// Recent Files (Windows Only)
const getRecentFiles = () => {
    if (os.platform() === 'win32') {
        const recentFolder = path.join(os.homedir(), 'AppData', 'Roaming', 'Microsoft', 'Windows', 'Recent');
        try {
            const files = fs.readdirSync(recentFolder).map(file => path.basename(file));
            return files.length ? files.slice(0, 10) : 'No recent files found';
        } catch (error) {
            return 'Error accessing recent files';
        }
    }
    return 'Not supported on this OS';
};

// File System Info + Recent Files
const getFileSystemInfo = async () => {
    const filesystems = await si.fsSize();
    return {
        filesystems: filesystems.length ? filesystems : 'No file system info available',
        recentFiles: getRecentFiles()
    };
};

// Recent Applications
const getRecentApplications = async () => {
    if (os.platform() === 'win32') {
        const processes = await si.processes();
        const recentProcesses = processes.list
            .sort((a, b) => b.started - a.started) 
            .slice(0, 10)
            .map(proc => proc.name);
        return recentProcesses.length ? recentProcesses : 'No recent applications found';
    } else {
        return new Promise((resolve) => {
            exec("ps -eo comm,lstart --sort=-lstart | head -10", (error, stdout) => {
                if (error) {
                    resolve('Failed to retrieve recent applications');
                }
                resolve(stdout.split('\n').filter(line => line.trim() !== ''));
            });
        });
    }
};

// Applications + Recent Apps
const getApplications = async () => {
    return {
        installedApps: await getInstalledSoftware(),
        recentApps: await getRecentApplications()
    };
};

// OS Updates
const getSystemUpdates = async () => {
    const osInfo = await si.osInfo();
    return { osVersion: osInfo.release };
};

// Main Function
const getSystemInfo = async (intents) => {
    let systemData = {};

    for (const intent of intents) {
        switch (intent) {
            case 'cpu':
                systemData.cpu = { ...await si.cpu(), ...await si.currentLoad() };
                break;
            case 'memory':
                systemData.memory = await si.mem();
                break;
            case 'disk':
                systemData.disk = { ...await si.diskLayout(), ...await si.fsStats() };
                break;
            case 'network':
                systemData.network = { ...await si.networkInterfaces(), ...await si.networkStats() };
                break;
            case 'gpu':
                systemData.gpu = await si.graphics();
                break;
            case 'battery':
                systemData.battery = await getPowerInfo();
                break;
            case 'processes':
                systemData.processes = await si.processes();
                break;
            case 'connections':
                systemData.connections = await si.networkConnections();
                break;
            case 'thermal':
                systemData.thermal = await getThermalInfo();
                break;
            case 'power':
                systemData.power = await getPowerInfo();
                break;
            case 'wifi':
                systemData.wifi = await getWifiInfo();
                break;
            case 'uptime':
                systemData.uptime = await getUptime();
                break;
            case 'users':
                systemData.users = await getActiveUsers();
                break;
            case 'device':
                systemData.device = await getDeviceInfo();
                break;
            case 'software':
                systemData.software = await getInstalledSoftware();
                break;
            case 'apps':
                systemData.apps = await getApplications();
                break;
            case 'files':
                systemData.files = await getFileSystemInfo();
                break;
            case 'updates':
                systemData.updates = await getSystemUpdates();
                break;
            default:
                console.warn(`Unknown intent: ${intent}`);
        }
    }

    return systemData;
};

module.exports = { getSystemInfo };
