import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sassDts from "vite-plugin-sass-dts";
import mkcert from "vite-plugin-mkcert";
import path from "path";

const __dirname = path.resolve();
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), sassDts(), mkcert()],
  resolve: {
    alias: [{ find: "@", replacement: `${__dirname}/src` }],
  },
  server: {
    host: "local.miniproject-team9.p-e.kr",
    port: 3000,
    proxy: {
      "/mini": {
        target: "https://miniproject-team9.p-e.kr/api",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/mini/, ""),
      },
    },
  },
});

// https://miniproject-team9.p-e.kr

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import sassDts from "vite-plugin-sass-dts";
// import path from "path";
// import mkcert from "vite-plugin-mkcert";

// const __dirname = path.resolve();
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), sassDts(), mkcert()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
// });