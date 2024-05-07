import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        landing_page: "url('/bg_landing_page.jpg')",
      },
      colors: {
        "duck-yellow": "#FFCC00",
        erieblack: "#1C1C1C",
        silver: "#A2A2A2",
        ghostwhite: "#F8F8FF",
        yaleblue: "#063971",
      },
    },
  },
  plugins: [],
};
export default config;
// theme: {
//     fontFamily: {
//       'sarala': ['Sarala', 'sans-serif']
//     },
//     colors: {
//       'charcoal': '#fbe5c0',
//       'coral': '#f88379',
//       'serenity': '#d0e6f0',
//       'charcoal2': '#4c5d70'
//     },
//     extend: {},
//   }
