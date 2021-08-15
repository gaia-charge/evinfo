const path = require('path')
const sveltePreprocess = require('svelte-preprocess')
const makeAttractionsImporter = require('attractions/importer.js')
const { sass } = require('svelte-preprocess-sass')

module.exports = {
  preprocess: sveltePreprocess({
    style: sass(),
    scss: {
        importer: makeAttractionsImporter({
            themeFile: path.join(__dirname, 'static/css/theme.scss'),
        }),
        includePaths: [path.join(__dirname, './static/css')],
    },
  })
}
