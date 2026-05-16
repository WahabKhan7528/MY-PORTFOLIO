/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Orbitron', 'sans-serif'],
                sans: ['Rajdhani', 'sans-serif'],
                mono: ['Space Mono', 'monospace'],
                technical: ['Rajdhani', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
