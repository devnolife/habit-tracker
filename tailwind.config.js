/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#f48c25",
        "primary-dark": "#ea580c",
        background: "#FFFFFF",
        "soft-green": "#E6F4EA",
        "soft-blue": "#E3F2FD",
        "soft-red": "#FCE8E6",
        "soft-yellow": "#FFF7E0",
        "soft-purple": "#F3E8FF",
      },
    },
  },
  plugins: [],
}

