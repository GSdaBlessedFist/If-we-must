/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'primary': '#2563eb',//blue-600
      'bright': '#cbd5e1',//slate-300
      'dark': '#0f172a'//slate-900
    },
  },
  plugins: [],
};
