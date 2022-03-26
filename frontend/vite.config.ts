import { defineConfig } from "vite";
import svgr from "@honkhonk/vite-plugin-svgr";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), preact()],
  server: {
    port: 5000,
    proxy: {
      "/me": "http://localhost:3000/",
    },
  },
});
