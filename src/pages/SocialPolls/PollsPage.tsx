import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Navigation } from '../../components/Navigation';
import { useSocialPolls, Poll } from './hooks/useSocialPolls';

export function PollsPage() {
    const navigate = useNavigate();
    const { fetchPolls, polls, vote, isLoading } = useSocialPolls();

    useEffect(() => {
        fetchPolls();
    }, []);

    const handleVote = async (pollId: number, optionIndex: number) => {
        await vote(pollId, optionIndex);
    };

    return (
        <div className="min-h-screen pb-20 neo-bg">
            <Navigation />

            <main className="neo-container pt-12">
                {/* Header */}
                <header className="mb-16 text-center">
                    <h1 className="text-6xl md:text-8xl mb-6 tracking-tight">
                        SOCIAL <span className="text-neo-farcaster" style={{
                            textShadow: '4px 4px 0px black',
                            WebkitTextStroke: '2px black'
                        }}>POLLS</span>
                    </h1>
                    <p className="font-mono text-xl max-w-2xl mx-auto border-l-4 border-neo-farcaster pl-6 py-2 bg-white border-y-2 border-r-2 border-black shadow-neo">
                        Create and vote on observable on-chain polls directly from Farcaster frames.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Sidebar / Actions */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="bg-neo-farcaster text-white p-8">
                            <h2 className="text-3xl mb-4 text-white" style={{ textShadow: '3px 3px 0px black' }}>START A VOTE</h2>
                            <p className="font-mono mb-8 font-bold">
                                Launch a new poll to the community. Compatible with Farcaster Frames.
                            </p>
                            <Button
                                onClick={() => navigate('/polls/create')}
                                className="w-full bg-white text-black hover:bg-neo-yellow"
                            >
                                + NEW POLL
                            </Button>
                        </Card>

                        <Card className="p-6 bg-white">
                            <h3 className="text-xl mb-4 border-b-4 border-black pb-2">TRENDING</h3>
                            <div className="space-y-4 font-mono">
                                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2">
                                    <span>#dev-tools</span>
                                    <span className="bg-neo-farcaster text-white px-2 py-0.5 text-xs font-bold border-2 border-black">1.2k</span>
                                </div>
                                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2">
                                    <span>#base-build</span>
                                    <span className="bg-neo-farcaster text-white px-2 py-0.5 text-xs font-bold border-2 border-black">856</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Main Feed */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-4xl">ACTIVE POLLS</h2>
                            <Button onClick={fetchPolls} disabled={isLoading} variant="outline" className="text-sm bg-white">
                                REFRESH
                            </Button>
                        </div>

                        {polls.length === 0 && !isLoading && (
                            <div className="p-12 text-center border-4 border-dashed border-gray-300 rounded bg-white">
                                <p className="text-2xl font-mono text-gray-400">NO ACTIVE POLLS FOUND</p>
                            </div>
                        )}

                        {polls.map((poll) => (
                            <Card key={poll.id} className="p-8 hover:-translate-y-1 transition-transform">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-neo-farcaster rounded-full border-2 border-black"></div>
                                        <span className="font-mono font-bold">Poll #{poll.id}</span>
                                    </div>
                                    {poll.isActive ? (
                                        <span className="bg-neo-green font-bold px-3 py-1 border-2 border-black text-sm shadow-neo-sm">ACTIVE</span>
                                    ) : (
                                        <span className="bg-gray-300 font-bold px-3 py-1 border-2 border-black text-sm shadow-neo-sm">ENDED</span>
                                    )}
                                </div>

                                <h3 className="text-2xl mb-8 leading-tight">{poll.question}</h3>

                                <div className="space-y-4">
                                    {poll.options.map((opt, idx) => {
                                        const voteCount = poll.votes[idx] || 0;
                                        const percent = poll.totalVotes > 0
                                            ? Math.round((voteCount / poll.totalVotes) * 100)
                                            : 0;

                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => handleVote(poll.id, idx)}
                                                className="relative h-12 bg-gray-100 border-2 border-black flex items-center px-4 font-mono font-bold group hover:bg-neo-yellow/20 transition-colors cursor-pointer"
                                            >
                                                {/* Progress Bar */}
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-neo-farcaster/20 z-0 transition-all duration-500"
                                                    style={{ width: `${percent}%` }}
                                                ></div>

                                                <span className="relative z-10 w-full flex justify-between">
                                                    <span>{opt}</span>
                                                    <span>{percent}% ({voteCount})</span>
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 flex justify-between items-center text-sm font-mono text-gray-600">
                                    <span>{poll.totalVotes} votes total</span>
                                    {/* Could format poll.endTime here */}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
