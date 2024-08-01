import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url';
import svgr from 'vite-plugin-svgr'
import dotenv from 'dotenv';

 // 讀取 .env 文件
dotenv.config();

// eslint-disable-next-line no-undef
const baseURL =  process.env.VITE_PUBLIC_URL;
console.log("應用程式基礎路徑:", baseURL)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // base: 設定靜態檔案的放置路徑(通常是 GitHub 遠端儲存庫名稱)
  base: baseURL
})
