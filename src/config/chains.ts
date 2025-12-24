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
    tipJar: import.meta.env.VITE_TIPJAR_CONTRACT_ADDRESS || '',
    platformWallet: import.meta.env.VITE_PLATFORM_WALLET_ADDRESS || '',
};
