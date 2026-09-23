const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[33m%s\x1b[0m', '   🛕  Surawanee Dnyanmandir — Unified Dev Server');
console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════');

// 1. Locate Python executable in venv or system
const projectRoot = path.resolve(__dirname, '..');
const winVenvPy = path.join(projectRoot, 'venv', 'Scripts', 'python.exe');
const unixVenvPy = path.join(projectRoot, 'venv', 'bin', 'python');

let pythonCmd = 'python';
if (process.platform === 'win32' && fs.existsSync(winVenvPy)) {
  pythonCmd = winVenvPy;
} else if (fs.existsSync(unixVenvPy)) {
  pythonCmd = unixVenvPy;
}

console.log(`\x1b[35m[Django]\x1b[0m Starting Backend API with SQLite database (${pythonCmd})...`);

// 2. Start Django Server on Port 8000
const django = spawn(pythonCmd, ['manage.py', 'runserver', '8000'], {
  cwd: projectRoot,
  shell: true,
  stdio: 'pipe'
});

django.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(l => {
    if (l.trim()) console.log(`\x1b[35m[Django]\x1b[0m ${l}`);
  });
});

django.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(l => {
    if (l.trim()) console.log(`\x1b[35m[Django]\x1b[0m ${l}`);
  });
});

django.on('error', (err) => {
  console.error('\x1b[31m[Django Error]\x1b[0m Failed to launch Django server:', err.message);
  console.log('\x1b[33m[Notice]\x1b[0m Continuing with Vite frontend using offline/local storage fallback.');
});

// 3. Start Vite Dev Server on Port 5173
console.log('\x1b[32m[Vite]\x1b[0m Starting Frontend Server...');
const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const vite = spawn(npxCmd, ['vite'], {
  cwd: projectRoot,
  shell: true,
  stdio: 'inherit'
});

// Handle termination gracefully
const cleanup = () => {
  console.log('\n\x1b[33mShutting down development servers...\x1b[0m');
  try { django.kill(); } catch {}
  try { vite.kill(); } catch {}
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
