/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primaryColor)',
        primaryTint: 'var(--primaryTint)',
        secondary: 'var(--secondaryColor)',
        secondaryTint: 'var(--secondaryTint)',
        backgroundLight: 'var(--backgroundLight)',
        backgroundDark: 'var(--backgroundDark)',
      },
    },
  },
  plugins: [],
};
