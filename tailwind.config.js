/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', 'Montserrat', 'sans-serif'],
                display: ['var(--font-display)', 'Montserrat', 'sans-serif'],
                ranade: ['Ranade', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            colors: {
                brand: {
                    gold: '#D4AF37',
                    dark: '#111111',
                    gray: '#F3F4F6',
                    light: '#FAFAFA'
                }
            }
        }
    },
    plugins: [],
}
