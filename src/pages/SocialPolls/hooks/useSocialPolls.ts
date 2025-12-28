import { useState, useCallback } from 'react';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { BrowserProvider, Contract } from 'ethers';
import { contractAddresses } from '../../../config/chains';
import { SOCIAL_POLLS_ABI } from '../../../config/socialPollsAbi';

export interface Poll {
    id: number;
    creator: string;
    question: string;
    options: string[];
    votes: number[];
    isActive: boolean;
    endTime: number;
    totalVotes: number;
}

export function useSocialPolls() {
    const { address } = useAppKitAccount();
    const { open } = useAppKit();
    const [isLoading, setIsLoading] = useState(false);
    const [polls, setPolls] = useState<Poll[]>([]);

    const getContract = useCallback(async () => {
        if (!contractAddresses.socialPolls) {
            throw new Error('Social Polls contract address not set.');
        }

        if (!window.ethereum) {
            throw new Error('No wallet detected');
        }

        const provider = new BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        return new Contract(contractAddresses.socialPolls, SOCIAL_POLLS_ABI, signer);
    }, []);

    const fetchPolls = async () => {
        // In a real app with many polls, we'd probably want a way to fetch just recent ones.
        // For now, we'll fetch IDs 1 to 5 as a demo, or we could add a `getPollCount` to the contract.
        // Since we don't have `getPollCount` exposed in the ABI provided (unless it's public vars), 
        // we'll try to fetch a hypothetical range or relying on the user to provide IDs.
        // Actually, the contract has `_pollIds` private. We might need to rely on events or just try fetching.
        // Let's assume we can fetch ID 1 for now if it exists.

        // BETTER APPROACH: The `polls` mapping is public, but we need to know the IDs.
        // Since I can't change the contract now, I'll implement a simple fetcher that tries ID 1..10
        // until it hits an empty one or maxes out.

        try {
            const contract = await getContract();
            const fetchedPolls: Poll[] = [];

            // Allow reading without signer for public data? 
            // We used signer in getContract, which requires wallet. 
            // Ideally should use provider for read-only to avoid popup if not connected.

            for (let i = 1; i <= 10; i++) {
                try {
                    const data = await contract.getPoll(i);
                    // data: [question, options, votes, isActive, endTime]
                    // If question is empty, likely doesn't exist or deleted (if logic existed)
                    if (!data[0]) break;

                    const votes = data[2].map((v: bigint) => Number(v));
                    const totalVotes = votes.reduce((a: number, b: number) => a + b, 0);

                    fetchedPolls.push({
                        id: i,
                        creator: '', // Not returned by getPoll in this ABI version, need event or public var
                        question: data[0],
                        options: data[1],
                        votes: votes,
                        isActive: data[3],
                        endTime: Number(data[4]),
                        totalVotes
                    });
                } catch (e) {
                    // Stop if error (likely invalid ID)
                    break;
                }
            }

            setPolls(fetchedPolls);
        } catch (error) {
            console.error('Error fetching polls:', error);
        }
    };

    const createPoll = async (question: string, options: string[], durationSeconds: number) => {
        if (!address) {
            open();
            return;
        }

        setIsLoading(true);
        try {
            const contract = await getContract();
            const tx = await contract.createPoll(question, options, durationSeconds);
            console.log('Create Poll Tx:', tx.hash);
            await tx.wait();

            alert('Poll created successfully!');
            fetchPolls(); // Refresh
            return true;
        } catch (error: any) {
            console.error('Create Poll failed:', error);
            alert(`Failed to create poll: ${error.message}`);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const vote = async (pollId: number, optionIndex: number) => {
        if (!address) {
            open();
            return;
        }

        setIsLoading(true);
        try {
            const contract = await getContract();
            const tx = await contract.vote(pollId, optionIndex);
            console.log('Vote Tx:', tx.hash);
            await tx.wait();

            alert('Vote submitted!');
            fetchPolls(); // Refresh
            return true;
        } catch (error: any) {
            console.error('Vote failed:', error);
            alert(`Failed to vote: ${error.message}`);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createPoll,
        vote,
        fetchPolls,
        polls,
        isLoading
    };
}
