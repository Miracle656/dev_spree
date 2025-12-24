import { useAppKitAccount } from '@reown/appkit/react';
import { Card } from '../../components/Card';
import { DonationForm } from './components/DonationForm';
import { Leaderboard } from './components/Leaderboard';
import { QRGenerator } from './components/QRGenerator';
import { RecentDonations } from './components/RecentDonations';

export function TipJarPage() {
    const { isConnected } = useAppKitAccount();

    return (
        <div className="min-h-screen bg-neo-bg pb-32">
            {/* Page Header Area - Styled as a Dashboard Header */}
            <div className="bg-white border-b-4 border-black py-16 mb-16">
                <div className="neo-container">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            {/* Breadcrumb / Chain Tag */}
                            <div className="flex gap-4 mb-4">
                                <div className="bg-neo-base text-white px-4 py-1 border-2 border-black font-mono font-bold text-sm uppercase">
                                    Base Mainnet
                                </div>
                                <div className="bg-neo-stacks text-white px-4 py-1 border-2 border-black font-mono font-bold text-sm uppercase">
                                    Stacks Testnet
                                </div>
                            </div>
                            <h1 className="font-display font-black text-6xl md:text-7xl text-black leading-none uppercase">
                                Tip Jar
                            </h1>
                        </div>
                        <div className="bg-neo-farcaster p-4 border-3 border-black shadow-neo-sm transform rotate-1">
                            <p className="font-mono text-white font-bold text-sm">
                                Support creators directly <br /> without platform fees.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="neo-container">
                {!isConnected ? (
                    <div className="max-w-3xl mx-auto text-center py-20">
                        <Card className="bg-white shadow-neo-lg py-16 px-12 border-4">
                            <div className="text-8xl mb-8">🔌</div>
                            <h2 className="font-display font-black text-4xl mb-6 uppercase">Connect to Dashboard</h2>
                            <p className="font-mono text-lg text-gray-600 mb-10 max-w-md mx-auto">
                                Secure connection required for on-chain interactions.
                            </p>
                            <div className="flex justify-center">
                                <div className="border-3 border-black shadow-neo bg-neo-base hover:bg-blue-600 transition-colors p-1">
                                    <appkit-button />
                                </div>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Interaction Area (2/3 width) */}
                        <div className="lg:col-span-2 space-y-10">
                            <DonationForm />
                            <RecentDonations />
                        </div>

                        {/* Sidebar Info Area (1/3 width) - "Deployment Sidebar" style */}
                        <div className="space-y-10">
                            <Leaderboard />
                            <QRGenerator />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
