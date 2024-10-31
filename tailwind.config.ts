import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	container: {
		center: true,
		padding:"15px",
	},
	screen: {
		sm: '640px',
		md: '768px',
		lg: '960px',
		xl: '1200px',
	},
	fontFamily: {
		primary: "var(--font-clashGrotesk)",
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
  		
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
