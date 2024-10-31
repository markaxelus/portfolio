/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  container: {
		center: true,
		padding: "15px",
	  },
	  screens: { 
		sm: '640px',
		md: '768px',
		lg: '960px',
		xl: '1200px',
	  },
	  fontFamily: {
		primary: ["var(--font-clashGrotesk)", "sans-serif"], 
	  },
	  extend: {
		colors: {
		  mainbg: '#0D0D0D',
		  primary: '#FFFFE3',
		  accent: {
			DEFAULT: '#00ff99',
			hover: '#00e187',
		  },
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  