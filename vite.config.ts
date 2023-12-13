import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const isDevelopment = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  css: {
    modules: {
      // 개발 환경에서는 더 명확한 클래스명을 사용하고,
      // 프로덕션 환경에서는 난독화된 클래스명을 사용합니다.
      generateScopedName: isDevelopment
        ? "[name]__[local]___[hash:base64:5]"
        : "[hash:base64:5]",
    },
  },
});
