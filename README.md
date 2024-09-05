# CurrencyWatcher

**CurrencyWatcher** is a Node.js application that monitors the exchange rate between ILS (Israeli Shekel) and THB (Thai Baht) and sends notifications via Pushover, Email, and Slack if the rate exceeds specified thresholds. It uses Puppeteer for web scraping to get the exchange rate from Google Finance and supports retry logic and logging for reliability.

## Features

- Fetches the exchange rate from Google Finance using Puppeteer.
- Supports multiple notification channels: Pushover, Email, and Slack.
- Configurable URL, selector, thresholds, and check intervals via a JSON configuration file.
- Logs exchange rates to a CSV file and supports basic trend analysis.

## Requirements

- Node.js (v14 or higher recommended)
- A Pushover account with an API token and user key
- A Gmail account for email notifications (or modify the `EMAIL_CONFIG` to use a different email service)
- A Slack workspace and bot token
- Google Chrome or Chromium (Puppeteer requirement)

## Installation and Setup

### Step 1: Install Required Software

1. **Install Node.js:**
   - Go to the [Node.js official website](https://nodejs.org/).
   - Click on the "LTS" (Long Term Support) version and download the installer.
   - Open the downloaded file and follow the instructions to install Node.js.

2. **Install a Code Editor (Optional):**
   - Download **Visual Studio Code** from [here](https://code.visualstudio.com/) and install it by following the on-screen instructions.

### Step 2: Set Up Pushover, Email, and Slack

1. **Pushover Configuration:**
   - Install the **Pushover** app on your iPhone or Android device.
   - Create a new account and note down your **User Key**.
   - Go to [Pushover's website](https://pushover.net/) to create a new application and obtain an **API Token**.

2. **Email Configuration:**
   - Use a Gmail account or modify the `EMAIL_CONFIG` in the code to use a different email service provider.
   - Generate an **App Password** for your Gmail account and note it down.

3. **Slack Configuration:**
   - Create a Slack app in your workspace and add the `chat:write` scope.
   - Install the app to your workspace and obtain the **Bot User OAuth Token**.

### Step 3: Clone the Repository and Configure the Application

1. **Open the Terminal Application:**
   - Find **Terminal** using **Spotlight Search** (press `Command + Space` and type "Terminal").

2. **Clone the CurrencyWatcher Repository:**
   - In the Terminal, type the following commands and press **Enter**:
   ```bash
   git clone https://github.com/ko3ak81/CurrencyWatcher.git
   cd CurrencyWatcher
   ```

3. **Install Required Libraries:**
   - In the Terminal, run the following command to install the necessary libraries:
   ```bash
   npm install
   ```

4. **Configure Environment Variables:**
   - Create a `.env` file in the root directory and add your environment variables:
   ```bash
   PUSHOVER_USER_KEY=your_pushover_user_key
   PUSHOVER_API_TOKEN=your_pushover_api_token
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_RECIPIENT=recipient_email@gmail.com
   SLACK_BOT_TOKEN=your_slack_bot_token
   ```

5. **Configure the `config.json` File:**
   - Open `config.json` and customize the following settings:
     - **`url`**: The URL to fetch the exchange rate from.
     - **`selector`**: The CSS selector to extract the exchange rate from the webpage.
     - **`thresholds`**: An array of thresholds for alerting, including the value and channels to notify.
     - **`checkInterval`**: The interval (in milliseconds) for checking the exchange rate. The default is 60000 (1 minute).

### Example `config.json`:
```json
{
  "url": "https://www.google.com/finance/quote/ILS-THB",
  "selector": "#yDmH0d > c-wiz > div > div > div > main > div > div > span > div > div",
  "thresholds": [
    {
      "value": 9.6,
      "channels": ["pushover", "email", "slack"]
    }
  ],
  "checkInterval": 60000
}
```

### Step 4: Run the Code to Start Monitoring

1. **Run the Application:**
   - In the Terminal, ensure you are in the `CurrencyWatcher` directory:
   ```bash
   cd CurrencyWatcher
   ```
   - Run the following command to start the monitoring process:
   ```bash
   node app.js
   ```
   - The Terminal will display messages showing the current exchange rate every minute. If the rate exceeds the threshold, you will receive notifications via the configured channels.

### Step 5: Keep the Script Running

1. **Leave the Terminal Window Open:**
   - To continue receiving notifications, keep the Terminal window open. The script will run in the background, checking the exchange rate at the configured interval.

2. **Stop the Script:**
   - To stop the script, click on the Terminal window and press `Control + C`.

## Additional Features

- **Retry Logic:** The script includes retry logic to handle errors during fetching.
- **Logging:** Exchange rates are logged to `exchange_rate_log.csv`.
- **Rate Analysis:** Run `analyzeRateHistory()` to analyze the logged data and calculate trends.

## Troubleshooting Tips

1. **Pushover Notifications Not Working:**
   - Ensure the Pushover app is installed and notifications are allowed on your device.
   - Verify your **User Key** and **API Token** in the `.env` file.

2. **Email or Slack Notifications Not Working:**
   - Ensure the correct **Email** or **Slack Bot Token** is configured.
   - Check that the recipient email and Slack channel are valid.

3. **Terminal Errors:**
   - Make sure all commands are entered correctly and that you have an internet connection.

4. **Script Not Running Continuously:**
   - Ensure the Terminal window remains open. If the Mac goes to sleep or the Terminal is closed, the script will stop running.

## Summary

By following these steps, you have set up **CurrencyWatcher** to monitor exchange rates and send real-time alerts via Pushover, Email, and Slack. This setup is ideal for keeping track of exchange rates and receiving instant notifications when your specified conditions are met.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgements

- [Puppeteer](https://github.com/puppeteer/puppeteer) - Headless browser for scraping
- [Pushover](https://pushover.net/) - Simple notifications for Android, iOS, and desktop
- [Nodemailer](https://nodemailer.com/) - Node.js library for sending emails
- [Slack Web API](https://slack.dev/node-slack-sdk/web-api) - Slack client for posting messages

## Author

Created by Dan Burdetsky.
