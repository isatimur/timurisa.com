import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2A9D8F", // Teal-like color from the palette
                secondary: "#264653", // Dark blue color from the palette
                tertiary: "#F4A261", // Light orange color from the palette
                accent: "#E9C46A", // Mustard color from the palette
                "black-100": "#1D3557", // Navy-like color from the palette
                "blue-200": "#457B9D", // Sky blue color from the palette
                "white-100": "#FFFFFF",
                "light-blue": "#A8DADC", // Light blue color from the palette
                "warm-yellow": "#E9C46A", // Yellow color from the palette
                "burnt-orange": "#F4A261", // Orange color from the palette
            },
            boxShadow: {
                card: "0px 35px 120px -15px rgba(30, 42, 54, 0.12)",
            },
            screens: {
                xs: "450px",
            },
        },

    },
    plugins: [],
}
export default config
