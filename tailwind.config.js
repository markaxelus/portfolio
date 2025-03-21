/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // For Next.js app dir
    "./pages/**/*.{js,ts,jsx,tsx}", // If you use /pages
    "./components/**/*.{js,ts,jsx,tsx}", // Reusable components
  ],
  theme: {
    extend: {
      fontFamily:{
        inter: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

