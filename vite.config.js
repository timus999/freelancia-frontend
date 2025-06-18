import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'; // <--- IMPORT THIS LINE

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Add the polyfill plugins here (ensure they are only defined once,
    // either here or in esbuildOptions, but not both in the top-level plugins array)
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
    }),
    NodeModulesPolyfillPlugin(),
  ],
  // Add or modify the optimizeDeps and resolve sections
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins (if not already handled by top-level plugins)
      // It's generally better to put these directly in the 'plugins' array if they are Vite plugins.
      // If they are specific esbuild plugins for optimizeDeps, then keep them here.
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  resolve: {
    alias: {
      // This ensures 'buffer' points to the installed polyfill (if needed)
      buffer: 'buffer/',
      // <--- ADD THIS ALIAS FOR @/
      "@": path.resolve(__dirname, "./src"),
    },
  },
});