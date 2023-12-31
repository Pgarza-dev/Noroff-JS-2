/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundSize: {
        "50%": "50%",
        "100%": "100%",
        "200%": "200%",
        "300%": "300%",
        "400%": "400%",
        "500%": "500%",
      },
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
        gray: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#101010",
        },
      },
    },
  },
  variants: {
    extend: {
      display: ["group-focus"],
    },
  },
  plugins: [require("tailwindcss-animated")],
};
