import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'display': ['Doto', 'sans-serif'], // Kept as requested
                'mono': ['Space Mono', 'monospace'], // Kept as requested
            },
            colors: {
                // User's New Palette
                'neo-bg': '#F4F4F4',        // Clean off-white
                'neo-farcaster': '#855DCD', // Deep Purple
                'neo-base': '#0052FF',      // Vibrant Blue
                'neo-stacks': '#FC6432',    // Stacks Orange

                // Semantic mappings or utilities
                'neo-black': '#000000',     // Pure black for borders
                'neo-white': '#FFFFFF',
                'neo-border': '#000000',

                // Keeping legacies mapped to new or compatible tones if needed, 
                // but prioritizing the new palette for main UI elements.
                'neo-yellow': '#FFD700', // Kept for emphasis/hover states if needed
                'neo-success': '#29FFA6',
            },
            borderWidth: {
                '3': '3px',
                '4': '4px', // User asked for 3px-5px
                '5': '5px',
            },
            boxShadow: {
                'neo': '4px 4px 0px 0px #000000',
                'neo-lg': '8px 8px 0px 0px #000000',
                'neo-sm': '2px 2px 0px 0px #000000',
            },
            borderRadius: {
                'none': '0px',
                'sm': '4px', // "Very slight" rounding allowed
            }
        },
    },
    plugins: [],
} satisfies Config
