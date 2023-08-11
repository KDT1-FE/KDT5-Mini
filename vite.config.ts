import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sassDts from "vite-plugin-sass-dts";
import mkcert from "vite-plugin-mkcert";
import path from "path";

const __dirname = path.resolve();

export default defineConfig({
  plugins: [react(), sassDts(), mkcert()],
  resolve: {
    alias: [{ find: "@", replacement: `${__dirname}/src` }],
  },
  server: {
    host: "https://miniproject-team9.p-e.kr/",
    proxy: {
      "/mini": {
        target: "https://miniproject-team9.p-e.kr/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/mini/, ""),
      },
    },
  },
});
