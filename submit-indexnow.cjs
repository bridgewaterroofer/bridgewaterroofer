/**
 * IndexNow Instant Search Engine Indexing Submitter
 * Compatible with Bing, Yandex, and IndexNow API Network
 */
const https = require('https');

const host = 'bridgewaterroofer.com';
const key = '2dfab80f52863e8a8b4a5c8f76a0f6d5';
const keyLocation = `https://${host}/${key}.txt`;
const urlList = [
  `https://${host}/`,
  `https://${host}/index.html`,
  `https://${host}/roof-repair-bridgewater-nj/`,
  `https://${host}/service-area/roofer-somerville-nj/`
];

const payload = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList
});

const endpoints = [
  'api.indexnow.org',
  'www.bing.com'
];

function submitToIndexNow(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: endpoint,
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          endpoint,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          body: data
        });
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    req.on('error', (e) => reject(e));
    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`===============================================`);
  console.log(`IndexNow Submission Tool`);
  console.log(`Host: ${host}`);
  console.log(`Key:  ${key}`);
  console.log(`Key Location: ${keyLocation}`);
  console.log(`Submitting ${urlList.length} URL(s)...`);
  console.log(`===============================================`);

  for (const ep of endpoints) {
    try {
      const res = await submitToIndexNow(ep);
      console.log(`[${ep}] Response: HTTP ${res.statusCode} ${res.statusMessage}`);
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`  ✓ Accepted! Search engines will index your updated URLs promptly.`);
      } else if (res.statusCode === 403) {
        console.log(`  ℹ HTTP 403 Forbidden: IndexNow crawler requires the site to be accessible on public domain ${host} to verify the key file.`);
      } else {
        console.log(`  ℹ Result: ${res.statusCode} (${res.body || res.statusMessage})`);
      }
    } catch (err) {
      console.log(`[${ep}] Connection note: ${err.message}`);
    }
  }
}

main();
