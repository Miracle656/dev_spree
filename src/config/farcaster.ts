import sdk from '@farcaster/miniapp-sdk';

// Initialize Farcaster SDK (auto-initializes on import)
export const initFarcasterSDK = () => {
    // SDK initializes automatically, this is a placeholder for future config
    console.log('Farcaster SDK loaded');
};

// Check if running in Farcaster context
export const isInFarcaster = () => {
    return sdk.context !== null;
};

// Get Farcaster user context
export const getFarcasterContext = () => {
    return sdk.context;
};

// Farcaster manifest configuration
export const farcasterManifest = {
    name: 'DevSpree',
    description: 'Multi-chain dApp platform for builders',
    icon: '/icon-192.png',
    homeUrl: '/',
    splashBackgroundColor: '#0F0F23',
    splashImageUrl: '/splash.png',
    version: '1.0.0',
};
