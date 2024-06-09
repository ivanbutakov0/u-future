import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'https://u-future.vercel.app/',
				secure: false,
			},
		},
	},
	plugins: [react()],
})
