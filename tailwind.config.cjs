/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'sans': 'Alegreya Sans, Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
			'serif': 'Alegreya, Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
			'caps': 'Alegreya SC, Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
			'mono': '"Source Code Pro", monospace',
		},
		extend: {},
	},
	plugins: [
		require('postcss-nested'),
		require('@tailwindcss/typography'),
	],
}
