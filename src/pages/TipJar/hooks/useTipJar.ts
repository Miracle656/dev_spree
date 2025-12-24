import { useState } from 'react';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { BrowserProvider, Contract, parseEther } from 'ethers';
import { contractAddresses } from '../../../config/chains';

// TipJar ABI (partial - just the functions we need)
const TIPJAR_ABI = [
    'function donate(address recipient, string calldata message) external payable',
    'function getTopRecipients(uint256 count) external view returns (address[] memory, uint256[] memory)',
    'function getRecentDonations(uint256 count) external view returns (tuple(address donor, address recipient, uint256 amount, uint256 platformFee, string message, uint256 timestamp)[] memory)',
    'function recipientStats(address) external view returns (uint256 totalReceived, uint256 donationCount, uint256 withdrawableBalance)',
    'function withdraw() external',
];

interface Donation {
    donor: string;
    recipient: string;
    amount: string;
    platformFee: string;
    message: string;
    timestamp: number;
}

interface Recipient {
    address: string;
    amount: string;
    count: number;
}

export function useTipJar() {
    const { address } = useAppKitAccount();
    const { open } = useAppKit();
    const [isLoading, setIsLoading] = useState(false);
    const [topRecipients, setTopRecipients] = useState<Recipient[]>([]);
    const [recentDonations, setRecentDonations] = useState<Donation[]>([]);

    const getContract = async () => {
        if (!contractAddresses.tipJar) {
            throw new Error('TipJar contract address not set. Please deploy the contract first.');
        }

        if (!window.ethereum) {
            throw new Error('No wallet detected');
        }

        const provider = new BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        return new Contract(contractAddresses.tipJar, TIPJAR_ABI, signer);
    };

    const sendDonation = async (recipient: string, amount: string, message: string) => {
        if (!address) {
            open();
            return;
        }

        setIsLoading(true);
        try {
            const contract = await getContract();
            const tx = await contract.donate(recipient, message, {
                value: parseEther(amount),
            });

            console.log('Transaction sent:', tx.hash);
            await tx.wait();
            console.log('Transaction confirmed!');

            // Refresh data after donation
            await Promise.all([fetchTopRecipients(), fetchRecentDonations()]);

            alert('Donation sent successfully! 🎉');
        } catch (error: any) {
            console.error('Donation failed:', error);
            alert(`Donation failed: ${error.message || 'Unknown error'}`);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTopRecipients = async () => {
        if (!contractAddresses.tipJar) return;

        try {
            const contract = await getContract();
            const [addresses, amounts] = await contract.getTopRecipients(10);

            const formatted = addresses.map((addr: string, i: number) => ({
                address: addr,
                amount: (Number(amounts[i]) / 1e18).toFixed(4),
                count: 0, // Would need separate call for count
            }));

            setTopRecipients(formatted);
        } catch (error) {
            console.error('Failed to fetch top recipients:', error);
        }
    };

    const fetchRecentDonations = async () => {
        if (!contractAddresses.tipJar) return;

        try {
            const contract = await getContract();
            const donations = await contract.getRecentDonations(20);

            const formatted = donations.map((d: any) => ({
                donor: d.donor,
                recipient: d.recipient,
                amount: (Number(d.amount) / 1e18).toFixed(4),
                platformFee: (Number(d.platformFee) / 1e18).toFixed(4),
                message: d.message,
                timestamp: Number(d.timestamp),
            }));

            setRecentDonations(formatted);
        } catch (error) {
            console.error('Failed to fetch recent donations:', error);
        }
    };

    const withdrawFunds = async () => {
        if (!address) {
            open();
            return;
        }

        setIsLoading(true);
        try {
            const contract = await getContract();
            const tx = await contract.withdraw();

            console.log('Withdrawal transaction sent:', tx.hash);
            await tx.wait();
            console.log('Withdrawal confirmed!');

            alert('Withdrawal successful! 💰');
        } catch (error: any) {
            console.error('Withdrawal failed:', error);
            alert(`Withdrawal failed: ${error.message || 'Unknown error'}`);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        sendDonation,
        withdrawFunds,
        fetchTopRecipients,
        fetchRecentDonations,
        topRecipients,
        recentDonations,
        isLoading,
    };
}
