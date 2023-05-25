// module.exports = {
//   plugins: {
//     'postcss-preset-env': {},
//   },
// };
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'postcss-color-function': {},
    'tailwindcss': {},
    'autoprefixer': {},
    // require('postcss-import'),
    // // require('tailwindcss/nesting'),
    // require('postcss-color-function'),
    // require('tailwindcss'),
    // require('autoprefixer')
  },
}
