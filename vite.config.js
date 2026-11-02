import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // The build-time prerender (src/entry-server.jsx) runs in Node, which
    // can't import named exports from these CommonJS packages; bundle them.
    noExternal: ['react-mobile-app-button', 'styled-components'],
  },
})
