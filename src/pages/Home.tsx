import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export function Home() {
    return (
        <div className="min-h-screen bg-neo-bg pb-24">

            {/* Hero Section */}
            <div className="border-b-4 border-black bg-white pt-24 pb-20 mb-16">
                <div className="neo-container grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        {/* Status Pillars */}
                        <div className="flex gap-3 mb-6 font-mono text-xs font-bold uppercase">
                            <span className="bg-neo-base text-white px-3 py-1 rounded-sm border-2 border-black">Base: Live</span>
                            <span className="bg-neo-farcaster text-white px-3 py-1 rounded-sm border-2 border-black">Farcaster: Active</span>
                            <span className="bg-neo-stacks text-white px-3 py-1 rounded-sm border-2 border-black">Stacks: Testnet</span>
                        </div>

                        <h1 className="font-display font-black text-7xl md:text-8xl leading-none mb-6 text-black tracking-tight">
                            MULTI-CHAIN <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-base to-neo-farcaster" style={{ WebkitTextStroke: '2px black' }}>PLAYGROUND</span>
                        </h1>
                        <p className="font-mono text-xl font-bold mb-10 max-w-lg text-gray-800 leading-relaxed border-l-4 border-neo-stacks pl-6">
                            Deploy, interact, and experiment with mini-apps across Base, Farcaster, and Stacks.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/tip-jar">
                                <Button size="lg" variant="primary" className="text-xl px-10">
                                    START BUILDING
                                </Button>
                            </Link>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="text-xl px-10 bg-white">
                                    DOCS
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Hero Graphic */}
                    <div className="relative hidden md:flex h-[400px] items-center justify-center">
                        <div className="w-72 h-72 bg-neo-base border-3 border-black shadow-neo-lg z-20 flex items-center justify-center p-8 rotate-3">
                            <span className="text-6xl text-white">🔗</span>
                        </div>
                        <div className="absolute w-72 h-72 bg-neo-farcaster border-3 border-black -rotate-3 translate-x-12 translate-y-4 z-10"></div>
                        <div className="absolute w-72 h-72 bg-neo-stacks border-3 border-black rotate-6 -translate-x-12 -translate-y-4 z-0"></div>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="neo-container">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-10 w-4 bg-black"></div>
                    <h2 className="font-display text-4xl font-black uppercase">Mini-Apps Dashboard</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {/* Tip Jar Card (Active) */}
                    <Link to="/tip-jar" className="group no-underline text-black">
                        <Card hover className="h-full !p-0 overflow-hidden flex flex-col grayscale-0">
                            {/* Card Header Colored by Chain (Base Blue) */}
                            <div className="bg-neo-base border-b-3 border-black p-4 flex justify-between items-center">
                                <span className="font-display font-black text-white text-xl">BASE / L2</span>
                                <div className="bg-white border-2 border-black px-2 py-0.5 text-xs font-bold uppercase">Live</div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <div className="text-5xl mb-6">💰</div>
                                <h3 className="font-display text-3xl font-black mb-3">TIP JAR</h3>
                                <p className="font-mono text-sm leading-relaxed text-gray-600 mb-6 flex-1">
                                    Send tips, view leaderboards, and support creators on-chain.
                                </p>
                                <Button variant="primary" className="w-full">
                                    LAUNCH APP
                                </Button>
                            </div>
                        </Card>
                    </Link>

                    {/* Farcaster App (Coming Soon) */}
                    <div className="opacity-80">
                        <Card className="h-full !p-0 overflow-hidden flex flex-col">
                            {/* Card Header Colored by Chain (Farcaster Purple) */}
                            <div className="bg-neo-farcaster border-b-3 border-black p-4 flex justify-between items-center">
                                <span className="font-display font-black text-white text-xl">SOCIAL</span>
                                <div className="bg-black text-white border-2 border-white px-2 py-0.5 text-xs font-bold uppercase">Soon</div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <div className="text-5xl mb-6">📊</div>
                                <h3 className="font-display text-3xl font-black mb-3">POLLS</h3>
                                <p className="font-mono text-sm leading-relaxed text-gray-600 mb-6 flex-1">
                                    Create verifiable on-chain polls directly from Farcaster frames.
                                </p>
                                <Button variant="outline" disabled className="w-full">
                                    COMING SOON
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Stacks App (Coming Soon) */}
                    <div className="opacity-80">
                        <Card className="h-full !p-0 overflow-hidden flex flex-col">
                            {/* Card Header Colored by Chain (Stacks Orange) */}
                            <div className="bg-neo-stacks border-b-3 border-black p-4 flex justify-between items-center">
                                <span className="font-display font-black text-white text-xl">BITCOIN / L1</span>
                                <div className="bg-black text-white border-2 border-white px-2 py-0.5 text-xs font-bold uppercase">Soon</div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <div className="text-5xl mb-6">🟧</div>
                                <h3 className="font-display text-3xl font-black mb-3">ORDINAL GALLERY</h3>
                                <p className="font-mono text-sm leading-relaxed text-gray-600 mb-6 flex-1">
                                    Showcase your Bitcoin Ordinals and Stacks NFTs.
                                </p>
                                <Button variant="outline" disabled className="w-full">
                                    COMING SOON
                                </Button>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
