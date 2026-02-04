#!/usr/bin/env node

/**
 * Automated Server Check and Start Script
 * Checks if Next.js dev server is running on port 3000
 * Automatically starts it if not running
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import net from 'net';

const execAsync = promisify(exec);

const PORT = 3000;
const HOST = 'localhost';

/**
 * Check if a port is in use
 */
async function isPortInUse(port) {
    return new Promise((resolve) => {
        const tester = net.createServer()
            .once('error', () => resolve(true))
            .once('listening', () => {
                tester.once('close', () => resolve(false)).close();
            })
            .listen(port, HOST);
    });
}

/**
 * Start the Next.js dev server
 */
async function startDevServer() {
    console.log('🚀 Starting Next.js dev server...');

    // Start server in background
    const serverProcess = exec('npm run dev', {
        cwd: process.cwd(),
        windowsHide: true
    });

    // Wait for server to be ready (max 30 seconds)
    const maxWaitTime = 30000;
    const checkInterval = 1000;
    let elapsed = 0;

    while (elapsed < maxWaitTime) {
        await new Promise(resolve => setTimeout(resolve, checkInterval));
        elapsed += checkInterval;

        const inUse = await isPortInUse(PORT);
        if (inUse) {
            console.log(`✅ Server started successfully on http://${HOST}:${PORT}`);
            return true;
        }
    }

    console.log('⚠️  Server startup timeout');
    return false;
}

/**
 * Main execution
 */
async function main() {
    try {
        const portInUse = await isPortInUse(PORT);

        if (portInUse) {
            console.log(`✅ Server already running on http://${HOST}:${PORT}`);
            process.exit(0);
        } else {
            console.log(`📍 Port ${PORT} is available`);
            const started = await startDevServer();
            process.exit(started ? 0 : 1);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
