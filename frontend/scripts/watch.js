import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../');
const F_SRC = path.join(ROOT, 'frontend/src');
const B_SRC = path.join(ROOT, 'backend/src/main/java');

let isBuilding = false;

function signalReload() {
  http.get('http://localhost:8080/hmr/trigger', (res) => {
    res.on('data', () => {});
    res.on('end', () => console.log('[DalvikStack] HMR: Reload signaled'));
  }).on('error', (e) => console.log('[DalvikStack] HMR Signal Failed:', e.message));
}

function build(type) {
  if (isBuilding) return;
  isBuilding = true;
  
  console.log(`[DalvikStack] HMR: Rebuilding ${type}...`);
  const targets = type === 'frontend' ? ['frontend', 'css', 'assets'] : ['backend'];
  const proc = spawn('make', targets, { stdio: 'inherit', cwd: ROOT });
  
  proc.on('close', (code) => {
    isBuilding = false;
    if (code === 0 && type === 'frontend') signalReload();
    if (code === 0 && type === 'backend') console.log('[DalvikStack] HMR: Backend rebuilt. Restart server for Java changes.');
  });
}

function watchRecursive(dir, type) {
  try {
    fs.watch(dir, (event, filename) => {
      if (filename && !filename.startsWith('.')) {
        build(type);
      }
    });
    
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        watchRecursive(fullPath, type);
      }
    });
  } catch (e) {}
}

watchRecursive(F_SRC, 'frontend');
watchRecursive(B_SRC, 'backend');

if (!fs.existsSync(path.join(ROOT, '.dev'))) {
  fs.writeFileSync(path.join(ROOT, '.dev'), 'true');
}

console.log('[DalvikStack] HMR: Monitoring all source files...');

process.on('SIGINT', () => {
  if (fs.existsSync(path.join(ROOT, '.dev'))) fs.unlinkSync(path.join(ROOT, '.dev'));
  process.exit();
});
