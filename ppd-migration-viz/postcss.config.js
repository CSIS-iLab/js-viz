module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [require('stylelint')]
    }),
    require('postcss-preset-env')({
      autoprefixer: {
        grid: 'no-autoplace'
      },
      features: {
        'nesting-rules': true
      },
      cssnano: {
        present: 'default'
      }
    })
  ]
}
