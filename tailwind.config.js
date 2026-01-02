/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
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
      },
    },
  },
  plugins: [],
}

