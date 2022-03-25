import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import svgr from "@honkhonk/vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), preact()],
});
