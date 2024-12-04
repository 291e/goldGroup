import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // 프로젝트 루트
  publicDir: "public", // 정적 파일 경로
  build: {
    outDir: "dist",
  },
  server: {
    open: true, // 브라우저 자동 열기
  },
});
