import { Card } from '../../../components/Card';
import { useTipJar } from '../hooks/useTipJar';

export function Leaderboard() {
    const { topRecipients, isLoading } = useTipJar();

    return (
        <Card className="bg-white border-3 p-0 h-full overflow-hidden">
            <div className="bg-neo-farcaster p-5 border-b-3 border-black">
                <h2 className="font-display font-black text-2xl uppercase text-white">
                    Top Earners
                </h2>
            </div>

            <div className="p-5">
                {isLoading ? (
                    <div className="text-center py-8 font-mono font-bold">Loading...</div>
                ) : topRecipients.length === 0 ? (
                    <div className="text-center py-10 font-mono text-sm text-gray-500">No data found</div>
                ) : (
                    <div className="space-y-3">
                        {topRecipients.map((recipient, index) => (
                            <div
                                key={recipient.address}
                                className="border-2 border-black p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold font-mono">
                                        #{index + 1}
                                    </div>
                                    <div className="font-mono font-bold text-sm">{recipient.address.slice(0, 6)}...</div>
                                </div>
                                <div className="font-mono font-bold">
                                    {recipient.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}
