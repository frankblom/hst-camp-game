/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  purge: false,
  theme: {
    extend: {
      colors: {
        wrong: "#EB4F54",
        correct: "#71F2B0",
        team: {
          green: "#95c93d",
          pink: "#d31c67",
          blue: "#6fccdd",
          orange: "#f68b2a",
        },
      },
    },
  },
  plugins: [],
};
