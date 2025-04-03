/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        pink: "#FD87C8",
        blue: "#77AAFF",
        lightGreen: "#79A34A",
        darkGreen: "#2A4636",
        cream: "#FFFAF3",
        white: "#FEFEFE",
        black: "#292A26",
        darkerBlue: "#3EA0C7",
        lightGray: "#EEEEEE",
        cyan: "#cdf1fe",
      },
      fontFamily: {
        nunito: ["Nunito-Variable"],
        rubik: ["Rubik-Variable"],
      },
    },
  },
  plugins: [],
};
