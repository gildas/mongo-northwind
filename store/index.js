// @ts-ignore
const app_info = require('../package.json')

export const state = () => ({
  appname:   app_info.displayName || app_info.name,
  version:   app_info.version,
  author:    app_info.author,
  publisher: app_info.publisher,
})
