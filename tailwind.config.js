/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f9f8",
          100: "#dbece9",
          200: "#b6d9d1",
          300: "#8abeb5",
          400: "#61a097",
          500: "#47857d",
          600: "#376a64",
          700: "#2f5652",
          800: "#294643",
          900: "#253b39",
          950: "#112221",
        },
      },
    },
  },
  plugins: [],
};
