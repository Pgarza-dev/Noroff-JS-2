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
    // pass the flag --emptyOutDir to vite to empty dist dir before building

    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        profile: path.resolve(__dirname, "src/pages/profile/index.html"),
        login: path.resolve(__dirname, "src/pages/login/index.html"),
        signup: path.resolve(__dirname, "src/pages/signup/index.html"),
      },
    },
  },
};
