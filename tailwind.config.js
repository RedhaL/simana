module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        Igreen: "#4caf50",
        Ipink: "#9c27b0",
        Iblue: "#2196f3",
        Iorange: "#ff9800",
        Iyellow: "#ffeb3b",
        Ibrown: "#795548",
        Ired: "#f44336",
        Iviolet: "#673ab7",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
