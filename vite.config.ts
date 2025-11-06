import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "DrawOver",
      fileName: (format) => `draw-over.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: [],
      output: {
        globals: {},
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "draw-over.css";
          return assetInfo.name || "asset";
        },
      },
    },
  },
  plugins: [
    dts({ include: "src", insertTypesEntry: true, copyDtsFiles: true }),
  ],
});
