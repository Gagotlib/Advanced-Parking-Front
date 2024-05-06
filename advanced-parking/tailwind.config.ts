import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				'duck-yellow': '#FFCC00'
			}
		}
	},
	plugins: []
}
export default config
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
