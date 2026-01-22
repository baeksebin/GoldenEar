import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: './', 
  build: {
    // ✅ 프로젝트 루트의 assets가 아니라 안드로이드 내부로 직접 빌드!
    outDir: path.resolve(__dirname, '../android/app/src/main/assets/web-dist'),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    assetsDir: '', 
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});