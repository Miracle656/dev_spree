import type { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-neo-bg">
            <Navigation />
            <main className="flex-1">
                {children}
            </main>
            <footer className="bg-neo-black text-white py-8 border-t-3 border-neo-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="font-mono text-sm">
                            © 2024 DevSpree. Built for Farcaster & Base.
                        </p>
                        <div className="flex gap-6">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm hover:text-neo-yellow transition-colors"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm hover:text-neo-cyan transition-colors"
                            >
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
