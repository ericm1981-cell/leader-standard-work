import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'leader-standard-work' to match your GitHub repo name exactly
export default defineConfig({
  plugins: [react()],
  base: '/leader-standard-work/',
})
