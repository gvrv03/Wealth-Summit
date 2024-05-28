/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    backgroundColor: {
      "primaryColor": "blue",
      "secondary":"#050124",
      "secondarylight":"#20185e",
      "white":"#ffffff",
      "grayLight":"#f7f7f7",
      "primaryExtraLight":"#f2f2ff",
      "red":"red",
      "ground":"#00040a"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
