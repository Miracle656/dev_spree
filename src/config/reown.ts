import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { baseSepolia } from '@reown/appkit/networks';
import { QueryClient } from '@tanstack/react-query';

// Get projectId from https://dashboard.reown.com
export const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || '';

if (!projectId) {
    console.warn('VITE_REOWN_PROJECT_ID is not set. Wallet connection will not work.');
}

// Create metadata
const metadata = {
    name: 'DevSpree',
    description: 'Multi-chain dApp platform for Farcaster and Base mini apps',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Set up networks
const networks = [baseSepolia];

// Create Ethers Adapter
export const ethersAdapter = new EthersAdapter();

// Create QueryClient for React Query
export const queryClient = new QueryClient();

// Create AppKit instance
export const appKit = createAppKit({
    adapters: [ethersAdapter],
    networks,
    projectId,
    metadata,
    features: {
        analytics: true
    }
});
