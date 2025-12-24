import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
    return (
        <div
            className={`
                neo-card 
                ${hover ? 'hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#1A1A1A] transition-all duration-200 cursor-pointer' : ''}
                ${className}
            `}
        >
            {children}
        </div>
    );
}
