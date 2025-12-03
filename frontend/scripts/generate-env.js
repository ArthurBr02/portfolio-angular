const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
const outDir = path.resolve(__dirname, '..', 'src', 'environments');

function parseDotenv(content) {
  const lines = content.split(/\r?\n/);
  const vars = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.substring(0, eq).trim();
    let val = trimmed.substring(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

/**
 * Convert SNAKE_CASE to camelCase
 * e.g. API_URL -> apiUrl, BASE_URL -> baseUrl
 */
function snakeToCamel(str) {
  return str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function buildEnvironmentObject(vars) {
  // Map env vars to a flat object with camelCase keys
  return Object.keys(vars).reduce((acc, k) => {
    const camelKey = snakeToCamel(k);
    const v = vars[k];
    // Try to coerce booleans and numbers
    if (v === 'true' || v === 'false') acc[camelKey] = v === 'true';
    else if (!isNaN(v) && v !== '') acc[camelKey] = Number(v);
    else acc[camelKey] = v;
    return acc;
  }, {});
}

function generateFile(obj, filePath) {
  const content = `export const environment = ${JSON.stringify(obj, null, 2)} as any;\n`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Wrote', filePath);
}

function main() {
  if (!fs.existsSync(envPath)) {
    console.warn('.env file not found at', envPath);
    return;
  }

  const content = fs.readFileSync(envPath, 'utf8');
  const vars = parseDotenv(content);
  const envObj = buildEnvironmentObject(vars);

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Create both environment.ts and environment.prod.ts
  const devPath = path.join(outDir, 'environment.ts');
  const prodPath = path.join(outDir, 'environment.prod.ts');

  // Add typical Angular flags
  const devObj = Object.assign({ production: false }, envObj);
  const prodObj = Object.assign({ production: true }, envObj);

  generateFile(devObj, devPath);
  generateFile(prodObj, prodPath);
}

if (require.main === module) main();

module.exports = main;
