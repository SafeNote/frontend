/* eslint-disable global-require */
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    ...colors.indigo,
                    DEFAULT: colors.indigo[600],
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@headlessui/tailwindcss'),
        require('tailwindcss-debug-screens'),
    ],
} satisfies Config;
