// Base Sepolia chain configuration
export const baseSepoliaConfig = {
    chainId: 84532,
    name: 'Base Sepolia',
    rpcUrl: import.meta.env.VITE_BASE_RPC_URL || 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
    nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
    },
};

export const stacksConfig = {
    network: 'testnet',
    apiUrl: import.meta.env.VITE_STACKS_API_URL || 'https://api.testnet.hiro.so',
    explorerUrl: 'https://explorer.hiro.so/?chain=testnet',
};

// Contract addresses
export const contractAddresses = {
    tipJar: import.meta.env.VITE_TIPJAR_CONTRACT_ADDRESS || '0xF7D3F178a1cE83270EE594B4B6cc0aFD202DA002',
    socialPolls: import.meta.env.VITE_SOCIAL_POLLS_CONTRACT_ADDRESS || '0xa3a17CC696B05b73d771B617ed31076DEB80c2cF',
    platformWallet: import.meta.env.VITE_PLATFORM_WALLET_ADDRESS || '',
};
