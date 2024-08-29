import autoprefixer from 'autoprefixer'

function configPostcss() {
  return {
    plugins: [
      autoprefixer({
        overrideBrowserslist: ['Chrome > 31', 'ff > 31', 'ie >= 8'],
      }),
    ],
  }
}

export default configPostcss
