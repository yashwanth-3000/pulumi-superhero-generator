
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Theme-specific colors
				retro: {
					background: '#c0c0c0',
					foreground: '#000000',
					primary: '#000080',
					secondary: '#008080',
					accent: '#0000ff',
					muted: '#a0a0a0',
				},
				playful: {
					background: '#f5f9ff',
					foreground: '#2d3748',
					primary: '#8b5cf6',
					secondary: '#ec4899',
					accent: '#22d3ee',
					muted: '#e2e8f0',
				},
				minimalist: {
					background: '#ffffff',
					foreground: '#1a202c',
					primary: '#3182ce',
					secondary: '#e2e8f0',
					accent: '#4299e1',
					muted: '#f7fafc',
				},
				superman: {
					primary: '#0033a0',
					secondary: '#c41e3a',
					accent: '#ffcc00',
				},
				batman: {
					primary: '#ffcc00',
					secondary: '#131313',
					accent: '#333333',
				},
				wonderwoman: {
					primary: '#c41e3a',
					secondary: '#ffcc00',
					accent: '#0033a0',
				},
				ironman: {
					primary: '#ff3d00',
					secondary: '#212121',
					accent: '#03a9f4',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'theme-transition': {
					'0%': { opacity: '0.8', transform: 'scale(0.98)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-in-out',
				'theme-transition': 'theme-transition 0.5s ease-out'
			},
			fontFamily: {
				retro: ['Pixelated MS Sans Serif', 'MS Sans Serif', 'sans-serif'],
				playful: ['Quicksand', 'sans-serif'],
				minimalist: ['Inter', 'sans-serif'],
				bangers: ['Bangers', 'cursive'],
				oswald: ['Oswald', 'sans-serif'],
				roboto: ['Roboto Condensed', 'sans-serif']
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
