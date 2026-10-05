const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const apiPath = path.join(__dirname, '..', 'app', 'api');
const backupPath = path.join(__dirname, '..', 'app', '_api_backup');

console.log('--- Starting Static Export for Firebase Hosting ---');
let renamed = false;

try {
  if (fs.existsSync(apiPath)) {
    console.log('Temporarily moving app/api for static export...');
    fs.renameSync(apiPath, backupPath);
    renamed = true;
  }

  process.env.NEXT_EXPORT = 'true';
  console.log('Running Next.js build with output: export...');
  execSync('npx next build', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    env: { ...process.env, NEXT_EXPORT: 'true' },
  });
  console.log('Export completed successfully!');
} catch (error) {
  console.error('Build error:', error);
  process.exitCode = 1;
} finally {
  if (renamed && fs.existsSync(backupPath)) {
    console.log('Restoring app/api...');
    fs.renameSync(backupPath, apiPath);
    console.log('Restored app/api successfully.');
  }
}
