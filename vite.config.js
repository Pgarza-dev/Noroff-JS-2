import * as path from "path";

/** @type {import('vite').UserConfig} */
export default {
  root: path.resolve(__dirname, "src"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  server: {
    hot: true,
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        profile: path.resolve(__dirname, "src/user/index.html"),
        login: path.resolve(__dirname, "src/login/index.html"),
        signup: path.resolve(__dirname, "src/signup/index.html"),
      },
    },
  },
};
