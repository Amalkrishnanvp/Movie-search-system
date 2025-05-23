/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.hbs", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#03045e", // main blue
        primaryLight: "#023e8a", // light blue
        secondary: "#0096c7", // soft gray
        accent: "#f43f5e", // pink
        accent1: "#00b4d8"
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
