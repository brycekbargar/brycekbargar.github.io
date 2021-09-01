module.exports = {
  mode: "jit",
  purge: ["./site/**/*.{njk,js,html}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
