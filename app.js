require('dotenv').config(); // Load environment variables from .env
const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { WebClient } = require('@slack/web-api');

// ================== USER CONFIGURATION SECTION ==================
const config = require('./config.json'); // Load configuration from an external JSON file

// Pushover credentials from environment variables
const PUSHOVER_USER_KEY = process.env.PUSHOVER_USER_KEY;
const PUSHOVER_API_TOKEN = process.env.PUSHOVER_API_TOKEN;

// Email notification configuration
const EMAIL_CONFIG = {
  service: 'gmail', // Email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

// Slack Bot Token from environment variables
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const slackClient = new WebClient(SLACK_BOT_TOKEN);

// Thresholds for alerts (can be updated by user)
const ALERT_THRESHOLDS = config.thresholds;

// Check interval in milliseconds (can be updated by user)
const CHECK_INTERVAL = config.checkInterval || 60000;
// ================== END OF USER CONFIGURATION SECTION ==================

// Function to send a notification using Pushover
async function sendPushoverNotification(message) {
  try {
    const response = await axios.post('https://api.pushover.net/1/messages.json', {
      token: PUSHOVER_API_TOKEN,
      user: PUSHOVER_USER_KEY,
      message: message,
    });

    if (response.data.status === 1) {
      console.log('Notification sent successfully via Pushover.');
    } else {
      console.error('Failed to send notification via Pushover:', response.data);
    }
  } catch (error) {
    console.error('Error sending Pushover notification:', error.message);
  }
}

// Function to send a notification via Email
async function sendEmailNotification(subject, message) {
  try {
    const transporter = nodemailer.createTransport(EMAIL_CONFIG);
    await transporter.sendMail({
      from: EMAIL_CONFIG.auth.user,
      to: process.env.EMAIL_RECIPIENT,
      subject: subject,
      text: message,
    });
    console.log('Notification sent successfully via Email.');
  } catch (error) {
    console.error('Error sending Email notification:', error.message);
  }
}

// Function to send a notification via Slack
async function sendSlackNotification(channel, message) {
  try {
    await slackClient.chat.postMessage({
      channel: channel,
      text: message,
    });
    console.log('Notification sent successfully via Slack.');
  } catch (error) {
    console.error('Error sending Slack notification:', error.message);
  }
}

// Function to fetch exchange rate using Puppeteer with retry logic
async function fetchExchangeRate(retries = 3) {
  const browser = await puppeteer.launch({ headless: true }); // Run in headless mode for better performance
  const page = await browser.newPage();

  try {
    await page.goto(config.url, { waitUntil: 'networkidle2' });
    await page.waitForSelector(config.selector, { timeout: 10000 });

    // Get exchange rate value from the page
    const rate = await page.$eval(config.selector, (el) => parseFloat(el.innerText.replace(',', '.')));
    const timestamp = new Date().toLocaleString();

    console.log(`[${timestamp}] Current exchange rate (THB to ILS): ${rate}`);
    logExchangeRate(rate, timestamp); // Log rate to file

    // Check if the rate exceeds any thresholds
    ALERT_THRESHOLDS.forEach((threshold) => {
      if (rate > threshold.value) {
        const message = `Exchange rate alert! The current rate (THB to ILS) is ${rate}, which exceeds your threshold of ${threshold.value}.`;
        sendNotifications(threshold.channels, message);
      }
    });
  } catch (error) {
    console.error('Error fetching exchange rate:', error.message);
    if (retries > 0) {
      console.log(`Retrying... (${3 - retries + 1})`);
      await fetchExchangeRate(retries - 1); // Retry with exponential backoff
    }
  } finally {
    await browser.close();
  }
}

// Function to log exchange rates to a file
function logExchangeRate(rate, timestamp) {
  const logEntry = `${timestamp}, ${rate}\n`;
  fs.appendFile('exchange_rate_log.csv', logEntry, (err) => {
    if (err) console.error('Error logging exchange rate:', err.message);
  });
}

// Function to send notifications to multiple channels
function sendNotifications(channels, message) {
  channels.forEach((channel) => {
    switch (channel) {
      case 'pushover':
        sendPushoverNotification(message);
        break;
      case 'email':
        sendEmailNotification('Exchange Rate Alert', message);
        break;
      case 'slack':
        sendSlackNotification('#exchange-rate-alerts', message);
        break;
      default:
        console.error('Unknown notification channel:', channel);
    }
  });
}

// Function to analyze rate history and print trends (basic example)
function analyzeRateHistory() {
  fs.readFile('exchange_rate_log.csv', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading exchange rate log:', err.message);
      return;
    }
    const rates = data.split('\n').map((line) => {
      const parts = line.split(', ');
      return { timestamp: parts[0], rate: parseFloat(parts[1]) };
    });

    const averageRate = rates.reduce((acc, cur) => acc + cur.rate, 0) / rates.length;
    console.log(`Average exchange rate (THB to ILS): ${averageRate.toFixed(2)}`);
  });
}

// Function to run the exchange rate check at a specified interval
function startMonitoring() {
  fetchExchangeRate(); // Run the check immediately
  setInterval(fetchExchangeRate, CHECK_INTERVAL); // Set interval to check as defined in user configuration
}

// Export the fetchExchangeRate function and other utilities
module.exports = {
  fetchExchangeRate,
  startMonitoring,
  analyzeRateHistory,
};

// Run the monitoring if the script is executed directly
if (require.main === module) {
  startMonitoring();
}
