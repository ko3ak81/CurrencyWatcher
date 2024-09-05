require('dotenv').config(); // Load environment variables from .env
const puppeteer = require('puppeteer');
const axios = require('axios');

// Pushover credentials from environment variables
const PUSHOVER_USER_KEY = process.env.PUSHOVER_USER_KEY;
const PUSHOVER_API_TOKEN = process.env.PUSHOVER_API_TOKEN;

// URL to fetch the exchange rate
const URL = 'https://www.google.com/finance/quote/ILS-THB';

// Selector to get the exchange rate
const SELECTOR =
  '#yDmH0d > c-wiz.zQTmif.SSPGKf.u5wqUe > div > div.e1AOyf > div > main > div.Gfxi4 > div.VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.QZMA8b > c-wiz > div > div:nth-child(1) > div > div.rPF6Lc > div > div:nth-child(1) > div > span > div > div';

// Threshold for alert
const THRESHOLD_RATE = 9.6;

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
      console.error('Failed to send notification:', response.data);
    }
  } catch (error) {
    console.error('Error sending Pushover notification:', error);
  }
}

// Function to fetch exchange rate using Puppeteer
async function fetchExchangeRate() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(URL, { waitUntil: 'networkidle2' });
    await page.waitForSelector(SELECTOR);

    // Get exchange rate value from the page
    const rate = await page.$eval(SELECTOR, (el) => parseFloat(el.innerText));

    // Get the current timestamp
    const timestamp = new Date().toLocaleString();

    console.log(`[${timestamp}] Current exchange rate (THB to ILS): ${rate}`);

    // Check if the rate exceeds the threshold
    if (rate > THRESHOLD_RATE) {
      const message = `Exchange rate alert! The current rate (THB to ILS) is ${rate}, which exceeds your threshold of ${THRESHOLD_RATE}.`;
      await sendPushoverNotification(message);
    }
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
  } finally {
    await browser.close();
  }
}

// Function to run the exchange rate check every minute
function startMonitoring() {
  fetchExchangeRate(); // Run the check immediately

  // Set interval to check every minute (60000 milliseconds)
  setInterval(fetchExchangeRate, 60000);
}

startMonitoring();
