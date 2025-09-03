// Configuration file for API keys - PUBLIC VERSION
// This file is safe for GitHub Pages deployment

let api_key_calNinjas;

// Check if we're in development or production
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Development environment - this will be overridden by local config.js if it exists
    api_key_calNinjas = "DEVELOPMENT_KEY_PLACEHOLDER";
} else {
    // Production environment - use user-provided key or demo mode
    api_key_calNinjas = localStorage.getItem('userApiKey') || null;
}

// Function to set user's own API key
function setUserApiKey(key) {
    localStorage.setItem('userApiKey', key);
    api_key_calNinjas = key;
    // Reload the page to use the new key
    window.location.reload();
}

// Function to check if API key is available
function hasApiKey() {
    return api_key_calNinjas !== null && api_key_calNinjas !== '' && api_key_calNinjas !== 'DEVELOPMENT_KEY_PLACEHOLDER';
}

// Export the API key and utility functions
export { 
    api_key_calNinjas, 
    setUserApiKey, 
    hasApiKey 
};
