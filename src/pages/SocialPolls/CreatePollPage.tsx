import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Navigation } from '../../components/Navigation';
import { useSocialPolls } from './hooks/useSocialPolls';

export function CreatePollPage() {
    const navigate = useNavigate();
    const { createPoll, isLoading } = useSocialPolls();

    // Form State
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!question || !option1 || !option2) {
            alert('Please provide a question and at least 2 options.');
            return;
        }

        const options = [option1, option2, option3, option4].filter(o => o.trim() !== '');

        // Default duration: 7 days (604800 seconds)
        const success = await createPoll(question, options, 604800);

        if (success) {
            navigate('/polls');
        }
    };

    return (
        <div className="min-h-screen pb-20 neo-bg">
            <Navigation />

            <main className="neo-container pt-12">
                <div className="max-w-2xl mx-auto">
                    <Button
                        onClick={() => navigate('/polls')}
                        variant="neutral"
                        className="mb-8 bg-white"
                    >
                        ← BACK TO DASHBOARD
                    </Button>

                    <Card className="p-8 md:p-12 bg-white">
                        <div className="bg-neo-farcaster text-white p-4 -mx-8 -mt-8 md:-mx-12 md:-mt-12 mb-8 border-b-4 border-black">
                            <h1 className="text-3xl font-black tracking-tight" style={{ textShadow: '2px 2px 0px black' }}>CREATE NEW POLL</h1>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <label className="block font-mono font-bold text-xl uppercase">Question</label>
                                <input
                                    type="text"
                                    placeholder="What should we build next on Base?"
                                    className="neo-input text-lg"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    disabled={isLoading}
                                    maxLength={100}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block font-mono font-bold text-xl uppercase">Options</label>

                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Option 1"
                                        className="neo-input"
                                        value={option1}
                                        onChange={(e) => setOption1(e.target.value)}
                                        disabled={isLoading}
                                        maxLength={30}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Option 2"
                                        className="neo-input"
                                        value={option2}
                                        onChange={(e) => setOption2(e.target.value)}
                                        disabled={isLoading}
                                        maxLength={30}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Option 3 (Optional)"
                                        className="neo-input"
                                        value={option3}
                                        onChange={(e) => setOption3(e.target.value)}
                                        disabled={isLoading}
                                        maxLength={30}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Option 4 (Optional)"
                                        className="neo-input"
                                        value={option4}
                                        onChange={(e) => setOption4(e.target.value)}
                                        disabled={isLoading}
                                        maxLength={30}
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    loading={isLoading}
                                    className="w-full text-xl py-4 bg-neo-farcaster text-white hover:bg-neo-farcaster/90"
                                >
                                    POST TO FARCASTER
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </main>
        </div>
    );
}
