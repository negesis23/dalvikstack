import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const ROOT = process.cwd();
const PID_FILE = path.join(ROOT, '.watch.pid');

try {
    if (fs.existsSync(PID_FILE)) {
        const oldPid = fs.readFileSync(PID_FILE, 'utf8');
        process.kill(parseInt(oldPid), 'SIGKILL');
        fs.unlinkSync(PID_FILE);
    }
} catch (e) {}

fs.writeFileSync(PID_FILE, process.pid.toString());

let isBuilding = false;
let serverProc = null;
let pendingTargets = new Set();
let debounceTimeout = null;

function stopServer() {
    if (serverProc) {
        serverProc.kill('SIGTERM');
        serverProc = null;
    }
}

function startServer() {
    stopServer();
    serverProc = spawn('make', ['-s', '--no-print-directory', 'run'], { stdio: 'inherit', cwd: ROOT });
}

function build() {
    if (isBuilding || pendingTargets.size === 0) return;
    
    isBuilding = true;
    const targetList = Array.from(pendingTargets);
    pendingTargets.clear();

    const proc = spawn('make', ['-s', '--no-print-directory', ...targetList], { stdio: 'inherit', cwd: ROOT });

    proc.on('close', (code) => {
        isBuilding = false;
        if (code === 0) {
            startServer();
        }
        
        if (pendingTargets.size > 0) {
            build();
        }
    });
}

function watchFile(filename) {
    if (!filename || filename.startsWith('.') || filename.endsWith('~') || filename.startsWith('#')) return;

    if (filename.endsWith('.java')) {
        pendingTargets.add('backend');
    } else if (filename.endsWith('.css')) {
        pendingTargets.add('css');
    } else if (filename.endsWith('.jsx') || filename.endsWith('.js')) {
        pendingTargets.add('frontend');
        pendingTargets.add('assets');
    }

    if (pendingTargets.size > 0) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            build();
        }, 300);
    }
}

const F_SRC = path.join(ROOT, 'frontend/src');
const B_SRC = path.join(ROOT, 'backend/src/main/java');

fs.watch(F_SRC, { recursive: true }, (event, filename) => watchFile(filename));
fs.watch(B_SRC, { recursive: true }, (event, filename) => watchFile(filename));

startServer();

process.on('SIGINT', () => {
    stopServer();
    if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE);
    process.exit();
});

process.on('exit', () => {
    if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE);
});
