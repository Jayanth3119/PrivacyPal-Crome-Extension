// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
    // Get current tab and check site
    chrome.runtime.sendMessage({ action: "checkTrackers" }, (response) => {
        if (chrome.runtime.lastError) {
            updateUI("Error: Could not scan site.", 0, "Try refreshing the page.");
            return;
        }

        const trackers = response.trackers || [];
        const isSecure = response.isSecure;
        const cookies = response.cookies || 0;

        // Calculate Privacy Score (1-10)
        let score = 10;
        score -= trackers.length * 2; // Each tracker deducts 2 points
        score -= isSecure ? 0 : 3;   // Non-HTTPS deducts 3 points
        score -= cookies > 5 ? 2 : 0; // Too many cookies deducts 2 points
        score = Math.max(1, Math.min(10, score)); // Clamp between 1-10

        // Update UI
        const statusText = score >= 7 ? `✅ Safe: ${trackers.length} trackers found` :
                          score >= 4 ? `⚠️ Caution: ${trackers.length} trackers found` :
                          `🛑 Risky: ${trackers.length} trackers found`;
        const tip = score >= 7 ? "Tip: Keep third-party cookies off for extra safety." :
                    score >= 4 ? "Tip: Use a tracker blocker like uBlock Origin." :
                    "Tip: Avoid sharing personal info on this site.";
        updateUI(statusText, score, tip, trackers.length, isSecure, cookies);
    });

    // Handle scam check
    document.getElementById("check-scam").addEventListener("click", () => {
        const text = document.getElementById("scam-input").value.trim();
        const resultDiv = document.getElementById("scam-result");
        if (!text) {
            resultDiv.textContent = "Please enter some text to analyze.";
            resultDiv.className = "text-sm text-red-600";
            return;
        }

        // Simple keyword-based scam detection (replace with AI model later)
        const scamKeywords = ["win prize", "free money", "urgent", "click now", "you won"];
        const isScam = scamKeywords.some(keyword => text.toLowerCase().includes(keyword));
        resultDiv.textContent = isScam ? "🛑 Warning: This text looks suspicious!" :
                                        "✅ Looks okay, but stay cautious.";
        resultDiv.className = `text-sm ${isScam ? "text-red-600" : "text-green-600"}`;
    });
});

// Update UI with scan results
function updateUI(statusText, score, tip, trackers, isSecure, cookies) {
    const status = document.getElementById("status");
    const progressFill = document.getElementById("progress-fill");
    const scoreDiv = document.getElementById("score");
    const tipDiv = document.getElementById("tip");

    status.textContent = statusText;
    status.className = `font-semibold ${score >= 7 ? "text-green-600" : score >= 4 ? "text-yellow-600" : "text-red-600"}`;
    progressFill.style.width = `${score * 10}%`;
    progressFill.className = `progress-fill ${score >= 7 ? "bg-green-500" : score >= 4 ? "bg-yellow-500" : "bg-red-500"}`;
    scoreDiv.textContent = `Score: ${score}/10`;
    tipDiv.textContent = tip;

    // Accessibility: Set ARIA attributes
    status.setAttribute("aria-live", "polite");
}