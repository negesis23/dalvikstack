import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const ROOT = process.cwd();
const F_SRC = path.join(ROOT, 'frontend/src');
const B_SRC = path.join(ROOT, 'backend/src/main/java');

let isBuilding = false;
let debounce = null;
let serverProc = null;

function stopServer() {
    if (serverProc) {
        serverProc.kill();
        serverProc = null;
    }
}

function startServer() {
    stopServer();
    console.log('[DalvikStack] Executing backend service...');
    serverProc = spawn('make', ['run'], { stdio: 'inherit', cwd: ROOT });
}

function build(target) {
    if (isBuilding) return;
    isBuilding = true;

    console.log(`\n[DalvikStack] Change detected. Rebuilding ${target}...`);
    const proc = spawn('make', [target], { stdio: 'inherit', cwd: ROOT });

    proc.on('close', (code) => {
        isBuilding = false;
        if (code === 0) {
            console.log(`[DalvikStack] ${target} rebuild successful. Restarting server...`);
            startServer();
        } else {
            console.log(`[DalvikStack] ${target} rebuild failed.`);
        }
    });
}

function watchDir(dir, target) {
    if (!fs.existsSync(dir)) return;
    fs.watch(dir, { recursive: true }, (event, filename) => {
        if (filename && !filename.startsWith('.')) {
            clearTimeout(debounce);
            debounce = setTimeout(() => build(target), 200);
        }
    });
}

// Initial start: Just run the server (make watch already depends on make build)
startServer();
watchDir(F_SRC, 'frontend css assets');
watchDir(B_SRC, 'backend');

console.log('[DalvikStack] Watcher active: Monitoring changes...');

process.on('SIGINT', () => {
    stopServer();
    process.exit();
});
