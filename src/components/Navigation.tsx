import { Link } from 'react-router-dom';
import { Button } from './Button';

export function Navigation() {
    return (
        <nav className="bg-white border-b-4 border-black sticky top-0 z-50">
            <div className="neo-container flex justify-between items-center h-24">

                {/* Logo & Brand */}
                <Link to="/" className="flex items-center gap-4 group decoration-none">
                    <div className="w-12 h-12 bg-neo-base text-white flex items-center justify-center font-display font-black text-2xl border-3 border-black shadow-neo-sm group-hover:bg-neo-farcaster transition-colors">
                        DS
                    </div>
                    <span className="font-display font-black text-3xl tracking-tight uppercase group-hover:text-neo-base transition-colors">
                        DevSpree
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    <Link to="/" className="font-mono font-bold text-lg hover:underline decoration-4 underline-offset-8 decoration-neo-base hover:text-neo-base transition-colors">
                        HOME
                    </Link>
                    <Link to="/tip-jar" className="font-mono font-bold text-lg hover:underline decoration-4 underline-offset-8 decoration-neo-stacks hover:text-neo-stacks transition-colors">
                        TIP JAR
                    </Link>
                </div>

                {/* Wallet Connection */}
                <div className="flex items-center">
                    {/* "Connect Wallet" button wrapper using bright yellow OR Stacks Orange hover state as requested */}
                    <div className="border-3 border-black bg-neo-stacks shadow-neo hover:bg-neo-base transition-colors">
                        <appkit-button balance="show" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
