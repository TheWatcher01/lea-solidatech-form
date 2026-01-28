import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Charte graphique LEA
                lea: {
                    pink: "#D10074",
                    "pink-light": "#E91E8C",
                    "pink-dark": "#A8005D",
                    yellow: "#FFB400",
                    "yellow-light": "#FFC933",
                    "yellow-dark": "#CC9000",
                    gray: "#575756",
                    "gray-light": "#94a3b8",
                    dark: "#1e293b",
                },
            },
            fontFamily: {
                montserrat: ["Montserrat", "Arial", "sans-serif"],
            },
            boxShadow: {
                lea: "0 4px 20px rgba(209, 0, 116, 0.15)",
                "lea-hover": "0 8px 30px rgba(209, 0, 116, 0.25)",
            },
            animation: {
                "gradient-x": "gradient-x 3s ease infinite",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                float: "float 6s ease-in-out infinite",
            },
            keyframes: {
                "gradient-x": {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center",
                    },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
