// API Key Management Modal for Production Deployment
// This allows users to provide their own CalorieNinjas API key

const ApiKeyManager = {
  init() {
    this.checkApiKey();
  },

  checkApiKey() {
    const savedKey = localStorage.getItem("userApiKey");
    if (!savedKey && this.isProduction()) {
      this.showApiKeyModal();
    }
  },

  isProduction() {
    return (
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    );
  },

  showApiKeyModal() {
    const modal = this.createApiKeyModal();
    document.body.appendChild(modal);
  },

  createApiKeyModal() {
    const modal = document.createElement("div");
    modal.className = "api-key-modal";
    modal.innerHTML = `
            <div class="api-key-modal-content">
                <h2>🔑 API Key Required</h2>
                <p>This app uses the CalorieNinjas API for nutrition data. You can:</p>
                
                <div class="api-key-options">
                    <div class="option">
                        <h3>Option 1: Get Your Free API Key</h3>
                        <ol>
                            <li>Visit <a href="https://calorieninjas.com/api" target="_blank">CalorieNinjas API</a></li>
                            <li>Sign up for a free account (1000 requests/month)</li>
                            <li>Copy your API key and paste below</li>
                        </ol>
                        <input type="text" id="api-key-input" placeholder="Paste your API key here" />
                        <button id="save-api-key">Save & Continue</button>
                    </div>
                    
                    <div class="option">
                        <h3>Option 2: Try Demo Mode</h3>
                        <p>Use mock nutrition data for demonstration purposes.</p>
                        <button id="demo-mode">Continue with Demo Data</button>
                    </div>
                </div>
                
                <div class="security-note">
                    <p><strong>🔒 Security Note:</strong> Your API key is stored locally on your device only and never sent to our servers.</p>
                </div>
            </div>
        `;

    this.setupModalEvents(modal);
    return modal;
  },

  setupModalEvents(modal) {
    // Save API key
    modal.querySelector("#save-api-key").addEventListener("click", () => {
      const apiKey = modal.querySelector("#api-key-input").value.trim();
      if (apiKey) {
        localStorage.setItem("userApiKey", apiKey);
        localStorage.setItem("nutritionMode", "api");
        modal.remove();
        location.reload(); // Restart app with API key
      } else {
        alert("Please enter a valid API key");
      }
    });

    // Demo mode
    modal.querySelector("#demo-mode").addEventListener("click", () => {
      localStorage.setItem("nutritionMode", "demo");
      localStorage.setItem("userApiKey", "DEMO_MODE");
      modal.remove();
      location.reload(); // Restart app in demo mode
    });

    // Enter key support
    modal.querySelector("#api-key-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        modal.querySelector("#save-api-key").click();
      }
    });
  },
};

export { ApiKeyManager };
