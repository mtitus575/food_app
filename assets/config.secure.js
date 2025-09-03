// Configuration file for API keys
// This file handles API keys securely for different environments

// For production deployment, use environment variables
// For GitHub Pages, we'll use a different approach since it's static hosting

let api_key_calNinjas;

// Check if we're in development or production
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Development environment - you need to add your API key here locally
    // Create a separate config.js file with your real API key for local development
    api_key_calNinjas = "YOUR_API_KEY_HERE"; // Replace with your actual key locally
} else {
    // Production environment - use user-provided key or demo mode
    api_key_calNinjas = localStorage.getItem('userApiKey') || null;
}

// Function to set user's own API key
function setUserApiKey(key) {
    localStorage.setItem('userApiKey', key);
    api_key_calNinjas = key;
}

// Function to check if API key is available
function hasApiKey() {
    return api_key_calNinjas !== null && api_key_calNinjas !== '';
}

// Export the API key and utility functions
export { 
    api_key_calNinjas, 
    setUserApiKey, 
    hasApiKey 
};
