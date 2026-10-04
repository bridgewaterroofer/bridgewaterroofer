const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const tagSnippet = `  <!-- Search Engine Verification -->
  <meta name="google-site-verification" content="KFo_MYKs0TOBbBzjQbdjSkQ7tZ6ItIzMjtP7jdOaabQ">
  <meta name="msvalidate.01" content="23E6BB29418557808E4064E28EB5A118">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-7YE20ZXC0V"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-7YE20ZXC0V');
  </script>`;

function findHtmlFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'scratch' && entry.name !== 'components') {
        files.push(...findHtmlFiles(fullPath));
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

const htmlFiles = findHtmlFiles(rootDir);
console.log(`Found ${htmlFiles.length} HTML files to inspect.`);

let updatedCount = 0;

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('G-7YE20ZXC0V') || content.includes('KFo_MYKs0TOBbBzjQbdjSkQ7tZ6ItIzMjtP7jdOaabQ')) {
    console.log(`[EXISTS] ${path.relative(rootDir, filePath)}`);
    continue;
  }

  const viewportMatch = content.match(/<meta[^>]+name=["']viewport["'][^>]*>/i);
  if (viewportMatch) {
    const insertPos = viewportMatch.index + viewportMatch[0].length;
    content = content.slice(0, insertPos) + '\n\n' + tagSnippet + content.slice(insertPos);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`[UPDATED] ${path.relative(rootDir, filePath)}`);
  } else {
    const headMatch = content.match(/<head[^>]*>/i);
    if (headMatch) {
      const insertPos = headMatch.index + headMatch[0].length;
      content = content.slice(0, insertPos) + '\n' + tagSnippet + '\n' + content.slice(insertPos);
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
      console.log(`[UPDATED (after head)] ${path.relative(rootDir, filePath)}`);
    } else {
      console.warn(`[SKIPPED - NO HEAD] ${path.relative(rootDir, filePath)}`);
    }
  }
}

console.log(`\nComplete: Updated ${updatedCount} of ${htmlFiles.length} HTML files.`);
