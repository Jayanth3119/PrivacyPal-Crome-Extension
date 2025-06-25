# 🔒 PrivacyPal – Your Personal Privacy Monitor for the Web

**PrivacyPal** is a lightweight and intelligent Chrome Extension that helps users stay aware of their digital privacy by analyzing websites in real time. It detects trackers, cookies, suspicious redirects, and security gaps — and proactively notifies users via an elegant popup interface.

---

## 🚀 Features

- 🕵️‍♂️ **Real-Time Website Monitoring**  
  Tracks every website you visit and analyzes its privacy posture.

- 🧠 **Suspicious Pattern Detection**  
  Flags potentially unsafe websites using URL and behavior-based pattern matching.

- 🍪 **Cookie & Tracker Detection**  
  Detects third-party trackers and cookies, and summarizes their impact on your privacy.

- 🔁 **Redirect & Navigation Tracing**  
  Monitors if you're being silently redirected or tracked across websites.

- 🧹 **Data Cleanup for Performance**  
  Automatically clears outdated site data to keep the extension light and fast.

- 🧭 **Toolbar Integration**  
  Click the PrivacyPal icon to manually view site privacy details on demand.

---

## 🧩 How It Works

PrivacyPal activates automatically when you visit a website:
1. It **analyzes the site** for known tracker patterns, HTTPS status, and cookies.
2. If privacy risks are detected, a **popup alert** appears with recommendations.
3. After a few seconds, it hides quietly — unless suspicious activity is detected again.

---

## 📁 File Structure

Ensure your extension folder includes the following files:

PrivacyPal/
│
├── manifest.json # Extension config and permissions
├── popup.html # HTML layout for the privacy popup
├── popup.js # Logic to display privacy insights
├── styles.css # Styling for the popup UI
├── background.js # Core service worker, handles tracking logic
├── content.js # Interacts with loaded pages
├── notification.css # Custom styles for alerts
├── icons/ # Folder containing toolbar icons (PNG/SVG)


## 🛠️ Getting Started

To load the extension in Chrome:

1. Open `chrome://extensions`
2. Enable **Developer Mode**
3. Click **"Load unpacked"**
4. Select the `PrivacyPal/` folder
