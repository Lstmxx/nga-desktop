/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {
			colors: {
				redwood: {
					50: '#f7f2eb',
					100: '#f0e6d8',
					200: '#d6bda3',
					300: '#bd9675',
					400: '#8c4f2e',
					500: '#591804',
					600: '#521403',
					700: '#420f02',
					800: '#360b01',
					900: '#290701',
					950: '#1a0400',
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
};
