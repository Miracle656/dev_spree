import { useState } from 'react';
import { Card } from '../../../components/Card';

export function QRGenerator() {
    const [address, setAddress] = useState('');
    const qrUrl = address ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${address}` : '';

    return (
        <Card className="bg-white border-3 p-0 overflow-hidden">
            <div className="bg-neo-stacks p-5 border-b-3 border-black">
                <h2 className="font-display font-black text-2xl uppercase text-white">
                    Receive Payout
                </h2>
            </div>

            <div className="p-6">
                <input
                    type="text"
                    placeholder="Enter wallet address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="neo-input mb-6"
                />

                {qrUrl ? (
                    <div className="border-3 border-black p-4 flex justify-center bg-gray-50">
                        <img src={qrUrl} alt="QR" className="w-40 h-40 mix-blend-multiply" />
                    </div>
                ) : (
                    <div className="border-3 border-black border-dashed p-8 text-center font-mono opacity-50">
                        QR Preview
                    </div>
                )}
            </div>
        </Card>
    );
}
