const tailwindcss = require('tailwindcss');
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default {
  plugins: [tailwindcss(), react()],
  server: {
    historyApiFallback: true,
  },
};
