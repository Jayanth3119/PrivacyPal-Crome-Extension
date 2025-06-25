// Simulated EasyPrivacy blocklist (subset for demo)
const trackerList = [
    "doubleclick.net",
    "google-analytics.com",
    "facebook.com",
    "adservice.google.com",
    "trackers.adnetwork.com"
];

// Store requests to analyze
let requests = [];

// Listen for web requests
chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        const requestUrl = new URL(details.url).hostname;
        if (!requests.includes(requestUrl)) {
            requests.push(requestUrl);
        }
    },
    { urls: ["<all_urls>"] },
    []
);

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkTrackers") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs[0]) {
                sendResponse({ trackers: [], isSecure: false, cookies: 0 });
                return;
            }

            const url = new URL(tabs[0].url);
            const isSecure = url.protocol === "https:";

            // Get cookies for the domain
            chrome.cookies.getAll({ domain: url.hostname }, (cookies) => {
                // Check for trackers
                const trackers = requests.filter(request =>
                    trackerList.some(tracker => request.includes(tracker))
                );

                // Reset requests for next scan
                requests = [];

                sendResponse({
                    trackers: trackers,
                    isSecure: isSecure,
                    cookies: cookies.length
                });
            });
        });
        return true; // Keep message channel open for async response
    }
});