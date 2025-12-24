# DevSpree - Multi-Chain dApp Platform

Build, Ship, Earn. Multi-chain dApps built for **Base** and **Stacks** builders.

![DevSpree](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Base](https://img.shields.io/badge/Chain-Base-blue?style=for-the-badge)
![Stacks](https://img.shields.io/badge/Chain-Stacks-orange?style=for-the-badge)

## 🚀 Overview

DevSpree is a scalable multi-dApp platform hosting various mini applications compatible with both **Farcaster** and **Base** mini app ecosystems. Built to maximize rewards for:

- **Base Builders Challenge**: Deploy contracts generating fees, create impactful mini apps
- **Stacks Builder Challenge**: Integrate Reown AppKit and WalletKit SDK

## 🎯 Live Mini Apps

### 💰 Tip Jar (Live)
Send and receive tips on Base and Stacks. Support your favorite creators with crypto donations.
- **Features**: Preset amounts, custom tips, message support, QR code sharing, leaderboard
- **Smart Contract**: TipJar.sol (1% platform fee for metrics)
- **Chains**: Base Sepolia, Stacks Testnet

### 📊 Portfolio Tracker (Coming Soon)
Track your multi-chain portfolio in real-time.

### 🗳️ On-Chain Voting (Coming Soon)
Create polls and vote on-chain with transparent results.

### 🎰 Lucky Draw (Coming Soon)
Fair raffles with provable randomness.

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: CSS with custom design system
- **Routing**: React Router v6
- **Wallet**: Reown AppKit (formerly WalletConnect), WalletKit SDK
- **Blockchain**: Wagmi + Ethers.js (Base), Stacks.js (Stacks)
- **Mini Apps**: Farcaster SDK, Base Mini App SDK

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dev_spree.git
cd dev_spree

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
```

## ⚙️ Environment Setup

Create a `.env` file with the following variables:

```env
VITE_REOWN_PROJECT_ID=your_reown_project_id
VITE_BASE_RPC_URL=https://sepolia.base.org
VITE_STACKS_API_URL=https://api.testnet.hiro.so
VITE_TIPJAR_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_PLATFORM_WALLET_ADDRESS=your_platform_wallet_address
```

### Get a Reown Project ID
1. Visit [Reown Cloud](https://cloud.reown.com/)
2. Create a new project
3. Copy your Project ID

## 🔧 Smart Contract Deployment

### TipJar Contract (Base)

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Create a new file `TipJar.sol`
3. Copy the contents from `src/contracts/TipJar.sol`
4. Compile with Solidity 0.8.20+
5. Deploy to Base Sepolia with your platform wallet address
6. Copy the deployed contract address to `.env`

**Constructor Parameters:**
- `_platformWallet`: Address to receive platform fees

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Build

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

## 🎨 Design System

DevSpree uses a **Premium Neo-Brutalism** aesthetic:
- **Typography**: `Doto` (Headings/Display) + `Space Mono` (Data/Body)
- **Colors**: Vibrant Neo-Pastels (Yellow `#FFD700`, Pink `#FF90E8`, Cyan `#22CCEE`)
- **Styling**: 
  - Thick black borders (3px)
  - Hard shadows (4px - 8px)
  - Generous spacing and padding
  - High contract, "Pop-Art" feel
- **Components**: Solid buttons, chunky inputs, distinct card containers

## 📱 Farcaster Integration

### Testing in Farcaster1. Enable [Developer Mode](https://farcaster.xyz/~/settings/developer-tools)
2. Add manifest URL: `https://yourapp.com/farcaster-manifest.json`
3. Test mini app in Farcaster client

### Manifest Configuration
Located at `public/farcaster-manifest.json`

## 🏗️ Base Mini App Integration

### Submitting to Base App

1. Deploy to Vercel/production
2. Create manifest at `public/base-manifest.json`
3. Sign manifest following [Base docs](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
4. Submit to Base app

## 🔮 Adding New Mini Apps

1. Create new page component in `src/pages/YourApp/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Navigation.tsx`
4. Add mini app card in `src/pages/Home.tsx`
5. Create smart contract if needed in `src/contracts/`

## 📄 License

MIT License - feel free to use this for your own projects!

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 🔗 Links

- **Documentation**: [Base Docs](https://docs.base.org/mini-apps) | [Farcaster Docs](https://miniapps.farcaster.xyz)
- **Reown AppKit**: [Docs](https://docs.reown.com/appkit/overview)
- **Stacks**: [WalletKit SDK](https://docs.walletconnect.network/wallet-sdk/overview)

## 💬 Support

For questions or support, open an issue or reach out on Farcaster!

---

**Built with ❤️ for Base and Stacks builders**
