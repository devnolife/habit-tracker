/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f48c25',
          dark: '#d67615',
          light: '#ffa94d',
        },
        background: '#f8f7f5',
        surface: '#ffffff',
        foreground: '#181411',
        muted: '#8a7560',
        prayer: '#22c55e',
        expense: '#f48c25',
        nutrition: '#84cc16',
        work: '#3b82f6',
        success: '#22c55e',
        warning: '#eab308',
        danger: '#ef4444',
        info: '#3b82f6',
      },
    },
  },
  plugins: [],
}
