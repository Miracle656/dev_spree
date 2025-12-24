import { Card } from '../../../components/Card';
import { useTipJar } from '../hooks/useTipJar';

export function RecentDonations() {
    const { recentDonations, isLoading } = useTipJar();

    return (
        <Card className="border-3 p-8 bg-white shadow-neo">
            <h2 className="font-display font-black text-2xl uppercase mb-6 border-b-4 border-neo-base inline-block pr-8">
                Recent Transactions
            </h2>

            {isLoading ? (
                <div className="text-center py-8 font-mono">Loading feed...</div>
            ) : recentDonations.length === 0 ? (
                <div className="text-center py-8 font-mono text-gray-500 border-2 border-dashed border-black">
                    No transactions yet.
                </div>
            ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {recentDonations.map((donation, index) => (
                        <div key={index} className="flex gap-4 items-start border-b-2 border-gray-100 pb-4 last:border-0">
                            <div className="w-10 h-10 bg-neo-base text-white border-2 border-black flex items-center justify-center font-bold text-sm flex-shrink-0">
                                TX
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <span className="font-mono font-bold">{donation.donor.slice(0, 6)}...</span>
                                    <span className="font-bold bg-black text-white px-2 py-0.5 text-xs">{donation.amount} ETH</span>
                                </div>
                                {donation.message && (
                                    <p className="text-sm text-gray-600 mt-1 font-mono bg-gray-50 p-2 border-l-2 border-black">
                                        {donation.message}
                                    </p>
                                )}
                                <div className="text-xs text-gray-400 mt-1 font-mono uppercase">
                                    {new Date(donation.timestamp * 1000).toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
