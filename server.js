const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { fetchExchangeRate } = require('./app'); // Import your existing functions

const app = express();
const upload = multer({ dest: 'uploads/' }); // For file uploads

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if needed)
app.use(express.static('public'));

// Load configuration
let config = require('./config.json');

// Route to view the current configuration
app.get('/config', (req, res) => {
  res.json(config);
});

// Route to update configuration
app.post('/config', (req, res) => {
  const { url, selector, thresholds, checkInterval } = req.body;

  // Validate and update the configuration
  if (url) config.url = url;
  if (selector) config.selector = selector;
  if (thresholds) config.thresholds = JSON.parse(thresholds);
  if (checkInterval) config.checkInterval = parseInt(checkInterval, 10);

  // Save the updated configuration back to the file
  fs.writeFile('./config.json', JSON.stringify(config, null, 2), (err) => {
    if (err) {
      console.error('Error saving configuration:', err.message);
      return res.status(500).send('Error saving configuration.');
    }
    console.log('Configuration updated successfully.');
    res.send('Configuration updated successfully.');
  });
});

// Route to view logs
app.get('/logs', (req, res) => {
  const logPath = path.join(__dirname, 'exchange_rate_log.csv');
  fs.readFile(logPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err.message);
      return res.status(500).send('Error reading log file.');
    }
    res.send(`<pre>${data}</pre>`); // Send logs as formatted text
  });
});

// Route to manually trigger exchange rate check
app.post('/trigger-check', async (req, res) => {
  try {
    await fetchExchangeRate(); // Call the function to fetch exchange rate
    res.send('Exchange rate check triggered successfully.');
  } catch (error) {
    console.error('Error triggering exchange rate check:', error.message);
    res.status(500).send('Error triggering exchange rate check.');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
