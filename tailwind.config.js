const path = require('path');
const colors = require('tailwindcss/colors');
const {
    fontFamily: { sans },
} = require('tailwindcss/defaultTheme');

const brandColor = colors.indigo;

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [path.join(__dirname, 'src/**/*.(jsx|tsx)')],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', sans],
            },
            colors: {
                brand: {
                    ...brandColor,
                    DEFAULT: brandColor[600],
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/container-queries'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@headlessui/tailwindcss'),
        require('tailwindcss-debug-screens'),
    ],
};
