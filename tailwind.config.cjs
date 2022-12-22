/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Lato", ...defaultTheme.fontFamily.sans],
				serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
			},
			inset: {
				'-12': '-3rem',
				'-16': '-4rem',
				'30': '30%',
				'full': '100%',
			},
			screens: {
				sm: '568px',
				md: '768px',
				lg: '1024px',
				xl: '1162px',
			},
			container: {
				center: true,
				screens: {
					'2xl': '1280px',
				}
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.inherit'),
						'[class~="lead"]': {
							color: theme('colors.inherit'),
							fontSize: theme('fontSize.2xl'),
						},
						a: {
							color: 'none',
							textDecoration: 'none',
							'&:not(.button)': {
								color: theme('colors.primary.500'),
								'&:hover': {
									textDecoration: 'underline',
								}
							},
						},
						hr: {
							borderColor: theme('colors.gray.300'),
						},
					},
				},
			}),
		},
		colors: {
			inherit: 'inherit',
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			gray: {
				'50': '#ffffff',
				'100': '#f9f9f8',
				'200': '#e2e0dc',
				'300': '#cac8c1',
				'400': '#b3afa5',
				'500': '#9c9689',
				'600': '#686357',
				'700': '#4c4940',
				'800': '#302e29',
				'900': '#141412',
			},
			primary: {
				'100': '#F2E7EA',
				'200': '#DFC3C9',
				'300': '#CB9FA9',
				'400': '#A55669',
				'500': '#7E0E28',
				'600': '#710D24',
				'700': '#4C0818',
				'800': '#390612',
				'900': '#26040C',
			},
			secondary: {
				'100': '#f6f1e6',
				'200': '#e8ddc1',
				'300': '#ddcda4',
				'400': '#cfb97f',
				'500': '#ba9b47',
				'600': '#967d38',
				'700': '#715e2a',
				'800': '#4c3f1c',
				'900': '#27200e',
			},
		},
	},
	variants: {
		extend: {
			display: ['responsive', 'group-hover'],
			margin: ['responsive', 'first', 'last'],
			padding: ['responsive', 'first', 'last'],
			textColor: ['responsive', 'hover', 'focus', 'group-hover'],
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
