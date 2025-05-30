// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwind from '@tailwindcss/vite';

// export default defineConfig({
//   plugins: [react(), tailwind()],
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'; 
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),tailwindcss(),
    // Add the polyfill plugins here
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
      // Enable esbuild polyfill plugins
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
      // This ensures 'buffer' points to the installed polyfill
      buffer: 'buffer/',
    },
  },
});