import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: 'src/test/setup.js'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
         rewrite: (path) => path.replace(/^\/api/, '/server')
      }
    }
  },
  build: {
    outDir: 'dist',
    // Ensure .htaccess and other dot files are copied from public
    copyPublicDir: true,
    // Configure rollup to preserve .htaccess files
    rollupOptions: {
      output: {
        // Preserve the original file names for assets
        assetFileNames: (assetInfo) => {
          // Keep .htaccess files with their original names
          if (assetInfo.name === '.htaccess') {
            return '[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  publicDir: 'public'
})
