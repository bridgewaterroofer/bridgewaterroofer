<?php
/**
 * Bridgewater Roofer - Automated IndexNow Submitter for Hostinger
 * 
 * Automatically submits all URLs from sitemap.xml to Bing, Yandex,
 * and the IndexNow search engine network whenever the site is deployed/updated.
 *
 * Supported execution modes on Hostinger:
 * 1. Automatic on-upload / first visitor ping (via lightweight client-side beacon)
 * 2. Hostinger Git post-deployment command: `php auto-indexnow.php`
 * 3. Hostinger Scheduled Cron Job (hPanel -> Advanced -> Cron Jobs): `php /home/.../public_html/auto-indexnow.php`
 * 4. Direct Browser / Webhook URL: `https://bridgewaterroofer.com/auto-indexnow.php?force=1`
 */

// Disable direct error exposure to visitors; log instead
error_reporting(E_ALL);
ini_set('display_errors', '0');

$host = 'bridgewaterroofer.com';
$key = '2dfab80f52863e8a8b4a5c8f76a0f6d5';
$keyLocation = "https://{$host}/{$key}.txt";
$sitemapPath = __DIR__ . '/sitemap.xml';
$stateFile = __DIR__ . '/.indexnow-state.json';

// Determine execution context
$isCli = (php_sapi_name() === 'cli');
$isAjax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || 
          (!empty($_SERVER['HTTP_SEC_FETCH_DEST']) && $_SERVER['HTTP_SEC_FETCH_DEST'] === 'empty');
$wantsJson = $isCli || $isAjax || (isset($_GET['format']) && $_GET['format'] === 'json') || ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST';
$force = isset($_GET['force']) || (isset($argv) && in_array('--force', $argv));

// 1. Verify sitemap exists
if (!file_exists($sitemapPath)) {
    $err = ['success' => false, 'error' => 'sitemap.xml not found'];
    if ($wantsJson) {
        header('Content-Type: application/json');
        echo json_encode($err, JSON_PRETTY_PRINT);
    } else {
        echo "<h1>Error: sitemap.xml not found</h1>";
    }
    exit(1);
}

// 2. Parse all URLs dynamically from sitemap.xml
$sitemapContent = file_get_contents($sitemapPath);
$currentHash = md5($sitemapContent);

$urls = [];
if (preg_match_all('/<loc>(https:\/\/[^<]+)<\/loc>/i', $sitemapContent, $matches)) {
    $urls = array_values(array_unique($matches[1]));
}

if (empty($urls)) {
    $err = ['success' => false, 'error' => 'No URLs found in sitemap.xml'];
    if ($wantsJson) {
        header('Content-Type: application/json');
        echo json_encode($err, JSON_PRETTY_PRINT);
    } else {
        echo "<h1>Error: No URLs found in sitemap.xml</h1>";
    }
    exit(1);
}

// 3. Check submission state (avoids spamming APIs if content hasn't changed)
$lastState = null;
if (file_exists($stateFile)) {
    $raw = @file_get_contents($stateFile);
    if ($raw) {
        $lastState = @json_decode($raw, true);
    }
}

$alreadySubmitted = (!$force && $lastState && isset($lastState['hash']) && $lastState['hash'] === $currentHash);

if ($alreadySubmitted) {
    $res = [
        'success' => true,
        'status' => 'unchanged',
        'message' => 'Sitemap has not changed since last submission. IndexNow is already up-to-date.',
        'last_submitted' => $lastState['timestamp'] ?? 'unknown',
        'urls_count' => count($urls),
        'hash' => $currentHash
    ];
    if ($wantsJson) {
        header('Content-Type: application/json');
        echo json_encode($res, JSON_PRETTY_PRINT);
    } else {
        renderHtmlResponse($res, $urls, $key, $keyLocation);
    }
    exit(0);
}

// 4. Submit to IndexNow endpoints
$payload = json_encode([
    'host' => $host,
    'key' => $key,
    'keyLocation' => $keyLocation,
    'urlList' => $urls
], JSON_UNESCAPED_SLASHES);

$endpoints = [
    'api.indexnow.org',
    'www.bing.com'
];

$results = [];

foreach ($endpoints as $endpoint) {
    $results[$endpoint] = sendIndexNowPost("https://{$endpoint}/indexnow", $payload);
}

// 5. Update state file
$newState = [
    'hash' => $currentHash,
    'timestamp' => date('c'),
    'urls_count' => count($urls),
    'endpoints' => $results
];
@file_put_contents($stateFile, json_encode($newState, JSON_PRETTY_PRINT));

$finalResponse = [
    'success' => true,
    'status' => 'submitted',
    'message' => 'Successfully submitted URLs to IndexNow network.',
    'submitted_at' => date('c'),
    'urls_count' => count($urls),
    'results' => $results
];

if ($wantsJson) {
    header('Content-Type: application/json');
    echo json_encode($finalResponse, JSON_PRETTY_PRINT);
} else {
    renderHtmlResponse($finalResponse, $urls, $key, $keyLocation);
}
exit(0);

/**
 * Universal HTTP POST function compatible with Hostinger curl and stream contexts
 */
function sendIndexNowPost($url, $jsonData) {
    // Attempt with cURL first
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json; charset=utf-8',
            'Content-Length: ' . strlen($jsonData)
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 12);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

        $body = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err = curl_error($ch);
        curl_close($ch);

        return [
            'status_code' => $code,
            'message' => ($code === 200 || $code === 202) ? 'Accepted / OK' : ($code === 403 ? 'Forbidden (Domain verification)' : 'Response received'),
            'error' => $err ?: null
        ];
    }

    // Fallback using standard PHP stream context
    $opts = [
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/json; charset=utf-8\r\n" .
                         "Content-Length: " . strlen($jsonData) . "\r\n",
            'content' => $jsonData,
            'timeout' => 12,
            'ignore_errors' => true
        ]
    ];
    $context = stream_context_create($opts);
    $fp = @fopen($url, 'r', false, $context);
    if ($fp) {
        $meta = stream_get_meta_data($fp);
        fclose($fp);
        $statusLine = $meta['wrapper_data'][0] ?? '';
        preg_match('/HTTP\/\S*\s+(\d{3})/', $statusLine, $m);
        $code = isset($m[1]) ? (int)$m[1] : 0;
        return [
            'status_code' => $code,
            'message' => ($code === 200 || $code === 202) ? 'Accepted / OK' : 'Response received',
            'error' => null
        ];
    }

    return [
        'status_code' => 0,
        'message' => 'Connection failed',
        'error' => 'Unable to establish outbound HTTPS connection'
    ];
}

/**
 * Clean UI for manual browser visits to /auto-indexnow.php
 */
function renderHtmlResponse($data, $urls, $key, $keyLocation) {
    header('Content-Type: text/html; charset=utf-8');
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>IndexNow Automated Status | Bridgewater Roofer</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; margin: 0; line-height: 1.6; }
        .card { max-width: 720px; margin: 0 auto; background: #1e293b; border-radius: 12px; border: 1px solid #334155; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5); }
        h1 { margin-top: 0; font-size: 1.5rem; color: #38bdf8; display: flex; align-items: center; gap: 0.5rem; }
        .badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; }
        .badge-success { background: #065f46; color: #34d399; }
        .badge-info { background: #1e3a8a; color: #93c5fd; }
        .meta-grid { display: grid; grid-template-columns: 140px 1fr; gap: 0.75rem; font-size: 0.95rem; margin: 1.5rem 0; background: #0f172a; padding: 1rem; border-radius: 8px; border: 1px solid #334155; }
        .meta-label { color: #94a3b8; font-weight: 600; }
        .meta-val { word-break: break-all; }
        .meta-val a { color: #38bdf8; text-decoration: none; }
        .meta-val a:hover { text-decoration: underline; }
        .results-box { background: #0f172a; border-radius: 8px; border: 1px solid #334155; padding: 1rem; margin-top: 1rem; font-family: monospace; font-size: 0.9rem; }
        .endpoint-row { display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid #1e293b; }
        .endpoint-row:last-child { border-bottom: none; }
        .status-ok { color: #34d399; font-weight: bold; }
        .btn { display: inline-block; background: #2563eb; color: #fff; padding: 0.6rem 1.2rem; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 1rem; transition: background 0.2s; }
        .btn:hover { background: #1d4ed8; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>
          <span>⚡ IndexNow Search Engine Indexer</span>
        </h1>
        <p>
          Status: 
          <?php if (($data['status'] ?? '') === 'submitted'): ?>
            <span class="badge badge-success">✓ Freshly Submitted</span>
          <?php else: ?>
            <span class="badge badge-info">ℹ Up-to-Date</span>
          <?php endif; ?>
        </p>
        <p><?php echo htmlspecialchars($data['message'] ?? ''); ?></p>

        <div class="meta-grid">
          <div class="meta-label">Domain:</div>
          <div class="meta-val">bridgewaterroofer.com</div>
          
          <div class="meta-label">IndexNow Key:</div>
          <div class="meta-val"><code><?php echo htmlspecialchars($key); ?></code></div>

          <div class="meta-label">Key File URL:</div>
          <div class="meta-val"><a href="<?php echo htmlspecialchars($keyLocation); ?>" target="_blank"><?php echo htmlspecialchars($keyLocation); ?></a></div>

          <div class="meta-label">Indexed URLs:</div>
          <div class="meta-val"><strong><?php echo count($urls); ?></strong> URLs from sitemap.xml</div>
        </div>

        <h3>API Response Endpoints</h3>
        <div class="results-box">
          <?php 
          $resList = $data['results'] ?? ($data['endpoints'] ?? []);
          foreach ($resList as $ep => $info): 
          ?>
            <div class="endpoint-row">
              <span><?php echo htmlspecialchars($ep); ?></span>
              <span class="status-ok">HTTP <?php echo $info['status_code']; ?> (<?php echo htmlspecialchars($info['message']); ?>)</span>
            </div>
          <?php endforeach; ?>
        </div>

        <p style="margin-top: 1.5rem;">
          <a href="?force=1" class="btn">Force Re-Submit All URLs Now</a>
        </p>
      </div>
    </body>
    </html>
    <?php
}
