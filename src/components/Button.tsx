import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {

    // Updated to User's Color Palette Strategy
    const variantClasses = {
        primary: 'bg-neo-base text-white hover:bg-blue-600', // Base Blue
        secondary: 'bg-neo-farcaster text-white hover:bg-purple-700', // Farcaster Purple
        accent: 'bg-neo-stacks text-white hover:bg-orange-600', // Stacks Orange
        neutral: 'bg-white text-black hover:bg-gray-100',
        outline: 'bg-transparent text-black border-black hover:bg-black hover:text-white'
    };

    const sizeClasses = {
        sm: 'text-sm py-2 px-4',
        md: 'text-base py-3 px-8',
        lg: 'text-lg py-4 px-10'
    };

    return (
        <button
            className={`
                neo-btn
                ${variantClasses[variant]}
                ${sizeClasses[size]}
                ${className}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? <span className="animate-pulse">LOADING...</span> : children}
        </button>
    );
}
