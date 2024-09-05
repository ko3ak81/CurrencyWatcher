```markdown
# CurrencyWatcher

**CurrencyWatcher** is a Node.js application that monitors the exchange rate between ILS (Israeli Shekel) and THB (Thai Baht) and sends a notification via Pushover if the rate exceeds a specified threshold. It uses Puppeteer for web scraping to get the exchange rate from Google Finance.

## Features

- Fetches the exchange rate from Google Finance using Puppeteer.
- Sends an alert via Pushover if the exchange rate exceeds a defined threshold.
- Runs continuously, checking the exchange rate every minute.

## Requirements

- Node.js (v14 or higher recommended)
- A Pushover account with an API token and user key
- Google Chrome or Chromium (Puppeteer requirement)

## Installation and Setup

### Step 1: Install Required Software on Mac

1. **Install Node.js:**
   - Go to the [Node.js official website](https://nodejs.org/).
   - Click on the "LTS" (Long Term Support) version and download the installer.
   - Open the downloaded file and follow the instructions to install Node.js.

2. **Install a Code Editor (Optional):**
   - You can use any text editor, but **Visual Studio Code** is recommended.
   - Download it from [here](https://code.visualstudio.com/) and follow the instructions to install.

### Step 2: Set Up Pushover App on Your iPhone

1. **Install Pushover App:**
   - Open the **App Store** on your iPhone.
   - Search for **Pushover** and install the app.

2. **Create a Pushover Account:**
   - Open the Pushover app on your iPhone.
   - Sign up with your email and password, then verify your email address if needed.

3. **Get Your Pushover User Key:**
   - Once logged in, your **User Key** will be displayed on the app’s main screen. This key is unique to your device.

4. **Create a Pushover Application:**
   - Visit [Pushover's website](https://pushover.net/) and log in using your account credentials.
   - Navigate to **Dashboard > Create a New Application/API Token**.
   - Enter a name (e.g., "CurrencyWatcher") and click **Create Application**.
   - Copy the **API Token/Key** provided; you'll need this for the next steps.

### Step 3: Prepare the Code on Your Mac

1. **Open the Terminal Application:**
   - Find **Terminal** using **Spotlight Search** (press `Command + Space` and type "Terminal").

2. **Create a New Folder for the Project:**
   - In the Terminal, type the following commands and press **Enter**:
   ```bash
   mkdir currency-watcher
   cd currency-watcher
   ```

3. **Create the Application File:**
   - In the Terminal, type:
   ```bash
   nano app.js
   ```
   - Copy and paste the provided code into the `app.js` file. After pasting, press `Control + X`, then `Y`, and **Enter** to save.

4. **Create a `.env` File for Your API Keys:**
   - In the Terminal, type:
   ```bash
   nano .env
   ```
   - Paste the following into the `.env` file, replacing the placeholders with your actual keys:
   ```bash
   PUSHOVER_API_TOKEN=your_pushover_api_token
   PUSHOVER_USER_KEY=your_pushover_user_key
   ```
   - Press `Control + X`, then `Y`, and **Enter** to save.

5. **Install Required Libraries:**
   - In the Terminal, type the following command to install necessary libraries:
   ```bash
   npm install puppeteer axios dotenv
   ```

### Step 4: Run the Code to Start Monitoring

1. **Run the Application:**
   - In the Terminal, make sure you are in the `currency-watcher` directory:
   ```bash
   cd currency-watcher
   ```
   - Run the following command to start the monitoring process:
   ```bash
   node app.js
   ```
   - The Terminal will display messages showing the current exchange rate every minute. If the rate exceeds the threshold, you will receive a notification on your iPhone via Pushover.

2. **Modify the Threshold Rate (Optional):**
   - To change the threshold rate, open `app.js` in your editor and locate the following line:
   ```javascript
   const THRESHOLD_RATE = 9.6; // Set your desired threshold rate here
   ```
   - Change `9.6` to your desired threshold rate, save the file, and restart the application.

### Step 5: Keep the Script Running

1. **Leave the Terminal Window Open:**
   - To continue receiving notifications, keep the Terminal window open. The script will run in the background, checking the exchange rate every minute.

2. **Stop the Script:**
   - To stop the script, click on the Terminal window and press `Control + C`.

## Troubleshooting Tips

1. **Pushover Notifications Not Working:**
   - Ensure the Pushover app is installed and notifications are allowed on your iPhone.
   - Verify your **User Key** and **API Token** in the `.env` file.

2. **Terminal Errors:**
   - Make sure all commands are entered correctly and that you have an internet connection.

3. **Script Not Running Continuously:**
   - Ensure the Terminal window remains open. If the Mac goes to sleep or the Terminal is closed, the script will stop running.

## Summary

By following these steps, you have set up **CurrencyWatcher** on your Mac to send real-time alerts to your iPhone using the Pushover app. This setup is ideal for keeping track of exchange rates and receiving instant notifications when your specified conditions are met.

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