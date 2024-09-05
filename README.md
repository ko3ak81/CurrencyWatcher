# CurrencyWatcher
Get instant notifications when exchange rates hit your target levels. Set custom alerts and receive real-time updates directly to your device, ensuring you never miss a critical moment in the market.

Here is a sample `README.md` file that you can use for your Git repository to provide clear instructions on how to set up and use the exchange rate monitoring tool:

```markdown
# Exchange Rate Monitoring Tool

This Node.js application monitors the exchange rate between ILS (Israeli Shekel) and THB (Thai Baht) and sends a notification via Pushover if the rate exceeds a specified threshold. It uses Puppeteer for web scraping to get the exchange rate from Google Finance.

## Features

- Fetches the exchange rate from Google Finance using Puppeteer.
- Sends an alert via Pushover if the exchange rate exceeds a defined threshold.
- Runs continuously, checking the exchange rate every minute.

## Requirements

- Node.js (v14 or higher recommended)
- A Pushover account with an API token and user key
- Google Chrome or Chromium (Puppeteer requirement)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/exchange-rate-monitor.git
   cd exchange-rate-monitor
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add your Pushover credentials:

   ```bash
   PUSHOVER_USER_KEY=your_pushover_user_key
   PUSHOVER_API_TOKEN=your_pushover_api_token
   ```

## Usage

1. **Run the application:**

   ```bash
   node index.js
   ```

   The application will start monitoring the exchange rate and log the current rate in the console every minute. If the rate exceeds the specified threshold, a Pushover notification will be sent.

2. **Modify Threshold Rate (Optional):**

   You can adjust the `THRESHOLD_RATE` constant in `index.js` to change the alert threshold.

## Customization

- **Change URL or Selector:** If you need to fetch the exchange rate from a different source or the selector on the page changes, you can update the `URL` and `SELECTOR` constants in `index.js`.
- **Notification Method:** This application uses Pushover for notifications. You can modify the `sendPushoverNotification` function to use other services like Slack, Telegram, or email.

## Troubleshooting

- If Puppeteer fails to launch Chrome/Chromium, ensure that it is properly installed on your machine and accessible in your environment path.
- If you encounter issues with Pushover, verify that your user key and API token are correct and have the necessary permissions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgements

- [Puppeteer](https://github.com/puppeteer/puppeteer) - Headless browser for scraping
- [Pushover](https://pushover.net/) - Simple notifications for Android, iOS, and desktop

## Author

Created by Dan Burdetsky.
```

Feel free to customize this README as needed for your project!