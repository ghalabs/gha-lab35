const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const libName = core.getInput('library_name');

    // Define paths to both package.json files relative to the repo root
    const frontendPath = path.resolve(process.cwd(), 'frontend/package.json');
    const backendPath = path.resolve(process.cwd(), 'backend/package.json');

    // Check if files exist
    if (!fs.existsSync(frontendPath) || !fs.existsSync(backendPath)) {
      core.setFailed('Could not find package.json in frontend or backend folder.');
      return;
    }

    // Parse the JSON content
    const frontendPkg = JSON.parse(fs.readFileSync(frontendPath, 'utf8'));
    const backendPkg = JSON.parse(fs.readFileSync(backendPath, 'utf8'));

    // Helper to find the version in dependencies or devDependencies
    const getVer = (pkg) =>
      pkg.dependencies?.[libName] || pkg.devDependencies?.[libName];

    const frontVer = getVer(frontendPkg);
    const backVer = getVer(backendPkg);

    core.info(`Auditing ${libName}...`);

    if (!frontVer && !backVer) {
      core.warning(`${libName} is not used in either project.`);
      return;
    }

    if (frontVer !== backVer) {
      core.setFailed(
        `VERSION MISMATCH: ${libName} is ${frontVer} in Frontend, but ${backVer} in Backend!`
      );
    } else {
      core.info(
        `Success: ${libName} is synchronized at version ${frontVer}.`
      );
    }
  } catch (error) {
    core.setFailed(`Sync check failed: ${error.message}`);
  }
}

run();