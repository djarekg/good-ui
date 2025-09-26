import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3231,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    tsconfigPaths(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  experimental: {
    enableNativePlugin: true,
    hmrPartialAccept: true,
  },
  ssr: {
    // Workaround for resolving dependencies in the server bundle
    // Without this, the React context will be different between direct import and transitive imports in development environment
    // For more information, see https://github.com/mui/material-ui/issues/45878#issuecomment-2987441663
    optimizeDeps: {
      include: ['@emotion/*', '@mui/*'],
    },
    noExternal: ['@emotion/*', '@mui/*'],
  },
});
