const { spawn } = require('child_process');
const fs = require('fs');

const lt = spawn('cmd.exe', ['/c', 'npx', '--yes', 'localtunnel', '--port', '8080']);

lt.stdout.on('data', (data) => {
  const str = data.toString();
  console.log('LT:', str);
  fs.appendFileSync('tunnel.txt', str);
});

lt.stderr.on('data', (data) => {
  console.error('LT ERR:', data.toString());
});
