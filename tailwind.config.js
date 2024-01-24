/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
      colors: {
        'primary': {
          'faded': 'rgba(30, 64, 175,0.15)',
          'fadedHover':'rgba(30, 64, 175,0.35)',
          'full': '#1e40af',//blue-600
        },
        'bright': {
          'faded': 'rgba(203, 213, 225, 0.15)',
          'fadedHover': 'rgba(203, 213, 225, 0.25)',
          "full": '#cbd5e1',//slate-300
        },
        'mid':'#64748b',
        'dark': '#0f172a'//slate-900
      }
    },
  },
  plugins: [],
};
