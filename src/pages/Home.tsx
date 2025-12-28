import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export function Home() {
    return (
        <div className="min-h-screen bg-neo-bg pb-32">

            {/* Hero Section */}
            <div className="border-b-4 border-black bg-white pt-24 pb-24 mb-20">
                <div className="neo-container grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        {/* Status Pillars */}
                        <div className="flex flex-wrap gap-4 mb-8 font-mono text-sm font-bold uppercase">
                            <span className="bg-neo-base text-white px-4 py-2 border-2 border-black shadow-neo-sm">Base: Live</span>
                            <span className="bg-neo-farcaster text-white px-4 py-2 border-2 border-black shadow-neo-sm">Farcaster: Active</span>
                            <span className="bg-neo-stacks text-white px-4 py-2 border-2 border-black shadow-neo-sm">Stacks: Testnet</span>
                        </div>

                        {/* Title with relaxed leading to prevent overlap */}
                        <h1 className="font-display font-black text-7xl md:text-8xl leading-snug mb-8 text-black tracking-tight">
                            MULTI-CHAIN <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-base to-neo-farcaster" style={{ WebkitTextStroke: '2px black' }}>PLAYGROUND</span>
                        </h1>

                        <p className="font-mono text-xl font-bold mb-12 max-w-lg text-gray-800 leading-looose border-l-4 border-neo-stacks pl-8 py-2">
                            Deploy, interact, and experiment with mini-apps across Base, Farcaster, and Stacks.
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <Link to="/tip-jar">
                                <Button size="lg" variant="primary" className="text-xl px-12 py-4 shadow-neo hover:shadow-none transition-all">
                                    START BUILDING
                                </Button>
                            </Link>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="text-xl px-12 py-4 bg-white shadow-neo hover:shadow-none transition-all">
                                    DOCS
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Hero Graphic - Simplified to reduce clutter */}
                    <div className="relative hidden md:flex h-[500px] items-center justify-center">
                        <div className="w-80 h-80 bg-neo-base border-4 border-black shadow-neo-lg z-20 flex items-center justify-center p-8 rotate-3 transition-transform hover:rotate-6">
                            <span className="text-8xl text-white drop-shadow-md">🔗</span>
                        </div>
                        <div className="absolute w-80 h-80 bg-neo-farcaster border-4 border-black -rotate-3 translate-x-16 translate-y-6 z-10"></div>
                        <div className="absolute w-80 h-80 bg-neo-stacks border-4 border-black rotate-6 -translate-x-16 -translate-y-6 z-0"></div>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="neo-container">
                <div className="flex items-center gap-6 mb-16">
                    <div className="h-12 w-6 bg-black"></div>
                    <h2 className="font-display text-5xl font-black uppercase tracking-wide">Mini-Apps Dashboard</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

                    {/* Tip Jar Card (Active) */}
                    <Link to="/tip-jar" className="group no-underline text-black block h-full">
                        <Card hover className="h-full !p-0 overflow-hidden flex flex-col grayscale-0 border-4 shadow-neo hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-neo-lg transition-all">
                            {/* Card Header Colored by Chain (Base Blue) */}
                            <div className="bg-neo-base border-b-4 border-black p-6 flex justify-between items-center">
                                <span className="font-display font-black text-white text-2xl tracking-wide drop-shadow-sm">BASE / L2</span>
                                <div className="bg-white border-2 border-black px-3 py-1 text-sm font-bold uppercase shadow-sm">Live</div>
                            </div>

                            <div className="p-10 flex-1 flex flex-col bg-white">
                                <div className="text-7xl mb-8">💰</div>
                                <h3 className="font-display text-4xl font-black mb-6 leading-tight">TIP JAR</h3>
                                <p className="font-mono text-base font-medium leading-loose text-gray-800 mb-10 flex-1">
                                    Send tips, view leaderboards, and support creators on-chain.
                                </p>
                                <div className="w-full">
                                    <span className="neo-btn w-full bg-neo-base text-white text-lg py-4 border-3 shadow-neo hover:bg-blue-600 flex justify-center">
                                        LAUNCH APP
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    {/* Farcaster App (Active) */}
                    <Link to="/polls" className="group no-underline text-black block h-full">
                        <Card hover className="h-full !p-0 overflow-hidden flex flex-col border-4 shadow-neo hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-neo-lg transition-all">
                            {/* Card Header Colored by Chain (Farcaster Purple) */}
                            <div className="bg-neo-farcaster border-b-4 border-black p-6 flex justify-between items-center">
                                <span className="font-display font-black text-white text-2xl tracking-wide drop-shadow-sm">SOCIAL</span>
                                <div className="bg-white border-2 border-black px-3 py-1 text-sm font-bold uppercase shadow-sm">Active</div>
                            </div>

                            <div className="p-10 flex-1 flex flex-col bg-white">
                                <div className="text-7xl mb-8">📊</div>
                                <h3 className="font-display text-4xl font-black mb-6 leading-tight">POLLS</h3>
                                <p className="font-mono text-base font-medium leading-loose text-gray-800 mb-10 flex-1">
                                    Create verifiable on-chain polls directly from Farcaster frames.
                                </p>
                                <span className="neo-btn w-full bg-neo-farcaster text-white text-lg py-4 border-3 shadow-neo hover:bg-purple-600 flex justify-center">
                                    LAUNCH APP
                                </span>
                            </div>
                        </Card>
                    </Link>

                    {/* Stacks App (Coming Soon) */}
                    <div className="opacity-90 h-full">
                        <Card className="h-full !p-0 overflow-hidden flex flex-col border-4 shadow-neo">
                            {/* Card Header Colored by Chain (Stacks Orange) */}
                            <div className="bg-neo-stacks border-b-4 border-black p-6 flex justify-between items-center">
                                <span className="font-display font-black text-white text-2xl tracking-wide drop-shadow-sm">BITCOIN / L1</span>
                                <div className="bg-black text-white border-2 border-white px-3 py-1 text-sm font-bold uppercase shadow-sm">Soon</div>
                            </div>

                            <div className="p-10 flex-1 flex flex-col bg-white">
                                <div className="text-7xl mb-8">🟧</div>
                                <h3 className="font-display text-4xl font-black mb-6 leading-tight">ORDINAL GALLERY</h3>
                                <p className="font-mono text-base font-medium leading-loose text-gray-800 mb-10 flex-1">
                                    Showcase your Bitcoin Ordinals and Stacks NFTs.
                                </p>
                                <button disabled className="neo-btn w-full bg-white text-black text-lg py-4 border-3 opacity-50 cursor-not-allowed">
                                    COMING SOON
                                </button>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
