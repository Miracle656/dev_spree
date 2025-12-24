import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { useTipJar } from '../hooks/useTipJar';

export function DonationForm() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const { sendDonation, isLoading } = useTipJar();

    const presetAmounts = [0.001, 0.005, 0.01, 0.05];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipient || !amount) return;

        await sendDonation(recipient, amount, message);
        setRecipient('');
        setAmount('');
        setMessage('');
    };

    return (
        <Card className="bg-white border-3 p-10 shadow-neo">
            {/* Header section styled like Deployment Sidebar inputs */}
            <div className="mb-8 border-b-4 border-black pb-4">
                <h2 className="font-display font-black text-3xl uppercase">Execute Transaction</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Recipient */}
                <div>
                    <label className="block font-mono font-bold text-sm mb-2 uppercase border-l-4 border-neo-base pl-2">
                        Recipient Address
                    </label>
                    <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="0x..."
                        className="neo-input"
                        required
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="block font-mono font-bold text-sm mb-2 uppercase border-l-4 border-neo-base pl-2">
                        Amount (ETH)
                    </label>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {presetAmounts.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => setAmount(preset.toString())}
                                className={`
                                    py-2 px-1 font-mono font-bold border-2 border-black transition-all text-sm
                                    ${amount === preset.toString()
                                        ? 'bg-neo-base text-white shadow-none'
                                        : 'bg-white hover:bg-gray-100'
                                    }
                                `}
                            >
                                {preset}
                            </button>
                        ))}
                    </div>

                    <input
                        type="number"
                        step="0.001"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Custom amount..."
                        className="neo-input"
                        required
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block font-mono font-bold text-sm mb-2 uppercase border-l-4 border-neo-farcaster pl-2">
                        Message (Optional)
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Add a note..."
                        rows={3}
                        className="neo-input resize-none"
                    />
                </div>

                <Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    className="w-full text-xl"
                    loading={isLoading}
                    disabled={!recipient || !amount}
                >
                    CONFIRM TRANSACTION
                </Button>
            </form>
        </Card>
    );
}
