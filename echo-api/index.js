const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse raw text
app.use(express.text());

// Middleware to parse raw binary data
app.use(express.raw({ type: '*/*', limit: '10mb' }));

// Catch-all route handler for ALL methods and ALL routes
app.all('*', (req, res) => {
  const response = {
    timestamp: new Date().toISOString(),
    request: {
      method: req.method,
      url: req.url,
      path: req.path,
      baseUrl: req.baseUrl,
      originalUrl: req.originalUrl,
      protocol: req.protocol,
      hostname: req.hostname,
      ip: req.ip,
    },
    route: {
      fullPath: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      params: req.params,
      query: req.query,
    },
    headers: req.headers,
    body: req.body,
    bodyType: typeof req.body,
    cookies: req.cookies || {},
  };

  // Handle different body types
  if (Buffer.isBuffer(req.body)) {
    response.body = req.body.toString('utf8');
    response.bodyType = 'Buffer (converted to string)';
    response.bodyRaw = req.body.toString('base64');
    response.bodyRawEncoding = 'base64';
  }

  // Set response headers
  res.setHeader('X-Echo-API', 'true');
  res.setHeader('X-Request-Method', req.method);
  res.setHeader('X-Request-Path', req.path);

  // Return the echo response
  res.json(response);
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    error: true,
    message: err.message,
    timestamp: new Date().toISOString(),
    request: {
      method: req.method,
      path: req.path,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Echo API is running on port ${PORT}`);
  console.log(`📡 All routes will echo back the request details`);
});
