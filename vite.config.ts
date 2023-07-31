import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sassDts from "vite-plugin-sass-dts";
import path from "path";

const __dirname = path.resolve();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassDts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
});
