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
        secondary: 'var(--secondaryColor)',
        backgroundLight: 'var(--backgroundLight)',
        backgroundDark: 'var(--backgroundDark)',
      },
    },
  },
  plugins: [],
};
