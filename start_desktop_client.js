const args = ['run electron-dev'];
const opts = { stdio: 'inherit', cwd: 'desktop_client', shell: true };

require('child_process').spawn('npm', args, opts);